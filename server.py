from __future__ import annotations

import datetime as dt
import hashlib
import hmac
import json
import mimetypes
import os
import re
import secrets
import sqlite3
from http import HTTPStatus
from http.cookies import SimpleCookie
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "inicadev.sqlite3"
SESSION_COOKIE = "inicadev_session"
SESSION_DAYS = 14
PASSWORD_ITERATIONS = 310_000
MAX_BODY_BYTES = 1_000_000
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

DEFAULT_SETTINGS = {
    "theme": "light",
    "density": "comfortable",
    "goal": "4",
    "reminder": True,
    "autoplay": True,
}


def utc_now() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


def iso_now() -> str:
    return utc_now().isoformat(timespec="seconds")


def future_iso(days: int) -> str:
    return (utc_now() + dt.timedelta(days=days)).isoformat(timespec="seconds")


def db_connect() -> sqlite3.Connection:
    DATA_DIR.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db() -> None:
    with db_connect() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT NOT NULL UNIQUE,
              password_hash TEXT NOT NULL,
              password_salt TEXT NOT NULL,
              iterations INTEGER NOT NULL,
              created_at TEXT NOT NULL,
              updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
              id TEXT PRIMARY KEY,
              user_id INTEGER NOT NULL,
              created_at TEXT NOT NULL,
              expires_at TEXT NOT NULL,
              user_agent TEXT,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS user_settings (
              user_id INTEGER PRIMARY KEY,
              theme TEXT NOT NULL DEFAULT 'light',
              density TEXT NOT NULL DEFAULT 'comfortable',
              goal TEXT NOT NULL DEFAULT '4',
              reminder INTEGER NOT NULL DEFAULT 1,
              autoplay INTEGER NOT NULL DEFAULT 1,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS course_states (
              user_id INTEGER NOT NULL,
              course_id TEXT NOT NULL,
              saved INTEGER NOT NULL DEFAULT 0,
              enrolled INTEGER NOT NULL DEFAULT 0,
              completed_lessons TEXT NOT NULL DEFAULT '[]',
              updated_at TEXT NOT NULL,
              PRIMARY KEY (user_id, course_id),
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            """
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_course_states_user_id ON course_states(user_id)")


def hash_password(password: str, salt_hex: str | None = None, iterations: int = PASSWORD_ITERATIONS) -> tuple[str, str, int]:
    salt = bytes.fromhex(salt_hex) if salt_hex else secrets.token_bytes(16)
    password_hash = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations).hex()
    return password_hash, salt.hex(), iterations


def verify_password(password: str, stored_hash: str, salt_hex: str, iterations: int) -> bool:
    password_hash, _, _ = hash_password(password, salt_hex, iterations)
    return hmac.compare_digest(password_hash, stored_hash)


def normalize_email(email: object) -> str:
    return str(email or "").strip().lower()


def normalize_name(name: object) -> str:
    return " ".join(str(name or "").strip().split())


def clean_course_id(course_id: str) -> str:
    course_id = unquote(course_id).strip()
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{1,80}", course_id):
        raise ValueError("Curso inválido.")
    return course_id


def normalize_settings(payload: dict) -> dict:
    theme = payload.get("theme", DEFAULT_SETTINGS["theme"])
    density = payload.get("density", DEFAULT_SETTINGS["density"])
    goal = str(payload.get("goal", DEFAULT_SETTINGS["goal"]))
    return {
        "theme": "dark" if theme == "dark" else "light",
        "density": "compact" if density == "compact" else "comfortable",
        "goal": goal if goal in {"2", "4", "6", "10"} else DEFAULT_SETTINGS["goal"],
        "reminder": bool(payload.get("reminder", DEFAULT_SETTINGS["reminder"])),
        "autoplay": bool(payload.get("autoplay", DEFAULT_SETTINGS["autoplay"])),
    }


def public_user(row: sqlite3.Row) -> dict:
    return {"id": row["id"], "name": row["name"], "email": row["email"]}


def settings_for(conn: sqlite3.Connection, user_id: int) -> dict:
    row = conn.execute(
        "SELECT theme, density, goal, reminder, autoplay FROM user_settings WHERE user_id = ?",
        (user_id,),
    ).fetchone()
    if not row:
        conn.execute(
            """
            INSERT INTO user_settings (user_id, theme, density, goal, reminder, autoplay)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                user_id,
                DEFAULT_SETTINGS["theme"],
                DEFAULT_SETTINGS["density"],
                DEFAULT_SETTINGS["goal"],
                int(DEFAULT_SETTINGS["reminder"]),
                int(DEFAULT_SETTINGS["autoplay"]),
            ),
        )
        return dict(DEFAULT_SETTINGS)

    return {
        "theme": row["theme"],
        "density": row["density"],
        "goal": row["goal"],
        "reminder": bool(row["reminder"]),
        "autoplay": bool(row["autoplay"]),
    }


