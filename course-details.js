const data = window.IniciaDevData;
const api = window.IniciaDevApi;
const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");
const course = data.courses.find((item) => item.id === courseId);
const plan = data.learningPlans[courseId];

const detailsShell = document.querySelector("#detailsShell");
const detailsNotFound = document.querySelector("#detailsNotFound");
const detailsUser = document.querySelector("#detailsUser");
const detailsHeroMedia = document.querySelector("#detailsHeroMedia");
const detailsProvider = document.querySelector("#detailsProvider");
const detailsTitle = document.querySelector("#detailsTitle");
const detailsDescription = document.querySelector("#detailsDescription");
const detailsBadges = document.querySelector("#detailsBadges");
const detailsActions = document.querySelector("#detailsActions");
const detailsMessage = document.querySelector("#detailsMessage");
const outcomeGrid = document.querySelector("#outcomeGrid");
const detailsVideo = document.querySelector("#detailsVideo");
const detailsLessonCount = document.querySelector("#detailsLessonCount");
const detailsModules = document.querySelector("#detailsModules");
const detailsProject = document.querySelector("#detailsProject");
const detailsStats = document.querySelector("#detailsStats");
const detailsPrerequisites = document.querySelector("#detailsPrerequisites");

const state = {
  currentUser: null,
  saved: new Set(),
  enrolled: new Set(),
  progress: {},
  settings: { theme: "light" },
  busy: false
};

function applyPayload(payload = {}) {
  state.currentUser = payload.user || null;
  state.saved = new Set(payload.savedCourseIds || []);
  state.enrolled = new Set(payload.enrolledCourseIds || []);
  state.progress = payload.progress || {};
  state.settings = { theme: "light", ...(payload.settings || {}) };
  document.body.classList.toggle("theme-dark", state.settings.theme === "dark");
}

