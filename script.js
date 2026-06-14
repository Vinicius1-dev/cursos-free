const courses = [
  {
    id: "logica-programacao",
    title: "Lógica de Programação com Projetos",
    provider: "IniciaDev Academy",
    category: "fundamentos",
    level: "iniciante",
    duration: 10,
    rating: 4.9,
    students: "18 mil",
    badge: "Mais escolhido",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    description:
      "Variáveis, condicionais, laços e funções em desafios práticos para criar uma base forte antes de escolher uma linguagem."
  },
  {
    id: "html-css",
    title: "HTML e CSS para Primeiras Páginas",
    provider: "Studio Web Lab",
    category: "web",
    level: "iniciante",
    duration: 12,
    rating: 4.8,
    students: "15 mil",
    badge: "Projeto guiado",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    description:
      "Estruture páginas, domine layouts responsivos e publique um portfólio simples com visual profissional."
  },
  {
    id: "javascript-zero",
    title: "JavaScript do Zero ao Interativo",
    provider: "CodeStart Brasil",
    category: "web",
    level: "iniciante",
    duration: 16,
    rating: 4.9,
    students: "22 mil",
    badge: "Com exercícios",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    description:
      "Manipule páginas, crie interações e entenda os fundamentos da linguagem mais usada no front-end."
  },
  {
    id: "python-iniciantes",
    title: "Python para Resolver Problemas",
    provider: "Data Base School",
    category: "dados",
    level: "iniciante",
    duration: 14,
    rating: 4.8,
    students: "20 mil",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    description:
      "Aprenda sintaxe, listas, dicionários e automações pequenas para ganhar confiança programando todos os dias."
  },
  {
    id: "git-github",
    title: "Git e GitHub sem Mistério",
    provider: "Dev Tools Club",
    category: "ferramentas",
    level: "iniciante",
    duration: 7,
    rating: 4.7,
    students: "11 mil",
    badge: "Essencial",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=900&q=80",
    description:
      "Versione seus projetos, organize commits, resolva conflitos simples e publique código com segurança."
  },
  {
    id: "sql-pratico",
    title: "SQL Prático para Consultas",
    provider: "Data Base School",
    category: "dados",
    level: "iniciante",
    duration: 11,
    rating: 4.8,
    students: "9 mil",
    badge: "Mão na massa",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
    description:
      "Selecione, filtre, agrupe e relacione dados usando consultas que aparecem em projetos reais."
  },
  {
    id: "react-primeiro-app",
    title: "React: Seu Primeiro Aplicativo",
    provider: "Studio Web Lab",
    category: "web",
    level: "intermediario",
    duration: 18,
    rating: 4.7,
    students: "8 mil",
    badge: "Portfólio",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
    description:
      "Componentes, estado, props e rotas em uma aplicação pequena que consome dados e responde ao usuário."
  },
  {
    id: "node-api",
    title: "Node.js e APIs para Iniciantes",
    provider: "Backend Sprint",
    category: "backend",
    level: "intermediario",
    duration: 20,
    rating: 4.6,
    students: "7 mil",
    badge: "Projeto final",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    description:
      "Crie rotas, valide dados, conecte um banco simples e entregue uma API pronta para ser usada por um front-end."
  },
  {
    id: "carreira-dev",
    title: "Primeiro Portfólio e Rotina Dev",
    provider: "IniciaDev Academy",
    category: "fundamentos",
    level: "iniciante",
    duration: 8,
    rating: 4.7,
    students: "6 mil",
    badge: "Carreira",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    description:
      "Organize estudos, documente projetos e prepare uma apresentação clara do que você já sabe construir."
  }
];

const categoryLabels = {
  fundamentos: "Fundamentos",
  web: "Web",
  dados: "Dados",
  ferramentas: "Ferramentas",
  backend: "Back-end"
};

const levelLabels = {
  iniciante: "Iniciante",
  intermediario: "Intermediário"
};

