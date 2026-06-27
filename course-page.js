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
const prevLessonButton = document.querySelector("#prevLessonButton");
const nextLessonButton = document.querySelector("#nextLessonButton");
const completeLessonButton = document.querySelector("#completeLessonButton");
const enrollButton = document.querySelector("#enrollButton");
const quizQuestion = document.querySelector("#quizQuestion");
const quizOptions = document.querySelector("#quizOptions");
const quizFeedback = document.querySelector("#quizFeedback");
const lessonNotes = document.querySelector("#lessonNotes");
const notesStatus = document.querySelector("#notesStatus");
const projectText = document.querySelector("#projectText");
const certificateStatus = document.querySelector("#certificateStatus");
const certificateButton = document.querySelector("#certificateButton");
const lessonCount = document.querySelector("#lessonCount");
const classroomLessons = document.querySelector("#classroomLessons");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const progressMessage = document.querySelector("#progressMessage");

const state = {
  activeLesson: 0,
  completed: new Set(),
  enrolled: new Set(),
  savingProgress: false,
  activeQuiz: null,
  noteTimer: null,
  hasManualSelection: false
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

function lowerFirst(value) {
  const cleanValue = String(value || "").trim().replace(/[.!?]+$/, "");
  return cleanValue ? cleanValue.charAt(0).toLowerCase() + cleanValue.slice(1) : "praticar o conceito da aula";
}

function hashString(value) {
  return [...String(value)].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 2147483647, 7);
}

function shuffleOptions(options, seed) {
  return options
    .map((option, index) => ({ option, score: hashString(`${seed}:${index}:${option.text}`) }))
    .sort((a, b) => a.score - b.score)
    .map((item) => item.option);
}

function quizProfile() {
  const category = course.category;

  if (["fundamentos", "web", "backend", "dados", "ferramentas", "programacao"].includes(category)) {
    return {
      practiceStart: "Criar um exemplo pequeno no editor",
      delivery: "Um mini exercício funcionando",
      checkVerb: "testar",
      actionLabel: "Praticar no código",
      debugAction: "Voltar ao exemplo, isolar o problema",
      wrongs: [
        "Copiar tudo sem entender o motivo de cada passo.",
        "Assistir passivamente e deixar para praticar só no final do curso.",
        "Pular a dúvida principal para não atrasar a sequência."
      ]
    };
  }

  if (category === "ia") {
    return {
      practiceStart: "Escrever um prompt com contexto, tarefa e formato de resposta",
      delivery: "Um prompt testado com antes, depois e melhoria",
      checkVerb: "comparar respostas",
      actionLabel: "Testar prompts",
      debugAction: "Ajustar contexto, objetivo e formato da resposta",
      wrongs: [
        "Mandar um pedido vago e aceitar a primeira resposta sem revisar.",
        "Usar IA para substituir o raciocínio em vez de melhorar o processo.",
        "Guardar só a ferramenta usada e ignorar o método."
      ]
    };
  }

  if (category === "marketing") {
    return {
      practiceStart: "Definir público, promessa e canal em um exemplo real",
      delivery: "Um rascunho de campanha com objetivo e métrica",
      checkVerb: "validar a mensagem",
      actionLabel: "Montar uma ação simples",
      debugAction: "Rever público, oferta e chamada para ação",
      wrongs: [
        "Postar conteúdo sem saber para quem ele foi criado.",
        "Medir sucesso só por curtidas e ignorar objetivo do negócio.",
        "Copiar uma campanha famosa sem adaptar para o público."
      ]
    };
  }

  if (category === "financas") {
    return {
      practiceStart: "Usar números reais da sua rotina financeira",
      delivery: "Uma decisão anotada com valor, prazo e prioridade",
      checkVerb: "conferir os números",
      actionLabel: "Organizar uma decisão",
      debugAction: "Separar renda, gastos e prioridades antes de decidir",
      wrongs: [
        "Fazer tudo de cabeça e não registrar os valores.",
        "Escolher uma dica genérica sem olhar sua situação atual.",
        "Confundir desejo de compra com meta financeira."
      ]
    };
  }

  if (category === "idiomas") {
    return {
      practiceStart: "Falar ou escrever frases próprias com o vocabulário da aula",
      delivery: "Três frases gravadas ou escritas sem copiar o exemplo",
      checkVerb: "repetir em voz alta",
      actionLabel: "Praticar escuta e fala",
      debugAction: "Voltar no trecho difícil e repetir em frases curtas",
      wrongs: [
        "Memorizar uma lista sem usar as palavras em frases.",
        "Evitar falar para não errar a pronúncia.",
        "Traduzir palavra por palavra sem entender o contexto."
      ]
    };
  }

  if (category === "design") {
    return {
      practiceStart: "Criar uma peça pequena aplicando o fundamento visual",
      delivery: "Uma versão antes/depois com escolha de cor, texto e hierarquia",
      checkVerb: "comparar a composição",
      actionLabel: "Produzir uma peça",
      debugAction: "Revisar contraste, alinhamento e ritmo visual",
      wrongs: [
        "Adicionar muitos efeitos para tentar deixar a peça mais bonita.",
        "Copiar um layout sem entender hierarquia e contraste.",
        "Exportar sem revisar texto, corte e legibilidade."
      ]
    };
  }

  if (category === "concursos") {
    return {
      practiceStart: "Resolver questões e marcar os erros para revisão",
      delivery: "Um bloco de questões com acertos, erros e motivo do erro",
      checkVerb: "corrigir questões",
      actionLabel: "Treinar com questão",
      debugAction: "Voltar ao assunto, refazer a questão e anotar o padrão",
      wrongs: [
        "Ler teoria por horas sem medir desempenho em questões.",
        "Ignorar os erros porque eles incomodam.",
        "Trocar de matéria sem revisar o que acabou de estudar."
      ]
    };
  }

  return {
    practiceStart: "Aplicar a ideia em uma situação real de cliente ou negócio",
    delivery: "Uma decisão prática com hipótese, ação e próximo teste",
    checkVerb: "validar com dados ou conversa real",
    actionLabel: "Testar uma hipótese",
    debugAction: "Rever problema, cliente e proposta de valor",
    wrongs: [
      "Planejar por muito tempo sem conversar com ninguém.",
      "Achar que uma ideia boa dispensa teste com cliente.",
      "Olhar só para inspiração e esquecer execução."
    ]
  };
}