def auth_payload(conn: sqlite3.Connection, user: sqlite3.Row | None) -> dict:
    if not user:
        return {
            "user": None,
            "settings": dict(DEFAULT_SETTINGS),
            "savedCourseIds": [],
            "enrolledCourseIds": [],
            "progress": {},
        }

    states = conn.execute(
        "SELECT course_id, saved, enrolled, completed_lessons FROM course_states WHERE user_id = ?",
        (user["id"],),
    ).fetchall()
    progress: dict[str, list[int]] = {}
    saved_course_ids: list[str] = []
    enrolled_course_ids: list[str] = []

    for row in states:
        if row["saved"]:
            saved_course_ids.append(row["course_id"])
        if row["enrolled"]:
            enrolled_course_ids.append(row["course_id"])
        try:
            completed = json.loads(row["completed_lessons"] or "[]")
        except json.JSONDecodeError:
            completed = []
        progress[row["course_id"]] = [int(item) for item in completed if isinstance(item, int) or str(item).isdigit()]

    return {
        "user": public_user(user),
        "settings": settings_for(conn, user["id"]),
        "savedCourseIds": saved_course_ids,
        "enrolledCourseIds": enrolled_course_ids,
        "progress": progress,
    }


def create_session(conn: sqlite3.Connection, user_id: int, user_agent: str | None) -> str:
    token = secrets.token_urlsafe(32)
    conn.execute(
        "INSERT INTO sessions (id, user_id, created_at, expires_at, user_agent) VALUES (?, ?, ?, ?, ?)",
        (token, user_id, iso_now(), future_iso(SESSION_DAYS), (user_agent or "")[:300]),
    )
    return token


def session_cookie(token: str) -> str:
    parts = [
        f"{SESSION_COOKIE}={token}",
        "Path=/",
        f"Max-Age={SESSION_DAYS * 24 * 60 * 60}",
        "HttpOnly",
        "SameSite=Lax",
    ]
    if os.environ.get("INICIADEV_SECURE_COOKIE") == "1":
        parts.append("Secure")
    return "; ".join(parts)


def clear_session_cookie() -> str:
    return f"{SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax"