const learningPlans = {
  "logica-programacao": {
    firstLesson: "Como pensar como programador",
    videoNote: "YouTube · aula inicial",
    videoId: "8mei6uVttho",
    videoSource: "Curso em Vídeo",
    lessons: [
      ["Mapa mental da lógica", "8 min"],
      ["Variáveis e tipos", "12 min"],
      ["Condições na prática", "14 min"],
      ["Laços com desafios", "18 min"]
    ],
    project: "Criar um jogo de perguntas no navegador com pontuação e feedback."
  },
  "html-css": {
    firstLesson: "Sua primeira página publicada",
    videoNote: "YouTube · aula inicial",
    videoId: "Ejkb_YpuHWs",
    videoSource: "Curso em Vídeo",
    lessons: [
      ["Estrutura HTML", "10 min"],
      ["Estilos essenciais", "16 min"],
      ["Layout responsivo", "20 min"],
      ["Publicação do portfólio", "14 min"]
    ],
    project: "Montar uma página pessoal responsiva com apresentação, projetos e contato."
  },
  "javascript-zero": {
    firstLesson: "Interações com JavaScript",
    videoNote: "YouTube · aula inicial",
    videoId: "Ptbk2af68e8",
    videoSource: "Curso em Vídeo",
    lessons: [
      ["Sintaxe sem medo", "12 min"],
      ["Eventos e botões", "15 min"],
      ["Listas e objetos", "18 min"],
      ["Projeto interativo", "22 min"]
    ],
    project: "Construir uma lista de tarefas com filtros, estado salvo e pequenas animações."
  },
  "python-iniciantes": {
    firstLesson: "Python para automatizar tarefas",
    videoNote: "YouTube · aula inicial",
    videoId: "S9uPNppGsGo",
    videoSource: "Curso em Vídeo",
    lessons: [
      ["Sintaxe e variáveis", "11 min"],
      ["Listas e dicionários", "17 min"],
      ["Funções úteis", "18 min"],
      ["Mini automação", "19 min"]
    ],
    project: "Criar um organizador simples de tarefas usando Python e arquivos locais."
  },
  "git-github": {
    firstLesson: "Seu primeiro repositório",
    videoNote: "YouTube · aula inicial",
    videoId: "Kyw91mqCHD0",
    videoSource: "Rafaella Ballerini",
    lessons: [
      ["Commits claros", "12 min"],
      ["Branches", "15 min"],
      ["Pull requests", "14 min"],
      ["Publicando projeto", "10 min"]
    ],
    project: "Publicar um projeto no GitHub com README, histórico de commits e página online."
  },
  "sql-pratico": {
    firstLesson: "Consultas que respondem perguntas",
    videoNote: "YouTube · aula inicial",
    videoId: "Ofktsne-utM",
    videoSource: "Curso em Vídeo",
    lessons: [
      ["SELECT e filtros", "13 min"],
      ["Ordenação e limites", "10 min"],
      ["Agrupamentos", "16 min"],
      ["Junções básicas", "18 min"]
    ],
    project: "Analisar uma base de vendas e responder perguntas de negócio com SQL."
  },
  "react-primeiro-app": {
    firstLesson: "Componentes e estado",
    videoNote: "YouTube · aula inicial",
    videoId: "ERflhpiMc1o",
    videoSource: "Hora de Codar",
    lessons: [
      ["Componentes", "15 min"],
      ["Props e estado", "17 min"],
      ["Dados externos", "20 min"],
      ["Rotas simples", "18 min"]
    ],
    project: "Criar um painel de cursos favoritos com busca, filtros e detalhes."
  },
  "node-api": {
    firstLesson: "Primeira rota com Node.js",
    videoNote: "YouTube · aula inicial",
    videoId: "IOfDoyP1Aq0",
    videoSource: "Felipe Rocha",
    lessons: [
      ["Servidor HTTP", "16 min"],
      ["Rotas e validação", "20 min"],
      ["Banco de dados", "24 min"],
      ["Deploy da API", "18 min"]
    ],
    project: "Construir uma API de cursos com cadastro, login e matrícula."
  },
  "carreira-dev": {
    firstLesson: "Como estudar sem travar",
    videoNote: "YouTube · guia de estudo",
    videoId: "9tFmklPl3oo",
    videoSource: "Programação Dinâmica",
    lessons: [
      ["Rotina semanal", "9 min"],
      ["Projetos pequenos", "13 min"],
      ["Portfólio honesto", "16 min"],
      ["Preparação para vagas", "18 min"]
    ],
    project: "Organizar um portfólio inicial com três projetos explicados de forma clara."
  }
};

if (window.IniciaDevData) {
  Object.assign(categoryLabels, window.IniciaDevData.categoryLabels);
  Object.assign(levelLabels, window.IniciaDevData.levelLabels);
  Object.assign(learningPlans, window.IniciaDevData.learningPlans);

  const existingCourseIds = new Set(courses.map((course) => course.id));
  window.IniciaDevData.courses.forEach((course) => {
    if (!existingCourseIds.has(course.id)) {
      courses.push(course);
    }
  });
}

const grid = document.querySelector("#courseGrid");
const searchInput = document.querySelector("#searchInput");
const clearSearch = document.querySelector("#clearSearch");
const courseCount = document.querySelector("#courseCount");
const studyPlanTitle = document.querySelector("#studyPlanTitle");
const studyPlanCopy = document.querySelector("#studyPlanCopy");
const studyPlanPrimary = document.querySelector("#studyPlanPrimary");
const studyPlanStats = document.querySelector("#studyPlanStats");
const studyPath = document.querySelector("#studyPath");
const modal = document.querySelector("#courseModal");
const modalClose = document.querySelector("#modalClose");
const modalImage = document.querySelector("#modalImage");
const modalProvider = document.querySelector("#modalProvider");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalStats = document.querySelector("#modalStats");
const modalVideoPreview = document.querySelector("#modalVideoPreview");
const modalLessonCount = document.querySelector("#modalLessonCount");
const modalLessons = document.querySelector("#modalLessons");
const modalProject = document.querySelector("#modalProject");
const modalEnroll = document.querySelector("#modalEnroll");
const modalSave = document.querySelector("#modalSave");
const openAuthButton = document.querySelector("#openAuthButton");
const startAuthButton = document.querySelector("#startAuthButton");
const userMenu = document.querySelector("#userMenu");
const userMenuButton = document.querySelector("#userMenuButton");
const accountDropdown = document.querySelector("#accountDropdown");
const userInitials = document.querySelector("#userInitials");
const userGreeting = document.querySelector("#userGreeting");
const openLearningButton = document.querySelector("#openLearningButton");
const openSettingsButton = document.querySelector("#openSettingsButton");
const logoutButton = document.querySelector("#logoutButton");
const authModal = document.querySelector("#authModal");
const authClose = document.querySelector("#authClose");
const authForm = document.querySelector("#authForm");
const authTabs = document.querySelectorAll(".auth-tab");
const authTitle = document.querySelector("#authTitle");
const authCopy = document.querySelector("#authCopy");
const authName = document.querySelector("#authName");
const authEmail = document.querySelector("#authEmail");
const authPassword = document.querySelector("#authPassword");
const authConfirmPassword = document.querySelector("#authConfirmPassword");
const authSubmit = document.querySelector("#authSubmit");
const authMessage = document.querySelector("#authMessage");
const authSwitchText = document.querySelector("#authSwitchText");
const authSwitchButton = document.querySelector("#authSwitchButton");
const nameField = document.querySelector("#nameField");
const confirmField = document.querySelector("#confirmField");
const learningModal = document.querySelector("#learningModal");
const learningClose = document.querySelector("#learningClose");
const learningStats = document.querySelector("#learningStats");
const learningList = document.querySelector("#learningList");
const settingsModal = document.querySelector("#settingsModal");
const settingsClose = document.querySelector("#settingsClose");
const settingsForm = document.querySelector("#settingsForm");
const settingsName = document.querySelector("#settingsName");
const settingsEmail = document.querySelector("#settingsEmail");
const settingsTheme = document.querySelector("#settingsTheme");
const settingsDensity = document.querySelector("#settingsDensity");
const settingsGoal = document.querySelector("#settingsGoal");
const settingsReminder = document.querySelector("#settingsReminder");
const settingsAutoplay = document.querySelector("#settingsAutoplay");
const settingsMessage = document.querySelector("#settingsMessage");