function createLessonQuiz(lesson, index = 0) {
  if (lesson.quiz?.question && Array.isArray(lesson.quiz.options)) {
    return lesson.quiz;
  }

  const title = cleanLessonTitle(lesson.title);
  const goal = lowerFirst(lesson.objective);
  const profile = quizProfile();
  const wrongs = profile.wrongs;
  const templates = [
    {
      question: `Na aula "${title}", qual é o melhor jeito de praticar logo depois do vídeo?`,
      correct: `${profile.practiceStart} para ${goal}.`,
      wrong: [wrongs[0], wrongs[1]],
      explanation: `Boa. O objetivo desta aula é ${goal}, então a prática precisa sair da teoria.`
    },
    {
      question: `Se você tivesse que mostrar que entendeu "${title}", o que entregaria?`,
      correct: `${profile.delivery}, mostrando que você consegue ${goal}.`,
      wrong: [wrongs[1], wrongs[2]],
      explanation: "Exatamente. Uma entrega pequena mostra aprendizado melhor do que só assistir mais conteúdo."
    },
    {
      question: `Qual erro mais atrapalha o aprendizado nesta aula?`,
      correct: `Avançar sem ${profile.checkVerb} se você consegue ${goal}.`,
      wrong: [
        `${profile.actionLabel} em um exemplo simples antes de seguir.`,
        "Anotar uma dúvida específica para revisar depois."
      ],
      explanation: "Isso mesmo. Aqui a resposta certa é o erro que você deve evitar antes de ir para a próxima aula."
    },
    {
      question: `Qual anotação vale mais depois de estudar "${title}"?`,
      correct: `Um exemplo próprio, uma dúvida e o próximo teste prático sobre ${title.toLowerCase()}.`,
      wrong: [
        "Somente o link do vídeo, sem resumo ou dúvida.",
        "Uma frase genérica dizendo que o assunto parece importante."
      ],
      explanation: "Perfeito. Anotação boa ajuda você a retomar a aula sem recomeçar do zero."
    },
    {
      question: `Antes de clicar em próxima aula, qual checklist faz mais sentido?`,
      correct: `Entendi a ideia, fiz um teste simples e consigo explicar ${title.toLowerCase()}.`,
      wrong: [
        "Terminei o vídeo, então posso avançar mesmo sem praticar.",
        "Não entendi tudo, mas vou deixar para resolver só no final do curso."
      ],
      explanation: "Boa escolha. Esse checklist mantém o avanço rápido, mas com base firme."
    },
    {
      question: `Qual escolha combina melhor com o objetivo: "${lesson.objective}"?`,
      correct: `${profile.actionLabel} em um exercício pequeno e comparar o resultado com a explicação da aula.`,
      wrong: [wrongs[0], "Abrir vários vídeos ao mesmo tempo sem terminar nenhum exercício."],
      explanation: "Certo. O objetivo vira aprendizado quando você compara explicação, tentativa e resultado."
    },
    {
      question: `Se algo der errado em "${title}", qual atitude ajuda mais?`,
      correct: `${profile.debugAction} e ajustar uma parte por vez.`,
      wrong: [
        "Apagar tudo imediatamente e trocar de aula.",
        "Ignorar o erro e seguir para conteúdos mais avançados."
      ],
      explanation: "Isso. Resolver um pedaço por vez evita frustração e mostra onde está a dúvida real."
    },
    {
      question: `Qual resultado esperado ao terminar esta aula?`,
      correct: `Conseguir ${goal} sem depender só de copiar o vídeo.`,
      wrong: [
        "Lembrar o nome do assunto, mesmo sem saber aplicar.",
        "Ter assistido a aula em velocidade alta para terminar logo."
      ],
      explanation: "Muito bom. O resultado esperado é autonomia pequena, não perfeição."
    }
  ];
  const template = templates[(hashString(`${course.id}:${title}:${index}`) + index) % templates.length];

  return {
    question: template.question,
    options: shuffleOptions(
      [
        { text: template.correct, correct: true },
        { text: template.wrong[0], correct: false },
        { text: template.wrong[1], correct: false }
      ],
      `${course.id}:${index}:${title}`
    ),
    explanation: template.explanation
  };
}

