const data = window.IniciaDevData;
const api = window.IniciaDevApi;
const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");
const course = data.courses.find((item) => item.id === courseId);
const plan = data.learningPlans[courseId];

let currentUser = null;
let accountSettings = { theme: "light", autoplay: true };

const classroomShell = document.querySelector("#classroomShell");
const courseNotFound = document.querySelector("#courseNotFound");
const courseLocked = document.querySelector("#courseLocked");
const lessonUser = document.querySelector("#lessonUser");
const courseProvider = document.querySelector("#courseProvider");
const courseTitle = document.querySelector("#courseTitle");
const courseDescription = document.querySelector("#courseDescription");
const lessonVideo = document.querySelector("#lessonVideo");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonObjective = document.querySelector("#lessonObjective");
const readingModule = document.querySelector("#readingModule");
const readingText = document.querySelector("#readingText");
const readingPoints = document.querySelector("#readingPoints");
const practiceText = document.querySelector("#practiceText");
const extraVideoLink = document.querySelector("#extraVideoLink");
const completeLessonButton = document.querySelector("#completeLessonButton");
const enrollButton = document.querySelector("#enrollButton");
const projectText = document.querySelector("#projectText");
const lessonCount = document.querySelector("#lessonCount");
const classroomLessons = document.querySelector("#classroomLessons");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const progressMessage = document.querySelector("#progressMessage");

const state = {
  activeLesson: 0,
  completed: new Set(),
  enrolled: new Set(),
  savingProgress: false
};

function normalizeTheme(theme) {
  if (theme === "focus") return "dark";
  if (theme === "default") return "light";
  return theme === "dark" ? "dark" : "light";
}

function applyAccountSettings() {
  document.body.classList.toggle("theme-dark", normalizeTheme(accountSettings.theme) === "dark");
}

function applyAuthPayload(payload = {}) {
  currentUser = payload.user || null;
  accountSettings = { theme: "light", autoplay: true, ...(payload.settings || {}) };
  state.enrolled = new Set(payload.enrolledCourseIds || []);
  state.completed = new Set(payload.progress?.[courseId] || []);
  applyAccountSettings();
}