const api = window.IniciaDevApi;
const recommendedPathIds = [
  "logica-programacao",
  "html-css",
  "javascript-zero",
  "python-iniciantes",
  "git-github",
  "carreira-dev"
];

const state = {
  search: "",
  activeCourseId: null,
  authMode: "login",
  currentUser: null,
  pendingCourseAction: null,
  saved: new Set(),
  enrolled: new Set(),
  progress: {},
  settings: defaultSettings()
};

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function defaultSettings() {
  return {
    theme: "light",
    density: "comfortable",
    goal: "4",
    reminder: true,
    autoplay: true
  };
}

function normalizeTheme(theme) {
  if (theme === "focus") return "dark";
  if (theme === "default") return "light";
  return theme === "dark" ? "dark" : "light";
}

function applySettings() {
  state.settings = { ...defaultSettings(), ...state.settings };
  state.settings.theme = normalizeTheme(state.settings.theme);
  document.body.classList.toggle("theme-dark", state.settings.theme === "dark");
  document.body.classList.toggle("catalog-compact", state.settings.density === "compact");
}

function applyAuthPayload(payload = {}) {
  state.currentUser = payload.user || null;
  state.saved = new Set(payload.savedCourseIds || []);
  state.enrolled = new Set(payload.enrolledCourseIds || []);
  state.progress = payload.progress || {};
  state.settings = { ...defaultSettings(), ...(payload.settings || {}) };
  applySettings();
}

async function loadSession() {
  try {
    const payload = await api.session();
    applyAuthPayload(payload);
  } catch (error) {
    console.error("Não foi possível carregar a sessão.", error);
    applyAuthPayload();
  }
}

function errorMessage(error, fallback) {
  return error?.message || fallback;
}

function closeAccountDropdown() {
  accountDropdown.hidden = true;
  userMenu.classList.remove("open");
  userMenuButton.setAttribute("aria-expanded", "false");
}

function toggleAccountDropdown() {
  const opening = accountDropdown.hidden;
  accountDropdown.hidden = !opening;
  userMenu.classList.toggle("open", opening);
  userMenuButton.setAttribute("aria-expanded", String(opening));
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function firstName(name) {
  return name.trim().split(/\s+/)[0] || "aluno";
}

function updateModalLock() {
  document.body.classList.toggle(
    "modal-open",
    !modal.hidden || !authModal.hidden || !learningModal.hidden || !settingsModal.hidden
  );
}

function updateHeader() {
  const loggedIn = Boolean(state.currentUser);

  openAuthButton.hidden = loggedIn;
  startAuthButton.hidden = loggedIn;
  userMenu.hidden = !loggedIn;

  if (loggedIn) {
    userInitials.textContent = getInitials(state.currentUser.name);
    userGreeting.textContent = `Olá, ${firstName(state.currentUser.name)}`;
  }

  applySettings();
  renderStudyPlan();
  refreshIcons();
}

function setAuthMessage(message, type = "") {
  authMessage.textContent = message;
  authMessage.classList.toggle("error", type === "error");
  authMessage.classList.toggle("success", type === "success");
}

function setAuthLoading(loading) {
  authSubmit.disabled = loading;
  authSubmit.classList.toggle("is-loading", loading);
}

function setAuthMode(mode) {
  state.authMode = mode;
  const signup = mode === "signup";

  authTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.authMode === mode);
  });

  authTitle.textContent = signup ? "Crie sua conta" : "Entre para continuar";
  authCopy.textContent = signup
    ? "Cadastre-se para salvar cursos, acompanhar matrículas e montar sua trilha."
    : "Acesse sua conta para salvar cursos e acompanhar suas matrículas.";
  authSubmit.innerHTML = `
    <i data-lucide="${signup ? "user-plus" : "log-in"}" aria-hidden="true"></i>
    ${signup ? "Criar conta" : "Entrar"}
  `;
  authSwitchText.textContent = signup ? "Já tem uma conta?" : "Ainda não tem conta?";
  authSwitchButton.textContent = signup ? "Entrar" : "Criar conta";
  authSwitchButton.setAttribute("aria-label", signup ? "Ir para login" : "Ir para criar conta");

  nameField.hidden = !signup;
  confirmField.hidden = !signup;
  authName.required = signup;
  authConfirmPassword.required = signup;
  authPassword.autocomplete = signup ? "new-password" : "current-password";
  setAuthMessage("");
  refreshIcons();
}