function renderQuiz(lesson, index) {
  const quiz = createLessonQuiz(lesson, index);
  state.activeQuiz = quiz;
  quizQuestion.textContent = quiz.question;
  quizFeedback.textContent = "Escolha uma resposta para testar seu entendimento antes de avançar.";
  quizFeedback.className = "quiz-feedback";
  quizOptions.innerHTML = quiz.options
    .map(
      (option, index) => `
        <button class="quiz-option" type="button" data-option-index="${index}">
          <span>${String.fromCharCode(65 + index)}</span>
          ${escapeHtml(option.text)}
        </button>
      `
    )
    .join("");
}

function noteStorageKey(index) {
  const userKey = currentUser?.id ? `user-${currentUser.id}` : "visitante";
  return `inicadev_notes:${userKey}:${courseId}:${index}`;
}

function loadLessonNotes(index) {
  clearTimeout(state.noteTimer);

  try {
    const savedNote = window.localStorage.getItem(noteStorageKey(index)) || "";
    lessonNotes.value = savedNote;
    notesStatus.textContent = savedNote ? "Anotação salva neste navegador." : "Pronto para anotar.";
  } catch {
    lessonNotes.value = "";
    notesStatus.textContent = "Não foi possível acessar o salvamento local.";
  }
}

function saveLessonNotes() {
  try {
    window.localStorage.setItem(noteStorageKey(state.activeLesson), lessonNotes.value);
    notesStatus.textContent = `Salvo às ${new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })}.`;
  } catch {
    notesStatus.textContent = "Não foi possível salvar a anotação neste navegador.";
  }
}

function scheduleNoteSave() {
  notesStatus.textContent = "Salvando...";
  clearTimeout(state.noteTimer);
  state.noteTimer = setTimeout(saveLessonNotes, 320);
}

function recommendedLessonIndex() {
  const firstPending = plan.lessons.findIndex((_, index) => !state.completed.has(index));
  return firstPending === -1 ? Math.max(plan.lessons.length - 1, 0) : firstPending;
}

function updateLessonActions() {
  const lastLessonIndex = plan.lessons.length - 1;
  prevLessonButton.disabled = state.activeLesson === 0;
  nextLessonButton.disabled = state.activeLesson >= lastLessonIndex;
  nextLessonButton.innerHTML =
    state.activeLesson >= lastLessonIndex
      ? '<i data-lucide="flag" aria-hidden="true"></i> Final'
      : 'Próxima <i data-lucide="chevron-right" aria-hidden="true"></i>';
}

function certificateFileName() {
  return `certificado-${course.id}-${currentUser.id}.html`;
}