async function loadSession() {
  try {
    applyPayload(await api.session());
  } catch (error) {
    console.error("Não foi possível carregar a sessão.", error);
    applyPayload();
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function firstName(name) {
  return name?.trim().split(/\s+/)[0] || "Visitante";
}

function coursePageUrl() {
  return `curso.html?id=${encodeURIComponent(course.id)}`;
}

function authUrl(mode, action) {
  const query = new URLSearchParams({ auth: mode, action, course: course.id });
  return `index.html?${query.toString()}#catalogo`;
}

function youtubeUrl(videoId) {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1`;
}

function lessonTitle(lesson) {
  const title = Array.isArray(lesson) ? lesson[0] : lesson.title;
  return String(title || "").replace(/^Módulo\s+\d+\s*:\s*/i, "");
}

function lessonDuration(lesson) {
  return String((Array.isArray(lesson) ? lesson[1] : lesson.duration) || "");
}

function lessonObjective(lesson) {
  return String(lesson.objective || `Entender ${lessonTitle(lesson).toLowerCase()} e praticar com calma.`);
}

function lessonModuleNumber(lesson, index) {
  const title = Array.isArray(lesson) ? lesson[0] : lesson.title;
  const match = String(title || "").match(/^Módulo\s+(\d+)/i);
  return match ? Number(match[1]) : Math.floor(index / 4) + 1;
}

function moduleGroups() {
  return plan.lessons.reduce((groups, lesson, index) => {
    const moduleNumber = lessonModuleNumber(lesson, index);
    if (!groups.has(moduleNumber)) groups.set(moduleNumber, []);
    groups.get(moduleNumber).push({ lesson, index });
    return groups;
  }, new Map());
}

function progressInfo() {
  const completed = Array.isArray(state.progress[course.id]) ? state.progress[course.id] : [];
  const total = plan.lessons.length;
  return {
    completed: completed.length,
    percent: total ? Math.round((completed.length / total) * 100) : 0,
    total
  };
}

function setMessage(message, type = "") {
  detailsMessage.textContent = message;
  detailsMessage.classList.toggle("success", type === "success");
  detailsMessage.classList.toggle("error", type === "error");
}

function showNotFound() {
  detailsShell.hidden = true;
  detailsNotFound.hidden = false;
  document.title = "Curso não encontrado | IniciaDev";
  refreshIcons();
}

function renderActions() {
  const enrolled = state.enrolled.has(course.id);
  const saved = state.saved.has(course.id);

  if (enrolled) {
    detailsActions.innerHTML = `
      <a class="primary-button" href="${coursePageUrl()}">
        <i data-lucide="play" aria-hidden="true"></i>
        Continuar curso
      </a>
      <button class="ghost-button" type="button" data-details-save>
        <i data-lucide="bookmark" aria-hidden="true"></i>
        ${saved ? "Salvo" : "Salvar"}
      </button>
    `;
    return;
  }

  if (state.currentUser) {
    detailsActions.innerHTML = `
      <button class="primary-button" type="button" data-details-enroll>
        <i data-lucide="check-circle" aria-hidden="true"></i>
        Matricular-se
      </button>
      <button class="ghost-button" type="button" data-details-save>
        <i data-lucide="bookmark" aria-hidden="true"></i>
        ${saved ? "Salvo" : "Salvar"}
      </button>
    `;
    return;
  }

  detailsActions.innerHTML = `
    <a class="primary-button" href="${authUrl("signup", "enroll")}">
      <i data-lucide="user-plus" aria-hidden="true"></i>
      Criar conta e matricular
    </a>
    <a class="ghost-button" href="${authUrl("login", "save")}">
      <i data-lucide="bookmark" aria-hidden="true"></i>
      Entrar para salvar
    </a>
  `;
}

function renderOverview() {
  const outcomes = plan.lessons.slice(0, 4).map((lesson) => lessonObjective(lesson));
  outcomeGrid.innerHTML = outcomes
    .map(
      (text, index) => `
        <article class="outcome-card">
          <span>${index + 1}</span>
          <h3>${escapeHtml(lessonTitle(plan.lessons[index]))}</h3>
          <p>${escapeHtml(text)}</p>
        </article>
      `
    )
    .join("");
}

function renderVideo() {
  detailsVideo.innerHTML = `
    <div class="youtube-frame">
      <iframe
        src="${youtubeUrl(plan.videoId)}"
        title="${escapeHtml(plan.firstLesson)}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <div class="details-video-copy">
      <span class="video-kicker">
        <i data-lucide="play-circle" aria-hidden="true"></i>
        ${escapeHtml(plan.videoNote || "YouTube · aula inicial")}
      </span>
      <h3>${escapeHtml(plan.firstLesson)}</h3>
      <p>A aula vem do YouTube, mas o IniciaDev organiza a ordem, a leitura, a prática e o progresso para o aluno não estudar solto.</p>
      <small>Fonte curada: ${escapeHtml(plan.videoSource || "YouTube")}</small>
    </div>
  `;
}

function renderModules() {
  const progress = progressInfo();
  detailsLessonCount.textContent = `${moduleGroups().size} módulos · ${plan.lessons.length} aulas`;
  detailsModules.innerHTML = [...moduleGroups()]
    .map(([moduleNumber, lessons]) => {
      const list = lessons
        .map(({ lesson, index }) => {
          const done = Array.isArray(state.progress[course.id]) && state.progress[course.id].includes(index);
          return `
            <li>
              <span class="lesson-number">${index + 1}</span>
              <div>
                <strong>${escapeHtml(lessonTitle(lesson))}</strong>
                <small>${escapeHtml(lessonDuration(lesson))} · ${escapeHtml(lessonObjective(lesson))}</small>
              </div>
              <i data-lucide="${done ? "check-circle" : "circle"}" aria-hidden="true"></i>
            </li>
          `;
        })
        .join("");

      return `
        <article class="details-module">
          <header>
            <span>Módulo ${moduleNumber}</span>
            <strong>${lessons.length} aulas</strong>
          </header>
          <ol>${list}</ol>
        </article>
      `;
    })
    .join("");

  detailsStats.innerHTML = `
    <div><strong>${plan.lessons.length}</strong><span>aulas</span></div>
    <div><strong>${moduleGroups().size}</strong><span>módulos</span></div>
    <div><strong>${course.duration}h</strong><span>duração</span></div>
    <div><strong>${progress.percent}%</strong><span>progresso</span></div>
  `;
}

function renderDetails() {
  if (!course || !plan) {
    showNotFound();
    return;
  }

  detailsShell.hidden = false;
  detailsNotFound.hidden = true;
  document.title = `${course.title} | IniciaDev`;
  detailsUser.textContent = state.currentUser ? `Olá, ${firstName(state.currentUser.name)}` : "Visitante";
  detailsHeroMedia.style.backgroundImage = `linear-gradient(180deg, rgba(23, 32, 51, 0.1), rgba(23, 32, 51, 0.72)), url("${course.image}")`;
  detailsProvider.textContent = `${course.provider} · ${data.categoryLabels[course.category]}`;
  detailsTitle.textContent = course.title;
  detailsDescription.textContent = course.description;
  detailsBadges.innerHTML = `
    <span class="pill level">${escapeHtml(data.levelLabels[course.level])}</span>
    <span class="pill">${course.duration} horas</span>
    <span class="pill rating">${course.rating.toFixed(1)} avaliação</span>
    <span class="pill">${escapeHtml(course.students)} alunos</span>
    ${state.enrolled.has(course.id) ? '<span class="pill">Matriculado</span>' : ""}
  `;
  detailsProject.innerHTML = `
    <strong>${escapeHtml(plan.project)}</strong>
    <p>Use esse projeto como prova prática do aprendizado. A ideia é sair do curso com algo que pode virar portfólio, rotina de estudo ou aplicação real.</p>
  `;
  detailsPrerequisites.textContent =
    course.level === "iniciante"
      ? "Não precisa ter experiência. Basta separar um tempo de estudo, assistir às aulas em ordem e praticar cada módulo."
      : "É melhor já conhecer a base da área antes de começar. Se travar, volte para um curso iniciante do catálogo.";

  renderActions();
  renderOverview();
  renderVideo();
  renderModules();
  refreshIcons();
}

async function enrollCourse() {
  if (!state.currentUser) {
    window.location.href = authUrl("signup", "enroll");
    return;
  }

  state.busy = true;
  setMessage("Salvando matrícula...");
  try {
    applyPayload(await api.setEnrolled(course.id, true));
    setMessage("Matrícula confirmada. Você já pode continuar para a sala de aula.", "success");
    renderDetails();
  } catch (error) {
    setMessage(error.message || "Não foi possível confirmar a matrícula.", "error");
  } finally {
    state.busy = false;
  }
}

async function toggleSave() {
  if (!state.currentUser) {
    window.location.href = authUrl("login", "save");
    return;
  }

  state.busy = true;
  const nextSaved = !state.saved.has(course.id);
  setMessage(nextSaved ? "Salvando curso..." : "Removendo dos salvos...");
  try {
    applyPayload(await api.setSaved(course.id, nextSaved));
    setMessage(nextSaved ? "Curso salvo nos seus aprendizados." : "Curso removido dos salvos.", "success");
    renderDetails();
  } catch (error) {
    setMessage(error.message || "Não foi possível atualizar os salvos.", "error");
  } finally {
    state.busy = false;
  }
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

detailsActions.addEventListener("click", async (event) => {
  if (state.busy) return;
  const enrollButton = event.target.closest("[data-details-enroll]");
  const saveButton = event.target.closest("[data-details-save]");

  if (enrollButton) await enrollCourse();
  if (saveButton) await toggleSave();
});

document.addEventListener("DOMContentLoaded", async () => {
  await loadSession();
  renderDetails();
});