function openAuthModal(mode = "login", message = "") {
  authForm.reset();
  setAuthMode(mode);
  setAuthMessage(message);
  authModal.hidden = false;
  updateModalLock();
  refreshIcons();

  window.setTimeout(() => {
    if (mode === "signup") {
      authName.focus();
    } else {
      authEmail.focus();
    }
  }, 0);
}

function closeAuthModal(options = {}) {
  authModal.hidden = true;
  if (!options.keepPendingAction) {
    state.pendingCourseAction = null;
  }
  updateModalLock();
}

function openLearningModal() {
  closeAccountDropdown();
  renderLearningModal();
  learningModal.hidden = false;
  updateModalLock();
  refreshIcons();
}

function closeLearningModal() {
  learningModal.hidden = true;
  updateModalLock();
}

function openSettingsModal() {
  closeAccountDropdown();
  settingsName.value = state.currentUser?.name || "";
  settingsEmail.value = state.currentUser?.email || "";
  settingsTheme.value = normalizeTheme(state.settings.theme);
  settingsDensity.value = state.settings.density;
  settingsGoal.value = state.settings.goal;
  settingsReminder.checked = Boolean(state.settings.reminder);
  settingsAutoplay.checked = Boolean(state.settings.autoplay);
  settingsMessage.textContent = "";
  settingsMessage.classList.remove("success", "error");
  settingsModal.hidden = false;
  updateModalLock();
  settingsName.focus();
}

function closeSettingsModal() {
  settingsModal.hidden = true;
  updateModalLock();
}

function courseProgress(course) {
  const plan = learningPlans[course.id];
  const completed = Array.isArray(state.progress[course.id]) ? state.progress[course.id] : [];
  const total = plan?.lessons?.length || 0;
  const percent = total ? Math.round((completed.length / total) * 100) : 0;

  return { completed: completed.length, total, percent };
}

function coursePageUrl(courseId) {
  return `curso.html?id=${encodeURIComponent(courseId)}`;
}

function openCoursePage(courseId) {
  window.open(coursePageUrl(courseId), "_blank", "noopener");
}

function recommendedPathCourses() {
  return recommendedPathIds
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);
}

function nextRecommendedCourse(pathCourses) {
  return (
    pathCourses.find((course) => state.enrolled.has(course.id) && courseProgress(course).percent < 100) ||
    pathCourses.find((course) => !state.enrolled.has(course.id)) ||
    pathCourses[0]
  );
}

function renderStudyPlan() {
  if (!studyPath || !studyPlanStats || !studyPlanPrimary) return;

  const pathCourses = recommendedPathCourses();
  const nextCourse = nextRecommendedCourse(pathCourses);
  const totalLessons = pathCourses.reduce((sum, course) => sum + courseProgress(course).total, 0);
  const completedLessons = pathCourses.reduce((sum, course) => sum + courseProgress(course).completed, 0);
  const completedCourses = pathCourses.filter((course) => courseProgress(course).percent === 100).length;
  const firstNameLabel = state.currentUser ? firstName(state.currentUser.name) : "";

  if (state.currentUser && state.enrolled.size) {
    studyPlanTitle.textContent = `Continue sua jornada, ${firstNameLabel}`;
    studyPlanCopy.textContent =
      "Seu plano junta os cursos essenciais com o progresso que você já começou a construir.";
  } else {
    studyPlanTitle.textContent = "Uma sequência segura para sair do zero";
    studyPlanCopy.textContent =
      "Comece pela base, avance para projetos e mantenha uma rotina possível de terminar.";
  }

  if (nextCourse) {
    const nextProgress = courseProgress(nextCourse);
    studyPlanPrimary.href = `curso.html?id=${encodeURIComponent(nextCourse.id)}`;
    studyPlanPrimary.innerHTML = `
      <i data-lucide="${nextProgress.percent ? "play" : "play-circle"}" aria-hidden="true"></i>
      ${nextProgress.percent ? "Continuar plano" : "Começar pelo primeiro passo"}
    `;
  }

  studyPlanStats.innerHTML = `
    <div class="study-stat">
      <strong>${pathCourses.length}</strong>
      <span>passos essenciais</span>
    </div>
    <div class="study-stat">
      <strong>${completedLessons}/${totalLessons}</strong>
      <span>aulas concluídas</span>
    </div>
    <div class="study-stat">
      <strong>${completedCourses}</strong>
      <span>cursos finalizados</span>
    </div>
  `;

  studyPath.innerHTML = pathCourses
    .map((course, index) => {
      const progress = courseProgress(course);
      const isActive = nextCourse?.id === course.id;
      const isDone = progress.percent === 100;
      const statusLabel = isDone ? "Concluído" : isActive ? "Próximo passo" : `${progress.percent}%`;
      const statusClass = isDone ? "done" : isActive ? "active" : "";

      return `
        <article class="path-card ${statusClass}">
          <span class="path-step">${index + 1}</span>
          <div class="path-card-body">
            <p class="provider">${escapeHtml(categoryLabels[course.category])}</p>
            <h3>${escapeHtml(course.title)}</h3>
            <p>${escapeHtml(course.description)}</p>
            <div class="path-progress" aria-hidden="true">
              <span style="width: ${progress.percent}%"></span>
            </div>
          </div>
          <a class="icon-button" href="curso.html?id=${encodeURIComponent(course.id)}" target="_blank" rel="noopener" title="Abrir curso" aria-label="Abrir ${escapeHtml(course.title)}">
            <i data-lucide="arrow-up-right" aria-hidden="true"></i>
          </a>
          <span class="path-status">${statusLabel}</span>
        </article>
      `;
    })
    .join("");

  updateStudyPlanAccess(pathCourses, nextCourse);
}