async function loadSession() {
  try {
    applyAuthPayload(await api.session());
  } catch (error) {
    console.error("Não foi possível carregar a sessão.", error);
    applyAuthPayload();
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function firstName(name) {
  return name?.trim().split(/\s+/)[0] || "Visitante";
}

function youtubeUrl(videoId) {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1`;
}

function lessonModuleNumber(lesson, index) {
  const match = lesson.title.match(/^Módulo\s+(\d+)/i);
  return match ? Number(match[1]) : Math.floor(index / 4) + 1;
}

function cleanLessonTitle(title) {
  return title.replace(/^Módulo\s+\d+\s*:\s*/i, "");
}

function moduleCount() {
  return new Set(plan.lessons.map((lesson, index) => lessonModuleNumber(lesson, index))).size;
}

function createLessonReading(lesson, index) {
  const title = cleanLessonTitle(lesson.title);
  const area = data.categoryLabels[course.category].toLowerCase();
  const moduleNumber = lessonModuleNumber(lesson, index);
  const customReading = lesson.reading || {};
  const text =
    customReading.text ||
    `Nesta aula, o foco é ${title.toLowerCase()}. Pense nisso como uma parte da área de ${area}: primeiro você entende o conceito, depois observa o exemplo do vídeo e por fim transforma em uma pequena prática.`;
  const points =
    customReading.points ||
    lesson.points || [
      `Conceito principal: ${lesson.objective}`,
      "Pause o vídeo quando aparecer um exemplo e anote o passo mais importante.",
      "Antes de avançar, explique o assunto com suas palavras em duas ou três linhas."
    ];
  const practice =
    customReading.practice ||
    lesson.practice ||
    `Depois do vídeo, crie um exemplo simples sobre ${title.toLowerCase()} e salve como anotação do módulo ${moduleNumber}.`;

  return { moduleNumber, points, practice, text };
}

function renderLessonReading(lesson, index) {
  const reading = createLessonReading(lesson, index);
  const searchQuery = `${course.title} ${cleanLessonTitle(lesson.title)} aula em portugues`;
  readingModule.textContent = `Módulo ${reading.moduleNumber}`;
  readingText.textContent = reading.text;
  readingPoints.innerHTML = reading.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
  practiceText.textContent = reading.practice;
  extraVideoLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
}

function showNotFound() {
  classroomShell.hidden = true;
  courseLocked.hidden = true;
  courseNotFound.hidden = false;
  lessonVideo.removeAttribute("src");
  refreshIcons();
}

function showLockedCourse() {
  classroomShell.hidden = true;
  courseNotFound.hidden = true;
  courseLocked.hidden = false;
  lessonVideo.removeAttribute("src");
  document.title = "Matrícula necessária | IniciaDev";
  refreshIcons();
}

function renderCourse() {
  applyAccountSettings();

  if (!course || !plan) {
    showNotFound();
    return;
  }

  if (!currentUser || !state.enrolled.has(course.id)) {
    showLockedCourse();
    return;
  }

  classroomShell.hidden = false;
  courseNotFound.hidden = true;
  courseLocked.hidden = true;
  document.title = `${course.title} | IniciaDev`;
  lessonUser.textContent = `Olá, ${firstName(currentUser.name)}`;
  courseProvider.textContent = `${course.provider} · ${data.categoryLabels[course.category]} · ${data.levelLabels[course.level]}`;
  courseTitle.textContent = course.title;
  courseDescription.textContent = course.description;
  projectText.textContent = plan.project;
  lessonCount.textContent = `${moduleCount()} módulos · ${plan.lessons.length} aulas`;
  enrollButton.disabled = true;
  enrollButton.innerHTML = '<i data-lucide="check-circle" aria-hidden="true"></i> Matriculado';

  let activeModule = null;
  classroomLessons.innerHTML = plan.lessons
    .map((lesson, index) => {
      const moduleNumber = lessonModuleNumber(lesson, index);
      const moduleHeading =
        moduleNumber !== activeModule
          ? `<div class="module-title">Módulo ${moduleNumber}</div>`
          : "";
      activeModule = moduleNumber;

      return `
        ${moduleHeading}
        <button class="classroom-lesson ${index === state.activeLesson ? "active" : ""}" type="button" data-lesson-index="${index}">
          <span class="lesson-number">${index + 1}</span>
          <span>
            <strong>${escapeHtml(cleanLessonTitle(lesson.title))}</strong>
            <small>${escapeHtml(lesson.duration)} · ${escapeHtml(lesson.objective)}</small>
          </span>
          <i data-lucide="${state.completed.has(index) ? "check-circle" : "circle"}" aria-hidden="true"></i>
        </button>
      `;
    })
    .join("");

  selectLesson(state.activeLesson);
  updateProgress();
  refreshIcons();
}

function selectLesson(index) {
  const lesson = plan.lessons[index];
  if (!lesson) return;

  state.activeLesson = index;
  lessonVideo.src = youtubeUrl(lesson.videoId || plan.videoId);
  lessonVideo.title = cleanLessonTitle(lesson.title);
  lessonTitle.textContent = cleanLessonTitle(lesson.title);
  lessonObjective.textContent = lesson.objective;
  renderLessonReading(lesson, index);

  document.querySelectorAll(".classroom-lesson").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.lessonIndex) === index);
  });

  completeLessonButton.disabled = state.savingProgress;
  completeLessonButton.innerHTML = state.completed.has(index)
    ? '<i data-lucide="check-circle" aria-hidden="true"></i> Aula concluída'
    : '<i data-lucide="check-circle" aria-hidden="true"></i> Concluir aula';
  refreshIcons();
}

function updateProgress() {
  const total = plan.lessons.length;
  const completed = state.completed.size;
  const percent = Math.round((completed / total) * 100);

  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
  progressMessage.textContent =
    percent === 100
      ? "Curso concluído. Hora de finalizar o projeto."
      : `${completed} de ${total} aulas concluídas.`;
}

async function completeCurrentLesson() {
  if (!currentUser || !state.enrolled.has(course.id) || state.savingProgress) return;

  const completedBefore = new Set(state.completed);
  const nextLesson = Math.min(state.activeLesson + 1, plan.lessons.length - 1);
  state.completed.add(state.activeLesson);
  state.savingProgress = true;
  selectLesson(state.activeLesson);

  try {
    const payload = await api.setProgress(course.id, [...state.completed]);
    applyAuthPayload(payload);
    state.activeLesson = accountSettings.autoplay === false ? state.activeLesson : nextLesson;
    renderCourse();
  } catch (error) {
    state.completed = completedBefore;
    progressMessage.textContent = error.message || "Não foi possível salvar o progresso.";
    updateProgress();
    console.error(error);
  } finally {
    state.savingProgress = false;
    selectLesson(state.activeLesson);
  }
}

async function toggleEnrollment() {
  if (!currentUser || !course) {
    window.location.href = "index.html#catalogo";
    return;
  }

  try {
    applyAuthPayload(await api.setEnrolled(course.id, !state.enrolled.has(course.id)));
    renderCourse();
  } catch (error) {
    progressMessage.textContent = error.message || "Não foi possível atualizar a matrícula.";
    console.error(error);
  }
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

classroomLessons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lesson-index]");
  if (!button) return;
  selectLesson(Number(button.dataset.lessonIndex));
});

completeLessonButton.addEventListener("click", completeCurrentLesson);
enrollButton.addEventListener("click", toggleEnrollment);

document.addEventListener("DOMContentLoaded", async () => {
  await loadSession();
  renderCourse();
});
