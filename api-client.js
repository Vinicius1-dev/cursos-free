window.IniciaDevApi = (() => {
  const STORAGE_KEY = "inicadev_local_state";
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const DEFAULT_SETTINGS = {
    theme: "light",
    density: "comfortable",
    goal: "4",
    reminder: true,
    autoplay: true,
  };

  function loadLocalState() {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return value ? JSON.parse(value) : { nextUserId: 1, currentUserId: null, users: [] };
    } catch {
      return { nextUserId: 1, currentUserId: null, users: [] };
    }
  }

  function saveLocalState(state) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function normalizeName(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  async function digestPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(String(password || ""));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function createUserPayload(user) {
    if (!user) {
      return {
        user: null,
        settings: { ...DEFAULT_SETTINGS },
        savedCourseIds: [],
        enrolledCourseIds: [],
        progress: {},
      };
    }

    const states = Array.isArray(user.courseStates) ? user.courseStates : [];
    const savedCourseIds = states.filter((item) => item.saved).map((item) => item.courseId);
    const enrolledCourseIds = states.filter((item) => item.enrolled).map((item) => item.courseId);
    const progress = {};

    for (const item of states) {
      if (Array.isArray(item.completedLessons)) {
        progress[item.courseId] = item.completedLessons.filter((value) => Number.isInteger(value) && value >= 0);
      }
    }

    return {
      user: { id: user.id, name: user.name, email: user.email },
      settings: { ...DEFAULT_SETTINGS, ...(user.settings || {}) },
      savedCourseIds,
      enrolledCourseIds,
      progress,
    };
  }

  async function localApiRequest(path, options = {}) {
    const state = loadLocalState();
    const payload = options.body && typeof options.body !== "string" ? options.body : {};
    const method = (options.method || "GET").toUpperCase();

    const activeUser = state.users.find((item) => item.id === state.currentUserId) || null;
    const now = new Date().toISOString();

    if (path === "/api/auth/me") {
      return Promise.resolve(createUserPayload(activeUser));
    }

    if (path === "/api/auth/signup" && method === "POST") {
      const name = normalizeName(payload.name);
      const email = normalizeEmail(payload.email);
      const password = String(payload.password || "");

      if (name.length < 2) throw new Error("Informe seu nome.");
      if (!EMAIL_RE.test(email)) throw new Error("Informe um e-mail válido.");
      if (password.length < 8) throw new Error("A senha precisa ter pelo menos 8 caracteres.");
      if (state.users.some((user) => user.email === email)) {
        const error = new Error("Este e-mail já tem uma conta.");
        error.status = 409;
        throw error;
      }

      const passwordHash = await digestPassword(password);
      const user = {
        id: state.nextUserId,
        name,
        email,
        passwordHash,
        settings: { ...DEFAULT_SETTINGS },
        courseStates: [],
        createdAt: now,
        updatedAt: now,
      };
      state.users.push(user);
      state.currentUserId = user.id;
      state.nextUserId += 1;
      saveLocalState(state);
      return createUserPayload(user);
    }

    if (path === "/api/auth/login" && method === "POST") {
      const email = normalizeEmail(payload.email);
      const password = String(payload.password || "");
      const passwordHash = await digestPassword(password);
      const user = state.users.find((item) => item.email === email);
      if (!user || user.passwordHash !== passwordHash) {
        const error = new Error("E-mail ou senha incorretos.");
        error.status = 401;
        throw error;
      }
      state.currentUserId = user.id;
      saveLocalState(state);
      return createUserPayload(user);
    }

    if (path === "/api/auth/logout" && method === "POST") {
      state.currentUserId = null;
      saveLocalState(state);
      return Promise.resolve({ ok: true });
    }

    if (path === "/api/me" && method === "PATCH") {
      if (!activeUser) {
        const error = new Error("Entre na sua conta para continuar.");
        error.status = 401;
        throw error;
      }
      const name = normalizeName(payload.name);
      if (name.length < 2) throw new Error("Informe um nome com pelo menos 2 caracteres.");
      activeUser.name = name;
      activeUser.updatedAt = now;
      saveLocalState(state);
      return createUserPayload(activeUser);
    }

    if (path === "/api/settings" && method === "PUT") {
      if (!activeUser) {
        const error = new Error("Entre na sua conta para continuar.");
        error.status = 401;
        throw error;
      }
      const settings = {
        theme: payload.theme === "dark" ? "dark" : "light",
        density: payload.density === "compact" ? "compact" : "comfortable",
        goal: ["2", "4", "6", "10"].includes(String(payload.goal)) ? String(payload.goal) : "4",
        reminder: Boolean(payload.reminder),
        autoplay: Boolean(payload.autoplay),
      };
      activeUser.settings = settings;
      activeUser.updatedAt = now;
      saveLocalState(state);
      return createUserPayload(activeUser);
    }

    const courseMatch = path.match(/^\/api\/courses\/([^/]+)\/(save|enroll|progress)$/);
    if (courseMatch) {
      if (!activeUser) {
        const error = new Error("Entre na sua conta para continuar.");
        error.status = 401;
        throw error;
      }

      const courseId = decodeURIComponent(courseMatch[1]);
      const action = courseMatch[2];
      const courseState = activeUser.courseStates.find((item) => item.courseId === courseId);
      const saved = Boolean(payload.saved);
      const enrolled = Boolean(payload.enrolled);
      const completed = Array.isArray(payload.completed) ? payload.completed : [];

      if (action === "save" && method === "POST") {
        if (courseState) {
          courseState.saved = saved;
          courseState.updatedAt = now;
        } else {
          activeUser.courseStates.push({ courseId, saved, enrolled: false, completedLessons: [], updatedAt: now });
        }
        activeUser.updatedAt = now;
        saveLocalState(state);
        return createUserPayload(activeUser);
      }

      if (action === "enroll" && method === "POST") {
        if (courseState) {
          courseState.enrolled = enrolled;
          courseState.updatedAt = now;
        } else {
          activeUser.courseStates.push({ courseId, saved: false, enrolled, completedLessons: [], updatedAt: now });
        }
        activeUser.updatedAt = now;
        saveLocalState(state);
        return createUserPayload(activeUser);
      }

      if (action === "progress" && method === "PUT") {
        if (!courseState || !courseState.enrolled) {
          const error = new Error("Matricule-se antes de salvar progresso.");
          error.status = 403;
          throw error;
        }
        courseState.completedLessons = [...new Set(completed.map((item) => Number(item)).filter((item) => Number.isInteger(item) && item >= 0))].sort((a, b) => a - b);
        courseState.updatedAt = now;
        activeUser.updatedAt = now;
        saveLocalState(state);
        return createUserPayload(activeUser);
      }
    }

    const error = new Error("Rota não encontrada.");
    error.status = 404;
    throw error;
  }

  async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    const config = {
      ...options,
      credentials: "same-origin",
      headers,
    };

    if (options.body && typeof options.body !== "string") {
      headers.set("Content-Type", "application/json");
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(path, config);
      const contentType = response.headers.get("content-type") || "";
      let payload = {};

      if (contentType.includes("application/json")) {
        try {
          payload = await response.json();
        } catch {
          payload = {};
        }
      }

      if (path.startsWith("/api/") && !contentType.includes("application/json")) {
        return localApiRequest(path, options);
      }

      if (!response.ok) {
        if (response.status === 404 && path.startsWith("/api/")) {
          return localApiRequest(path, options);
        }
        const message = payload?.message || payload?.error || `${response.status} ${response.statusText}`;
        const error = new Error(message || "Não foi possível concluir a ação.");
        error.status = response.status;
        error.payload = payload;
        throw error;
      }

      return payload;
    } catch (error) {
      if (path.startsWith("/api/")) {
        return localApiRequest(path, options);
      }
      throw error;
    }
  }

  return {
    request,
    session: () => request("/api/auth/me"),
    signup: (data) => request("/api/auth/signup", { method: "POST", body: data }),
    login: (data) => request("/api/auth/login", { method: "POST", body: data }),
    logout: () => request("/api/auth/logout", { method: "POST", body: {} }),
    updateName: (name) => request("/api/me", { method: "PATCH", body: { name } }),
    updateSettings: (settings) => request("/api/settings", { method: "PUT", body: settings }),
    setSaved: (courseId, saved) =>
      request(`/api/courses/${encodeURIComponent(courseId)}/save`, {
        method: "POST",
        body: { saved },
      }),
    setEnrolled: (courseId, enrolled) =>
      request(`/api/courses/${encodeURIComponent(courseId)}/enroll`, {
        method: "POST",
        body: { enrolled },
      }),
    setProgress: (courseId, completed) =>
      request(`/api/courses/${encodeURIComponent(courseId)}/progress`, {
        method: "PUT",
        body: { completed },
      }),
  };
})();