function updateStudyPlanAccess(pathCourses, nextCourse) {
  const hasPathEnrollment = pathCourses.some((course) => state.enrolled.has(course.id));
  const totalLessons = pathCourses.reduce((sum, course) => sum + courseProgress(course).total, 0);
  const completedLessons = pathCourses.reduce(
    (sum, course) => sum + (state.enrolled.has(course.id) ? courseProgress(course).completed : 0),
    0
  );
  const completedCourses = pathCourses.filter((course) => state.enrolled.has(course.id) && courseProgress(course).percent === 100).length;

  if (state.currentUser && hasPathEnrollment) {
    studyPlanTitle.textContent = `Continue sua jornada, ${firstName(state.currentUser.name)}`;
    studyPlanCopy.textContent =
      "Seu plano junta os cursos essenciais com o progresso que você já começou a construir.";
  } else {
    studyPlanTitle.textContent = "Uma sequência segura para sair do zero";
    studyPlanCopy.textContent =
      "Escolha um curso, veja os detalhes e faça a matrícula antes de entrar na sala de aula.";
  }

  studyPlanStats.innerHTML = `
    <div class="study-stat">
      <strong>${pathCourses.length}</strong>
      <span>passos essenciais</span>
    </div>
    <div class="study-stat">
      <strong>${completedLessons}/${totalLessons}</strong>
      <span>aulas matriculadas</span>
    </div>
    <div class="study-stat">
      <strong>${completedCourses}</strong>
      <span>cursos finalizados</span>
    </div>
  `;

  if (nextCourse) {
    const nextProgress = courseProgress(nextCourse);
    const nextEnrolled = state.enrolled.has(nextCourse.id);
    studyPlanPrimary.href = nextEnrolled ? coursePageUrl(nextCourse.id) : "#plano";
    studyPlanPrimary.dataset.planCourse = nextCourse.id;
    studyPlanPrimary.dataset.needsEnrollment = String(!nextEnrolled);
    studyPlanPrimary.innerHTML = `
      <i data-lucide="${nextEnrolled && nextProgress.percent ? "play" : "book-open-check"}" aria-hidden="true"></i>
      ${nextEnrolled ? "Continuar plano" : "Ver detalhes e matricular"}
    `;
  }

  studyPath.querySelectorAll(".path-card").forEach((card, index) => {
    const course = pathCourses[index];
    if (!course) return;

    const progress = courseProgress(course);
    const isEnrolled = state.enrolled.has(course.id);
    const isActive = nextCourse?.id === course.id;
    const isDone = isEnrolled && progress.percent === 100;
    const status = card.querySelector(".path-status");
    const progressBar = card.querySelector(".path-progress span");
    const action = card.querySelector(".icon-button");

    card.classList.toggle("done", isDone);
    card.classList.toggle("active", isActive);
    if (progressBar) progressBar.style.width = `${isEnrolled ? progress.percent : 0}%`;
    if (status) {
      status.textContent = isDone
        ? "Concluído"
        : isActive
          ? isEnrolled
            ? "Em andamento"
            : "Comece aqui"
          : isEnrolled
            ? `${progress.percent}%`
            : "Não matriculado";
    }

    if (!isEnrolled && action?.tagName === "A") {
      const button = document.createElement("button");
      button.className = action.className;
      button.type = "button";
      button.dataset.planCourse = course.id;
      button.title = "Ver detalhes";
      button.setAttribute("aria-label", `Ver detalhes de ${course.title}`);
      button.innerHTML = '<i data-lucide="info" aria-hidden="true"></i>';
      action.replaceWith(button);
    }
  });
}