function createCertificateHtml() {
  const completedAt = new Date().toLocaleDateString("pt-BR");
  const totalLessons = plan.lessons.length;
  const title = escapeHtml(course.title);
  const student = escapeHtml(currentUser.name);
  const project = escapeHtml(plan.project);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Certificado IniciaDev</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f2f8f7; font-family: Arial, Helvetica, sans-serif; color: #13252f; }
    main { width: min(920px, calc(100% - 32px)); padding: 56px; background: #fff; border: 10px solid #126b7f; box-shadow: 0 24px 60px rgba(19, 37, 47, 0.16); }
    p { color: #60727d; line-height: 1.6; }
    .brand { color: #126b7f; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
    h1 { margin: 20px 0 8px; font-size: 44px; }
    h2 { margin: 18px 0 6px; font-size: 30px; }
    .line { height: 1px; margin: 30px 0; background: #d9deea; }
    .meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 26px; }
    .meta div { padding: 14px; background: #f2f8f7; border: 1px solid #d7e4e8; }
    strong, span { display: block; }
    span { color: #60727d; font-size: 13px; font-weight: 800; text-transform: uppercase; }
    @media print { body { background: #fff; } main { box-shadow: none; width: auto; } }
  </style>
</head>
<body>
  <main>
    <div class="brand">IniciaDev Academy</div>
    <h1>Certificado de conclusão</h1>
    <p>Certificamos que <strong>${student}</strong> concluiu o curso <strong>${title}</strong>, finalizando ${totalLessons} aulas com acompanhamento de progresso.</p>
    <div class="line"></div>
    <h2>Projeto recomendado</h2>
    <p>${project}</p>
    <div class="meta">
      <div><strong>${completedAt}</strong><span>Data</span></div>
      <div><strong>${totalLessons} aulas</strong><span>Carga prática</span></div>
      <div><strong>IniciaDev</strong><span>Plataforma</span></div>
    </div>
  </main>
</body>
</html>`;
}

function downloadCertificate() {
  if (!currentUser || state.completed.size < plan.lessons.length) return;

  const blob = new Blob([createCertificateHtml()], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = certificateFileName();
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
  progressMessage.textContent = "Certificado gerado. Abra o arquivo baixado e imprima em PDF se quiser.";
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
  certificateButton.disabled = state.completed.size < plan.lessons.length;

  if (!state.hasManualSelection && state.activeLesson === 0 && state.completed.has(0)) {
    state.activeLesson = recommendedLessonIndex();
  }

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

function selectLesson(index, options = {}) {
  const safeIndex = Math.max(0, Math.min(index, plan.lessons.length - 1));
  const lesson = plan.lessons[safeIndex];
  if (!lesson) return;

  if (options.manual) {
    state.hasManualSelection = true;
  }

  state.activeLesson = safeIndex;
  lessonVideo.src = youtubeUrl(lesson.videoId || plan.videoId);
  lessonVideo.title = cleanLessonTitle(lesson.title);
  lessonTitle.textContent = cleanLessonTitle(lesson.title);
  lessonObjective.textContent = lesson.objective;
  renderLessonReading(lesson, safeIndex);
  renderQuiz(lesson, safeIndex);
  loadLessonNotes(safeIndex);
  updateLessonActions();

  document.querySelectorAll(".classroom-lesson").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.lessonIndex) === safeIndex);
  });

  completeLessonButton.disabled = state.savingProgress;
  completeLessonButton.innerHTML = state.completed.has(safeIndex)
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
  certificateStatus.textContent =
    percent === 100
      ? "Certificado liberado. Baixe o arquivo e guarde como comprovante."
      : `Conclua mais ${total - completed} aula${total - completed === 1 ? "" : "s"} para liberar o certificado.`;
  certificateButton.disabled = percent < 100;
  certificateButton.innerHTML =
    percent === 100
      ? '<i data-lucide="award" aria-hidden="true"></i> Baixar certificado'
      : '<i data-lucide="lock" aria-hidden="true"></i> Certificado';
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
  selectLesson(Number(button.dataset.lessonIndex), { manual: true });
});

quizOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-option-index]");
  if (!button || !state.activeQuiz) return;

  const option = state.activeQuiz.options[Number(button.dataset.optionIndex)];
  if (!option) return;

  quizOptions.querySelectorAll(".quiz-option").forEach((item, index) => {
    const itemOption = state.activeQuiz.options[index];
    item.disabled = true;
    item.classList.toggle("correct", Boolean(itemOption?.correct));
    item.classList.toggle("wrong", item === button && !option.correct);
  });

  quizFeedback.textContent = option.correct
    ? state.activeQuiz.explanation
    : "Quase. Reveja a leitura e procure a alternativa que coloca o conceito em prática.";
  quizFeedback.className = option.correct ? "quiz-feedback success" : "quiz-feedback error";
});

prevLessonButton.addEventListener("click", () => {
  selectLesson(state.activeLesson - 1, { manual: true });
});

nextLessonButton.addEventListener("click", () => {
  selectLesson(state.activeLesson + 1, { manual: true });
});

lessonNotes.addEventListener("input", scheduleNoteSave);
completeLessonButton.addEventListener("click", completeCurrentLesson);
enrollButton.addEventListener("click", toggleEnrollment);
certificateButton.addEventListener("click", downloadCertificate);

document.addEventListener("DOMContentLoaded", async () => {
  await loadSession();
  renderCourse();
});