class IniciaDevHandler(SimpleHTTPRequestHandler):
    server_version = "IniciaDev/1.0"

    def log_message(self, format: str, *args: object) -> None:
        print(f"{self.address_string()} - {format % args}")

    def end_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path.startswith("/api/"):
            self.handle_api("GET", path)
            return
        self.serve_static(path)

    def do_POST(self) -> None:
        self.handle_mutation("POST")

    def do_PUT(self) -> None:
        self.handle_mutation("PUT")

    def do_PATCH(self) -> None:
        self.handle_mutation("PATCH")

    def do_DELETE(self) -> None:
        self.handle_mutation("DELETE")

    def handle_mutation(self, method: str) -> None:
        path = urlparse(self.path).path
        if not path.startswith("/api/"):
            self.send_error(HTTPStatus.METHOD_NOT_ALLOWED, "Metodo nao permitido.")
            return
        if not self.origin_allowed():
            self.send_json({"message": "Origem nao autorizada."}, HTTPStatus.FORBIDDEN)
            return
        self.handle_api(method, path)

    def serve_static(self, path: str) -> None:
        if path == "/":
            self.path = "/index.html"
        return super().do_GET()

    def send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK, cookie: str | None = None) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self) -> dict:
        length = int(self.headers.get("Content-Length") or 0)
        if length > MAX_BODY_BYTES:
            raise ValueError("Requisicao grande demais.")
        raw = self.rfile.read(length) if length else b"{}"
        if not raw:
            return {}
        try:
            payload = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError as exc:
            raise ValueError("JSON inválido.") from exc
        if not isinstance(payload, dict):
            raise ValueError("JSON precisa ser um objeto.")
        return payload

    def origin_allowed(self) -> bool:
        origin = self.headers.get("Origin")
        if not origin:
            return True
        return urlparse(origin).netloc == self.headers.get("Host")

    def cookie_token(self) -> str | None:
        cookie = SimpleCookie(self.headers.get("Cookie", ""))
        morsel = cookie.get(SESSION_COOKIE)
        return morsel.value if morsel else None

    def current_user(self, conn: sqlite3.Connection) -> sqlite3.Row | None:
        token = self.cookie_token()
        if not token:
            return None

        row = conn.execute(
            """
            SELECT users.*
            FROM sessions
            JOIN users ON users.id = sessions.user_id
            WHERE sessions.id = ? AND sessions.expires_at > ?
            """,
            (token, iso_now()),
        ).fetchone()
        if row:
            return row

        conn.execute("DELETE FROM sessions WHERE id = ?", (token,))
        return None

    def require_user(self, conn: sqlite3.Connection) -> sqlite3.Row | None:
        user = self.current_user(conn)
        if not user:
            self.send_json({"message": "Entre na sua conta para continuar."}, HTTPStatus.UNAUTHORIZED)
            return None
        return user

    def handle_api(self, method: str, path: str) -> None:
        try:
            with db_connect() as conn:
                if method == "GET" and path == "/api/health":
                    self.send_json({"ok": True, "database": DB_PATH.name})
                    return
                if method == "GET" and path == "/api/auth/me":
                    self.send_json(auth_payload(conn, self.current_user(conn)))
                    return
                if method == "POST" and path == "/api/auth/signup":
                    self.api_signup(conn)
                    return
                if method == "POST" and path == "/api/auth/login":
                    self.api_login(conn)
                    return
                if method == "POST" and path == "/api/auth/logout":
                    self.api_logout(conn)
                    return
                if method == "PATCH" and path == "/api/me":
                    self.api_update_me(conn)
                    return
                if method == "PUT" and path == "/api/settings":
                    self.api_update_settings(conn)
                    return

                course_match = re.fullmatch(r"/api/courses/([^/]+)/(save|enroll|progress)", path)
                if course_match:
                    self.api_course_state(conn, method, course_match.group(1), course_match.group(2))
                    return

            self.send_json({"message": "Rota nao encontrada."}, HTTPStatus.NOT_FOUND)
        except ValueError as exc:
            self.send_json({"message": str(exc)}, HTTPStatus.BAD_REQUEST)
        except sqlite3.IntegrityError:
            self.send_json({"message": "Este e-mail já tem uma conta."}, HTTPStatus.CONFLICT)
        except Exception as exc:
            print(f"Erro interno: {exc}")
            self.send_json({"message": "Erro interno do servidor."}, HTTPStatus.INTERNAL_SERVER_ERROR)

    def api_signup(self, conn: sqlite3.Connection) -> None:
        payload = self.read_json_body()
        name = normalize_name(payload.get("name"))
        email = normalize_email(payload.get("email"))
        password = str(payload.get("password") or "")

        if len(name) < 2:
            raise ValueError("Informe seu nome.")
        if not EMAIL_RE.match(email):
            raise ValueError("Informe um e-mail válido.")
        if len(password) < 8:
            raise ValueError("A senha precisa ter pelo menos 8 caracteres.")

        password_hash, salt, iterations = hash_password(password)
        now = iso_now()
        cursor = conn.execute(
            """
            INSERT INTO users (name, email, password_hash, password_salt, iterations, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (name, email, password_hash, salt, iterations, now, now),
        )
        user_id = cursor.lastrowid
        conn.execute(
            "INSERT INTO user_settings (user_id, theme, density, goal, reminder, autoplay) VALUES (?, ?, ?, ?, ?, ?)",
            (
                user_id,
                DEFAULT_SETTINGS["theme"],
                DEFAULT_SETTINGS["density"],
                DEFAULT_SETTINGS["goal"],
                int(DEFAULT_SETTINGS["reminder"]),
                int(DEFAULT_SETTINGS["autoplay"]),
            ),
        )
        user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        token = create_session(conn, user_id, self.headers.get("User-Agent"))
        self.send_json(auth_payload(conn, user), HTTPStatus.CREATED, session_cookie(token))

    def api_login(self, conn: sqlite3.Connection) -> None:
        payload = self.read_json_body()
        email = normalize_email(payload.get("email"))
        password = str(payload.get("password") or "")
        user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()

        if not user or not verify_password(password, user["password_hash"], user["password_salt"], user["iterations"]):
            self.send_json({"message": "E-mail ou senha incorretos."}, HTTPStatus.UNAUTHORIZED)
            return

        token = create_session(conn, user["id"], self.headers.get("User-Agent"))
        self.send_json(auth_payload(conn, user), cookie=session_cookie(token))

    def api_logout(self, conn: sqlite3.Connection) -> None:
        token = self.cookie_token()
        if token:
            conn.execute("DELETE FROM sessions WHERE id = ?", (token,))
        self.send_json({"ok": True}, cookie=clear_session_cookie())

    def api_update_me(self, conn: sqlite3.Connection) -> None:
        user = self.require_user(conn)
        if not user:
            return
        payload = self.read_json_body()
        name = normalize_name(payload.get("name"))
        if len(name) < 2:
            raise ValueError("Informe um nome com pelo menos 2 caracteres.")

        conn.execute("UPDATE users SET name = ?, updated_at = ? WHERE id = ?", (name, iso_now(), user["id"]))
        updated = conn.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
        self.send_json(auth_payload(conn, updated))

    def api_update_settings(self, conn: sqlite3.Connection) -> None:
        user = self.require_user(conn)
        if not user:
            return
        settings = normalize_settings(self.read_json_body())
        conn.execute(
            """
            INSERT INTO user_settings (user_id, theme, density, goal, reminder, autoplay)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id) DO UPDATE SET
              theme = excluded.theme,
              density = excluded.density,
              goal = excluded.goal,
              reminder = excluded.reminder,
              autoplay = excluded.autoplay
            """,
            (
                user["id"],
                settings["theme"],
                settings["density"],
                settings["goal"],
                int(settings["reminder"]),
                int(settings["autoplay"]),
            ),
        )
        self.send_json(auth_payload(conn, user))

    def api_course_state(self, conn: sqlite3.Connection, method: str, raw_course_id: str, action: str) -> None:
        user = self.require_user(conn)
        if not user:
            return
        course_id = clean_course_id(raw_course_id)
        payload = self.read_json_body()
        now = iso_now()

        if action == "save" and method == "POST":
            saved = int(bool(payload.get("saved", True)))
            conn.execute(
                """
                INSERT INTO course_states (user_id, course_id, saved, updated_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(user_id, course_id) DO UPDATE SET
                  saved = excluded.saved,
                  updated_at = excluded.updated_at
                """,
                (user["id"], course_id, saved, now),
            )
            self.send_json(auth_payload(conn, user))
            return

        if action == "enroll" and method == "POST":
            enrolled = int(bool(payload.get("enrolled", True)))
            conn.execute(
                """
                INSERT INTO course_states (user_id, course_id, enrolled, updated_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(user_id, course_id) DO UPDATE SET
                  enrolled = excluded.enrolled,
                  updated_at = excluded.updated_at
                """,
                (user["id"], course_id, enrolled, now),
            )
            self.send_json(auth_payload(conn, user))
            return

        if action == "progress" and method == "PUT":
            enrolled = conn.execute(
                "SELECT enrolled FROM course_states WHERE user_id = ? AND course_id = ?",
                (user["id"], course_id),
            ).fetchone()
            if not enrolled or not enrolled["enrolled"]:
                self.send_json({"message": "Matricule-se antes de salvar progresso."}, HTTPStatus.FORBIDDEN)
                return

            completed = payload.get("completed", [])
            if not isinstance(completed, list):
                raise ValueError("Progresso inválido.")
            clean_completed = sorted({int(item) for item in completed if str(item).isdigit() and int(item) >= 0})
            conn.execute(
                """
                UPDATE course_states
                SET completed_lessons = ?, updated_at = ?
                WHERE user_id = ? AND course_id = ?
                """,
                (json.dumps(clean_completed), now, user["id"], course_id),
            )
            self.send_json(auth_payload(conn, user))
            return

        self.send_json({"message": "Metodo nao permitido."}, HTTPStatus.METHOD_NOT_ALLOWED)


def run() -> None:
    init_db()
    port = int(os.environ.get("PORT", "4173"))
    mimetypes.add_type("application/manifest+json", ".webmanifest")
    os.chdir(BASE_DIR)
    server = ThreadingHTTPServer(("127.0.0.1", port), IniciaDevHandler)
    print(f"IniciaDev rodando em http://127.0.0.1:{port}")
    print(f"Banco SQLite: {DB_PATH}")
    server.serve_forever()


if __name__ == "__main__":
    run()