function renderLearningModal() {
  const enrolledCourses = courses.filter((course) => state.enrolled.has(course.id));
  const savedCourses = courses.filter((course) => state.saved.has(course.id));
  const completedLessons = enrolledCourses.reduce((sum, course) => sum + courseProgress(course).completed, 0);

  learningStats.innerHTML = `
    <div class="learning-stat">
      <strong>${enrolledCourses.length}</strong>
      <span>cursos matriculados</span>
    </div>
    <div class="learning-stat">
      <strong>${completedLessons}</strong>
      <span>aulas concluídas</span>
    </div>
    <div class="learning-stat">
      <strong>${state.settings.goal}h</strong>
      <span>meta semanal</span>
    </div>
  `;

  if (!enrolledCourses.length) {
    if (savedCourses.length) {
      learningList.innerHTML = `
        <div class="empty-learning">
          <h3>Cursos salvos para depois</h3>
          <p>Abra os detalhes de um curso salvo e confirme a matrícula para começar.</p>
        </div>
        ${savedCourses
          .map(
            (course) => `
              <article class="learning-card">
                <img src="${course.image}" alt="${escapeHtml(course.title)}" loading="lazy" />
                <div>
                  <h3>${escapeHtml(course.title)}</h3>
                  <p>${escapeHtml(categoryLabels[course.category])} · ${levelLabels[course.level]}</p>
                </div>
                <button class="primary-button" type="button" data-learning-course="${course.id}">
                  <i data-lucide="book-open-check" aria-hidden="true"></i>
                  Ver detalhes
                </button>
              </article>
            `
          )
          .join("")}
      `;
      return;
    }

    learningList.innerHTML = `
      <div class="empty-learning">
        <h3>Nenhuma matrícula ainda</h3>
        <p>Escolha um curso no catálogo, veja os detalhes e clique em Matricular-se para começar.</p>
        <a class="primary-button" href="#catalogo">
          <i data-lucide="search" aria-hidden="true"></i>
          Explorar cursos
        </a>
      </div>
    `;
    return;
  }

  learningList.innerHTML = enrolledCourses
    .map((course) => {
      const progress = courseProgress(course);
      return `
        <article class="learning-card">
          <img src="${course.image}" alt="${escapeHtml(course.title)}" loading="lazy" />
          <div>
            <h3>${escapeHtml(course.title)}</h3>
            <p>${progress.completed} de ${progress.total} aulas concluídas · ${progress.percent}%</p>
            <div class="progress-track" aria-hidden="true">
              <span style="width: ${progress.percent}%"></span>
            </div>
          </div>
          <a class="primary-button" href="${coursePageUrl(course.id)}" target="_blank" rel="noopener">
            <i data-lucide="play" aria-hidden="true"></i>
            Continuar
          </a>
        </article>
      `;
    })
    .join("");

}

async function handleSettingsSubmit(event) {
  event.preventDefault();

  const nextName = settingsName.value.trim();
  if (nextName.length < 2) {
    settingsMessage.textContent = "Informe um nome com pelo menos 2 caracteres.";
    settingsMessage.classList.add("error");
    settingsMessage.classList.remove("success");
    return;
  }

  const nextSettings = {
    theme: normalizeTheme(settingsTheme.value),
    density: settingsDensity.value,
    goal: settingsGoal.value,
    reminder: settingsReminder.checked,
    autoplay: settingsAutoplay.checked
  };

  settingsMessage.textContent = "Salvando...";
  settingsMessage.classList.remove("success", "error");

  try {
    if (state.currentUser?.name !== nextName) {
      applyAuthPayload(await api.updateName(nextName));
    }
    applyAuthPayload(await api.updateSettings(nextSettings));
    settingsMessage.textContent = "Configurações salvas.";
    settingsMessage.classList.add("success");
    settingsMessage.classList.remove("error");
    updateHeader();
    renderCourses();
  } catch (error) {
    settingsMessage.textContent = errorMessage(error, "Não foi possível salvar as configurações.");
    settingsMessage.classList.add("error");
    settingsMessage.classList.remove("success");
  }
}

function syncAfterServerPayload(payload) {
  applyAuthPayload(payload);
  updateHeader();
  renderCourses();
  syncModalButtons();
}

async function logout() {
  closeAccountDropdown();
  try {
    await api.logout();
  } catch (error) {
    console.error("Não foi possível encerrar a sessão no servidor.", error);
  } finally {
    state.pendingCourseAction = null;
    syncAfterServerPayload();
  }
}

function requestAuthForAction(type, courseId) {
  state.pendingCourseAction = { type, courseId };
  const message = type === "enroll" ? "Entre ou crie uma conta para se matricular." : "Entre para salvar este curso.";
  openAuthModal(type === "enroll" ? "signup" : "login", message);
}

async function completePendingAction() {
  const action = state.pendingCourseAction;
  state.pendingCourseAction = null;

  if (!action || !state.currentUser) return;

  if (action.type === "save") {
    syncAfterServerPayload(await api.setSaved(action.courseId, true));
  }

  if (action.type === "enroll") {
    syncAfterServerPayload(await api.setEnrolled(action.courseId, true));
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  const mode = state.authMode;
  const name = authName.value.trim();
  const email = authEmail.value.trim().toLowerCase();
  const password = authPassword.value;
  const confirmPassword = authConfirmPassword.value;

  if (!isValidEmail(email)) {
    setAuthMessage("Informe um e-mail válido.", "error");
    return;
  }

  if (password.length < 8) {
    setAuthMessage("A senha precisa ter pelo menos 8 caracteres.", "error");
    return;
  }

  setAuthLoading(true);

  try {
    if (mode === "signup") {
      if (name.length < 2) {
        setAuthMessage("Informe seu nome.", "error");
        return;
      }

      if (password !== confirmPassword) {
        setAuthMessage("As senhas não conferem.", "error");
        return;
      }

      syncAfterServerPayload(await api.signup({ name, email, password }));
      setAuthLoading(false);
      setAuthMessage("Conta criada e salva no banco. Abrindo sua área...", "success");
      await delay(900);
      closeAuthModal({ keepPendingAction: true });
      await completePendingAction();
      return;
    }

    syncAfterServerPayload(await api.login({ email, password }));
    setAuthLoading(false);
    setAuthMessage("Login confirmado. Abrindo sua área...", "success");
    await delay(850);
    closeAuthModal({ keepPendingAction: true });
    await completePendingAction();
  } catch (error) {
    setAuthMessage(errorMessage(error, "Não foi possível entrar agora."), "error");
  } finally {
    setAuthLoading(false);
    refreshIcons();
  }
}

function visibleCourses() {
  const query = normalize(state.search.trim());

  return courses.filter((course) => {
    const searchable = normalize(
      `${course.title} ${course.provider} ${course.description} ${categoryLabels[course.category]} ${levelLabels[course.level]}`
    );

    return !query || searchable.includes(query);
  });
}

function renderCourses() {
  const list = visibleCourses();
  courseCount.textContent = list.length;

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Nenhum curso encontrado</h3>
        <p>Tente buscar por outra linguagem, trilha ou nível.</p>
      </div>
    `;
    renderStudyPlan();
    refreshIcons();
    return;
  }

  grid.innerHTML = list.map((course) => courseCard(course)).join("");
  renderStudyPlan();
  refreshIcons();
}

function courseCard(course) {
  const isSaved = state.saved.has(course.id);
  const isEnrolled = state.enrolled.has(course.id);
  const action = isEnrolled
    ? `<a class="primary-button" href="${coursePageUrl(course.id)}" target="_blank" rel="noopener">
        <i data-lucide="play" aria-hidden="true"></i>
        Continuar
      </a>`
    : `<button class="primary-button" type="button" data-open-course="${course.id}">
        <i data-lucide="book-open-check" aria-hidden="true"></i>
        Ver detalhes
      </button>`;

  return `
    <article class="course-card">
      <div class="course-image">
        <img src="${course.image}" alt="${escapeHtml(course.title)}" loading="lazy" />
        <span class="course-badge">${escapeHtml(course.badge)}</span>
      </div>
      <div class="course-body">
        <p class="provider">${escapeHtml(course.provider)}</p>
        <h3>${escapeHtml(course.title)}</h3>
        <p>${escapeHtml(course.description)}</p>
        <div class="course-info" aria-label="Informações do curso">
          <span class="pill level">${levelLabels[course.level]}</span>
          <span class="pill">${course.duration}h</span>
          <span class="pill rating">${course.rating.toFixed(1)} avaliação</span>
          <span class="pill">${escapeHtml(course.students)} alunos</span>
          ${isEnrolled ? '<span class="pill">Matriculado</span>' : ""}
        </div>
      </div>
      <div class="course-actions">
        ${action}
        <button class="icon-button save-button ${isSaved ? "saved" : ""}" type="button" data-save-course="${course.id}" title="${isSaved ? "Remover dos salvos" : "Salvar curso"}" aria-label="${isSaved ? "Remover dos salvos" : "Salvar curso"}">
          <i data-lucide="bookmark" aria-hidden="true"></i>
        </button>
      </div>
    </article>
  `;
}

function openCourse(courseId) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return;

  state.activeCourseId = courseId;
  modalImage.src = course.image;
  modalImage.alt = course.title;
  modalProvider.textContent = `${course.provider} · ${categoryLabels[course.category]}`;
  modalTitle.textContent = course.title;
  modalDescription.textContent = course.description;
  modalStats.innerHTML = `
    <span class="pill level">${levelLabels[course.level]}</span>
    <span class="pill">${course.duration} horas</span>
    <span class="pill rating">${course.rating.toFixed(1)} de avaliação</span>
    <span class="pill">${course.students} alunos</span>
  `;
  renderLearningPlan(course);

  syncModalButtons();
  modal.hidden = false;
  updateModalLock();
  modalClose.focus();
  refreshIcons();
}

function planLessonTitle(lesson) {
  const title = Array.isArray(lesson) ? lesson[0] : lesson.title;
  return String(title || "").replace(/^Módulo\s+\d+\s*:\s*/i, "");
}

function planLessonDuration(lesson) {
  return String((Array.isArray(lesson) ? lesson[1] : lesson.duration) || "");
}

function renderLearningPlan(course) {
  const plan = learningPlans[course.id];
  if (!plan) return;

  modalVideoPreview.style.setProperty("--preview-image", `url("${course.image}")`);
  modalVideoPreview.innerHTML = `
    <div class="youtube-frame">
      <iframe
        src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(plan.videoId)}?rel=0&modestbranding=1"
        title="${escapeHtml(plan.firstLesson)}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <div class="video-meta">
      <span class="video-kicker">
        <i data-lucide="play-circle" aria-hidden="true"></i>
        ${escapeHtml(plan.videoNote)}
      </span>
      <div>
        <h3>${escapeHtml(plan.firstLesson)}</h3>
        <p>Aula curada de ${escapeHtml(plan.videoSource)}. A plataforma organiza o caminho, a prática e o projeto em volta do vídeo.</p>
      </div>
    </div>
  `;

  modalLessonCount.textContent = `${plan.lessons.length} aulas`;
  modalLessons.innerHTML = plan.lessons
    .map(
      (lesson, index) => `
        <li>
          <span class="lesson-number">${index + 1}</span>
          <span class="lesson-title">${escapeHtml(planLessonTitle(lesson))}</span>
          <span class="lesson-duration">${escapeHtml(planLessonDuration(lesson))}</span>
        </li>
      `
    )
    .join("");
  modalProject.innerHTML = `
    <strong>Projeto final</strong>
    <p>${escapeHtml(plan.project)}</p>
  `;
}

function closeCourse() {
  modal.hidden = true;
  updateModalLock();
  state.activeCourseId = null;
}

async function toggleSaved(courseId) {
  if (!state.currentUser) {
    requestAuthForAction("save", courseId);
    return;
  }

  try {
    const nextSaved = !state.saved.has(courseId);
    syncAfterServerPayload(await api.setSaved(courseId, nextSaved));
  } catch (error) {
    setAuthMessage(errorMessage(error, "Não foi possível salvar este curso."), "error");
    console.error(error);
  }
}

async function toggleEnroll(courseId) {
  if (!state.currentUser) {
    requestAuthForAction("enroll", courseId);
    return;
  }

  try {
    const nextEnrolled = !state.enrolled.has(courseId);
    syncAfterServerPayload(await api.setEnrolled(courseId, nextEnrolled));
  } catch (error) {
    setAuthMessage(errorMessage(error, "Não foi possível atualizar a matrícula."), "error");
    console.error(error);
  }
}

function syncModalButtons() {
  if (!state.activeCourseId) return;

  const saved = state.saved.has(state.activeCourseId);
  const enrolled = state.enrolled.has(state.activeCourseId);

  modalSave.classList.toggle("saved", saved);
  modalSave.innerHTML = `
    <i data-lucide="bookmark" aria-hidden="true"></i>
    ${saved ? "Salvo" : "Salvar"}
  `;
  modalEnroll.innerHTML = `
    <i data-lucide="${enrolled ? "play" : "check-circle"}" aria-hidden="true"></i>
    ${enrolled ? "Continuar curso" : "Matricular-se"}
  `;
  refreshIcons();
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderCourses();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  state.search = "";
  renderCourses();
  searchInput.focus();
});

grid.addEventListener("click", async (event) => {
  const openButton = event.target.closest("[data-open-course]");
  const saveButton = event.target.closest("[data-save-course]");

  if (openButton) {
    openCourse(openButton.dataset.openCourse);
    return;
  }

  if (saveButton) {
    await toggleSaved(saveButton.dataset.saveCourse);
  }
});

studyPlanPrimary.addEventListener("click", (event) => {
  const courseId = studyPlanPrimary.dataset.planCourse;
  if (!courseId || studyPlanPrimary.dataset.needsEnrollment !== "true") return;

  event.preventDefault();
  openCourse(courseId);
});

studyPath.addEventListener("click", (event) => {
  const planButton = event.target.closest("[data-plan-course]");
  if (!planButton) return;

  openCourse(planButton.dataset.planCourse);
});

modalClose.addEventListener("click", closeCourse);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeCourse();
});

modalSave.addEventListener("click", async () => {
  if (state.activeCourseId) await toggleSaved(state.activeCourseId);
});

modalEnroll.addEventListener("click", async () => {
  if (!state.activeCourseId) return;

  if (state.enrolled.has(state.activeCourseId)) {
    openCoursePage(state.activeCourseId);
    return;
  }

  await toggleEnroll(state.activeCourseId);
});

userMenuButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAccountDropdown();
});

accountDropdown.addEventListener("click", (event) => {
  event.stopPropagation();
});

openLearningButton.addEventListener("click", openLearningModal);

openSettingsButton.addEventListener("click", openSettingsModal);

openAuthButton.addEventListener("click", () => openAuthModal("login"));

startAuthButton.addEventListener("click", () => openAuthModal("signup"));

logoutButton.addEventListener("click", logout);

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAuthMode(tab.dataset.authMode));
});

authSwitchButton.addEventListener("click", () => {
  setAuthMode(state.authMode === "signup" ? "login" : "signup");
});

authClose.addEventListener("click", () => closeAuthModal());

authModal.addEventListener("click", (event) => {
  if (event.target === authModal) closeAuthModal();
});

authForm.addEventListener("submit", handleAuthSubmit);

learningClose.addEventListener("click", closeLearningModal);

learningModal.addEventListener("click", (event) => {
  if (event.target === learningModal) closeLearningModal();
});

learningList.addEventListener("click", (event) => {
  const learningButton = event.target.closest("[data-learning-course]");
  if (!learningButton) return;

  closeLearningModal();
  openCourse(learningButton.dataset.learningCourse);
});

settingsClose.addEventListener("click", closeSettingsModal);

settingsModal.addEventListener("click", (event) => {
  if (event.target === settingsModal) closeSettingsModal();
});

settingsForm.addEventListener("submit", handleSettingsSubmit);

document.addEventListener("click", (event) => {
  if (!userMenu.contains(event.target)) {
    closeAccountDropdown();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!accountDropdown.hidden) {
    closeAccountDropdown();
    return;
  }
  if (!settingsModal.hidden) {
    closeSettingsModal();
    return;
  }
  if (!learningModal.hidden) {
    closeLearningModal();
    return;
  }
  if (!authModal.hidden) {
    closeAuthModal();
    return;
  }
  if (!modal.hidden) closeCourse();
});

document.addEventListener("DOMContentLoaded", async () => {
  await loadSession();
  updateHeader();
  renderCourses();
  refreshIcons();
});
