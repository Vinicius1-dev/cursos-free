window.IniciaDevData = {
  categoryLabels: {
    fundamentos: "Fundamentos",
    web: "Web",
    dados: "Dados",
    ferramentas: "Ferramentas",
    backend: "Back-end",
    programacao: "Programação",
    ia: "Inteligência artificial",
    marketing: "Marketing digital",
    financas: "Finanças pessoais",
    idiomas: "Idiomas",
    design: "Design e edição de vídeo",
    concursos: "Preparação para concursos",
    negocios: "Negócios e empreendedorismo"
  },
  levelLabels: {
    iniciante: "Iniciante",
    intermediario: "Intermediário"
  },
  courses: [
    {
      id: "logica-programacao",
      title: "Lógica de Programação com Projetos",
      provider: "IniciaDev Academy",
      category: "fundamentos",
      level: "iniciante",
      duration: 10,
      rating: 4.9,
      students: "18 mil",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      description:
        "Organize estudos, documente projetos e prepare uma apresentação clara do que você já sabe construir."
    }
  ],
  learningPlans: {
    "logica-programacao": {
      firstLesson: "Como pensar como programador",
      videoNote: "YouTube · aula inicial",
      videoId: "8mei6uVttho",
      videoSource: "Curso em Vídeo",
      lessons: [
        { title: "Mapa mental da lógica", duration: "8 min", objective: "Entender algoritmo como sequência de decisões." },
        { title: "Variáveis e tipos", duration: "12 min", objective: "Guardar dados simples e usar nomes claros." },
        { title: "Condições na prática", duration: "14 min", objective: "Criar decisões com if, else e operadores." },
        { title: "Laços com desafios", duration: "18 min", objective: "Repetir ações e resolver pequenos problemas." }
      ],
      project: "Criar um jogo de perguntas no navegador com pontuação e feedback."
    },
    "html-css": {
      firstLesson: "Sua primeira página publicada",
      videoNote: "YouTube · aula inicial",
      videoId: "Ejkb_YpuHWs",
      videoSource: "Curso em Vídeo",
      lessons: [
        { title: "Estrutura HTML", duration: "10 min", objective: "Montar a base semântica de uma página." },
        { title: "Estilos essenciais", duration: "16 min", objective: "Aplicar cores, fontes, espaçamentos e botões." },
        { title: "Layout responsivo", duration: "20 min", objective: "Criar telas que funcionam no celular." },
        { title: "Publicação do portfólio", duration: "14 min", objective: "Preparar uma página para ser mostrada." }
      ],
      project: "Montar uma página pessoal responsiva com apresentação, projetos e contato."
    },
    "javascript-zero": {
      firstLesson: "Interações com JavaScript",
      videoNote: "YouTube · aula inicial",
      videoId: "Ptbk2af68e8",
      videoSource: "Curso em Vídeo",
      lessons: [
        { title: "Sintaxe sem medo", duration: "12 min", objective: "Entender comandos, valores e variáveis." },
        { title: "Eventos e botões", duration: "15 min", objective: "Responder aos cliques do usuário." },
        { title: "Listas e objetos", duration: "18 min", objective: "Organizar dados em estruturas simples." },
        { title: "Projeto interativo", duration: "22 min", objective: "Unir DOM, eventos e estado salvo." }
      ],
      project: "Construir uma lista de tarefas com filtros, estado salvo e pequenas animações."
    },
    "python-iniciantes": {
      firstLesson: "Python para automatizar tarefas",
      videoNote: "YouTube · aula inicial",
      videoId: "S9uPNppGsGo",
      videoSource: "Curso em Vídeo",
      lessons: [
        { title: "Sintaxe e variáveis", duration: "11 min", objective: "Escrever comandos básicos com clareza." },
        { title: "Listas e dicionários", duration: "17 min", objective: "Guardar coleções de dados." },
        { title: "Funções úteis", duration: "18 min", objective: "Reaproveitar ações em pequenos blocos." },
        { title: "Mini automação", duration: "19 min", objective: "Criar um script para uma tarefa repetitiva." }
      ],
      project: "Criar um organizador simples de tarefas usando Python e arquivos locais."
    },
    "git-github": {
      firstLesson: "Seu primeiro repositório",
      videoNote: "YouTube · aula inicial",
      videoId: "Kyw91mqCHD0",
      videoSource: "Rafaella Ballerini",
      lessons: [
        { title: "Commits claros", duration: "12 min", objective: "Salvar versões com mensagens úteis." },
        { title: "Branches", duration: "15 min", objective: "Trabalhar em mudanças separadas." },
        { title: "Pull requests", duration: "14 min", objective: "Entender revisão e colaboração." },
        { title: "Publicando projeto", duration: "10 min", objective: "Mostrar seu código online." }
      ],
      project: "Publicar um projeto no GitHub com README, histórico de commits e página online."
    },
    "sql-pratico": {
      firstLesson: "Consultas que respondem perguntas",
      videoNote: "YouTube · aula inicial",
      videoId: "Ofktsne-utM",
      videoSource: "Curso em Vídeo",
      lessons: [
        { title: "SELECT e filtros", duration: "13 min", objective: "Buscar dados com critérios simples." },
        { title: "Ordenação e limites", duration: "10 min", objective: "Organizar resultados para análise." },
        { title: "Agrupamentos", duration: "16 min", objective: "Contar, somar e resumir informações." },
        { title: "Junções básicas", duration: "18 min", objective: "Relacionar informações de tabelas diferentes." }
      ],
      project: "Analisar uma base de vendas e responder perguntas de negócio com SQL."
    },
    "react-primeiro-app": {
      firstLesson: "Componentes e estado",
      videoNote: "YouTube · aula inicial",
      videoId: "ERflhpiMc1o",
      videoSource: "Hora de Codar",
      lessons: [
        { title: "Componentes", duration: "15 min", objective: "Quebrar a interface em partes reutilizáveis." },
        { title: "Props e estado", duration: "17 min", objective: "Controlar dados que mudam na tela." },
        { title: "Dados externos", duration: "20 min", objective: "Carregar informações para a interface." },
        { title: "Rotas simples", duration: "18 min", objective: "Criar mais de uma tela no app." }
      ],
      project: "Criar um painel de cursos favoritos com busca, filtros e detalhes."
    },
    "node-api": {
      firstLesson: "Primeira rota com Node.js",
      videoNote: "YouTube · aula inicial",
      videoId: "IOfDoyP1Aq0",
      videoSource: "Felipe Rocha",
      lessons: [
        { title: "Servidor HTTP", duration: "16 min", objective: "Criar uma base para receber requisições." },
        { title: "Rotas e validação", duration: "20 min", objective: "Organizar endpoints e proteger entradas." },
        { title: "Banco de dados", duration: "24 min", objective: "Salvar informações de forma persistente." },
        { title: "Deploy da API", duration: "18 min", objective: "Colocar o backend no ar." }
      ],
      project: "Construir uma API de cursos com cadastro, login e matrícula."
    },
    "carreira-dev": {
      firstLesson: "Como estudar sem travar",
      videoNote: "YouTube · guia de estudo",
      videoId: "9tFmklPl3oo",
      videoSource: "Programação Dinâmica",
      lessons: [
        { title: "Rotina semanal", duration: "9 min", objective: "Estudar com constância sem exagero." },
        { title: "Projetos pequenos", duration: "13 min", objective: "Transformar estudo em entrega visível." },
        { title: "Portfólio honesto", duration: "16 min", objective: "Explicar projetos sem inflar experiência." },
        { title: "Preparação para vagas", duration: "18 min", objective: "Organizar próximos passos de carreira." }
      ],
      project: "Organizar um portfólio inicial com três projetos explicados de forma clara."
    }
  }
};

Object.assign(window.IniciaDevData.learningPlans, {
  "logica-programacao": {
    firstLesson: "Como pensar como programador",
    videoNote: "YouTube · trilha expandida",
    videoId: "8mei6uVttho",
    videoSource: "Curso em Vídeo",
    lessons: [
      { title: "O que é algoritmo", duration: "22 min", videoId: "8mei6uVttho", objective: "Entender algoritmo como uma sequência clara de passos." },
      { title: "Primeiro algoritmo", duration: "24 min", videoId: "M2Af7gkbbro", objective: "Escrever a primeira solução com entrada, processamento e saída." },
      { title: "Entrada e operadores", duration: "26 min", videoId: "RDrfZ-7WE8c", objective: "Usar dados digitados pelo usuário e operadores básicos." },
      { title: "Operadores lógicos", duration: "29 min", videoId: "Ig4QZNpVZYs", objective: "Combinar condições e interpretar expressões lógicas." },
      { title: "Condições simples", duration: "31 min", videoId: "_g05aHdBAEY", objective: "Tomar decisões com estruturas condicionais." },
      { title: "Condições compostas", duration: "30 min", videoId: "7gGFHzqh4d8", objective: "Escolher caminhos diferentes para casos diferentes." },
      { title: "Repetição enquanto", duration: "31 min", videoId: "U5PnCt58Q68", objective: "Repetir ações enquanto uma condição for verdadeira." },
      { title: "Repetição para", duration: "34 min", videoId: "fP49L1i_-HU", objective: "Resolver listas de tarefas com laços controlados." },
      { title: "Procedimentos", duration: "22 min", videoId: "KoNehy7rn8U", objective: "Separar o algoritmo em blocos reutilizáveis." }
    ],
    project: "Criar um jogo de perguntas no navegador com pontuação, repetição de rodadas e feedback de acertos."
  },
  "html-css": {
    firstLesson: "Sua primeira página publicada",
    videoNote: "YouTube · trilha expandida",
    videoId: "Ejkb_YpuHWs",
    videoSource: "Curso em Vídeo",
    lessons: [
      { title: "Comece aqui", duration: "13 min", videoId: "Ejkb_YpuHWs", objective: "Entender a proposta do curso e o caminho de aprendizado." },
      { title: "Ferramentas de trabalho", duration: "14 min", videoId: "UForX7ehChM", objective: "Preparar editor, navegador e organização de arquivos." },
      { title: "Primeiro código HTML", duration: "10 min", videoId: "E6CdIawPTh0", objective: "Criar a primeira página HTML do zero." },
      { title: "Parágrafos e quebras", duration: "13 min", videoId: "f6NTJdtEFOc", objective: "Formatar textos simples com HTML." },
      { title: "Hierarquia de títulos", duration: "16 min", videoId: "aiOEBhozEOg", objective: "Organizar conteúdo com títulos corretos." },
      { title: "Semântica HTML5", duration: "16 min", videoId: "HaSgt1hK2Fs", objective: "Usar tags com significado e acessibilidade." },
      { title: "Favicon", duration: "11 min", videoId: "1ZeettFfxys", objective: "Adicionar identidade visual básica ao site." },
      { title: "Links e âncoras", duration: "16 min", videoId: "LeOVXQDsAIY", objective: "Conectar páginas e criar navegação." },
      { title: "CSS inline", duration: "17 min", videoId: "byqhpuVpvEI", objective: "Entender onde os estilos entram." },
      { title: "CSS interno", duration: "19 min", videoId: "fzyab4P2pn8", objective: "Organizar estilos dentro da página." },
      { title: "CSS externo", duration: "17 min", videoId: "-i1JVMspDJQ", objective: "Separar HTML e CSS de forma profissional." }
    ],
    project: "Montar uma página pessoal responsiva com navegação, identidade visual, seção de projetos e links de contato."
  },
  "javascript-zero": {
    firstLesson: "Interações com JavaScript",
    videoNote: "YouTube · trilha expandida",
    videoId: "Ptbk2af68e8",
    videoSource: "Curso em Vídeo",
    lessons: [
      { title: "O que JavaScript faz", duration: "19 min", videoId: "Ptbk2af68e8", objective: "Entender o papel do JavaScript em páginas web." },
      { title: "Primeiro script", duration: "13 min", videoId: "OmmJBfcMJA8", objective: "Executar JavaScript no navegador pela primeira vez." },
      { title: "Variáveis e tipos", duration: "26 min", videoId: "Vbabsye7mWo", objective: "Guardar dados e entender tipos primitivos." },
      { title: "Tratamento de dados", duration: "26 min", videoId: "OJgu_KCCUSY", objective: "Converter, formatar e manipular valores." },
      { title: "Operadores parte 1", duration: "24 min", videoId: "hZG9ODUdxHo", objective: "Usar operadores aritméticos e relacionais." },
      { title: "Operadores parte 2", duration: "25 min", videoId: "BP63NhITvao", objective: "Combinar expressões com lógica." },
      { title: "Introdução ao DOM", duration: "29 min", videoId: "WWZX8RWLxIk", objective: "Selecionar elementos HTML com JavaScript." },
      { title: "Eventos DOM", duration: "29 min", videoId: "wWnBB-mZIvY", objective: "Responder a cliques e interações do usuário." },
      { title: "Condições", duration: "31 min", videoId: "cOdG4eACN2A", objective: "Criar fluxos diferentes conforme dados de entrada." },
      { title: "Repetições", duration: "25 min", videoId: "5rZqYPKIwkY", objective: "Automatizar ações repetidas." },
      { title: "Funções", duration: "26 min", videoId: "mc3TKp2XzhI", objective: "Organizar código em blocos reutilizáveis." }
    ],
    project: "Construir uma lista de tarefas com criação, filtros, estado salvo, contadores e pequenas animações."
  },
  "python-iniciantes": {
    firstLesson: "Python para automatizar tarefas",
    videoNote: "YouTube · trilha expandida",
    videoId: "S9uPNppGsGo",
    videoSource: "Curso em Vídeo",
    lessons: [
      { title: "Seja um programador", duration: "29 min", videoId: "S9uPNppGsGo", objective: "Entender por que Python é uma boa primeira linguagem." },
      { title: "Para que serve Python", duration: "28 min", videoId: "Mp0vhMDI7fA", objective: "Conhecer aplicações reais de Python." },
      { title: "Instalação e ambiente", duration: "24 min", videoId: "VuKvR1J2LQE", objective: "Preparar Python e ferramentas locais." },
      { title: "Primeiros comandos", duration: "27 min", videoId: "31llNGKWDdo", objective: "Executar comandos e imprimir resultados." },
      { title: "PyCharm e QPython", duration: "20 min", videoId: "ElRd0cbXIv4", objective: "Conhecer alternativas de editor." },
      { title: "Tipos primitivos", duration: "27 min", videoId: "hdDHg1p3YVc", objective: "Trabalhar com números, textos e conversões." },
      { title: "Operadores aritméticos", duration: "28 min", videoId: "Vw6gLypRKmY", objective: "Resolver cálculos e expressões." },
      { title: "Módulos", duration: "33 min", videoId: "oOUyhGNib2Q", objective: "Importar recursos prontos da linguagem." },
      { title: "Manipulando texto", duration: "26 min", videoId: "a7DH88vk2Sk", objective: "Fatiar, buscar e transformar strings." },
      { title: "Condições", duration: "35 min", videoId: "K10u3XIf1-Q", objective: "Criar decisões com if e else." },
      { title: "Repetição for", duration: "31 min", videoId: "cL4YDtFnCt4", objective: "Repetir ações em sequências." },
      { title: "Repetição while", duration: "32 min", videoId: "LH6OIn2lBaI", objective: "Repetir ações até uma condição mudar." }
    ],
    project: "Criar um organizador simples de tarefas usando Python, menus, validação de entrada e arquivos locais."
  },
  "git-github": {
    firstLesson: "Seu primeiro repositório",
    videoNote: "YouTube · trilha expandida",
    videoId: "Kyw91mqCHD0",
    videoSource: "Rafaella Ballerini / Curso em Vídeo",
    lessons: [
      { title: "Git e GitHub na prática", duration: "50 min", videoId: "Kyw91mqCHD0", objective: "Entender o fluxo completo de versionamento." },
      { title: "O que é Git", duration: "13 min", videoId: "xEKo29OWILE", objective: "Entender versionamento e histórico de mudanças." },
      { title: "Instalação", duration: "15 min", videoId: "NgWExh3bswg", objective: "Preparar Git e GitHub no computador." },
      { title: "Primeiro repositório", duration: "13 min", videoId: "5BYm7UdCrX0", objective: "Criar um repositório inicial." },
      { title: "Publicar projeto", duration: "16 min", videoId: "P0Hvrf8T3zo", objective: "Enviar arquivos locais para o GitHub." },
      { title: "Branches", duration: "18 min", videoId: "66R0MFw8Vxs", objective: "Separar mudanças sem bagunçar o projeto principal." },
      { title: "Pull request", duration: "12 min", videoId: "IMerCpaT_zM", objective: "Propor alterações para revisão." },
      { title: "GitHub em vários PCs", duration: "13 min", videoId: "c-MATEcIuPQ", objective: "Sincronizar trabalho em mais de uma máquina." }
    ],
    project: "Publicar um projeto no GitHub com README, histórico de commits, branches e uma página online."
  },
  "sql-pratico": {
    firstLesson: "Consultas que respondem perguntas",
    videoNote: "YouTube · trilha expandida",
    videoId: "Ofktsne-utM",
    videoSource: "Curso em Vídeo",
    lessons: [
      { title: "O que é banco de dados", duration: "31 min", videoId: "Ofktsne-utM", objective: "Entender tabelas, registros e uso de bancos." },
      { title: "Instalando MySQL", duration: "28 min", videoId: "5JbAOWJbgIA", objective: "Preparar ambiente local para praticar." },
      { title: "Primeiro banco", duration: "28 min", videoId: "m9YPlX0fcJk", objective: "Criar banco de dados e primeiras tabelas." },
      { title: "Estrutura das tabelas", duration: "27 min", videoId: "cHLKtALWDos", objective: "Melhorar campos, tipos e organização." },
      { title: "INSERT INTO", duration: "26 min", videoId: "NCG9niOlm40", objective: "Inserir dados nas tabelas." },
      { title: "ALTER TABLE", duration: "21 min", videoId: "To9qUcEMuY0", objective: "Alterar estruturas sem recriar tudo." },
      { title: "SELECT parte 1", duration: "35 min", videoId: "GaOlyL3Uv9M", objective: "Consultar dados de forma objetiva." },
      { title: "SELECT parte 2", duration: "38 min", videoId: "q4hPo83-Buo", objective: "Filtrar, ordenar e limitar resultados." },
      { title: "SELECT parte 3", duration: "32 min", videoId: "ocyVJ9gRUaE", objective: "Aprofundar consultas e critérios." },
      { title: "Chaves e JOIN", duration: "41 min", videoId: "paZNDJAPT4E", objective: "Relacionar tabelas com chaves estrangeiras." },
      { title: "JOIN com várias tabelas", duration: "28 min", videoId: "jx2ne8iZMOA", objective: "Responder perguntas cruzando dados." }
    ],
    project: "Analisar uma base de vendas com consultas, filtros, ordenação e JOINs entre tabelas."
  },
  "react-primeiro-app": {
    firstLesson: "Componentes e estado",
    videoNote: "YouTube · trilha expandida",
    videoId: "hd2B7XQAFls",
    videoSource: "Programação Web / Hora de Codar",
    lessons: [
      { title: "React para iniciantes", duration: "60 min", videoId: "hd2B7XQAFls", objective: "Entender JSX, componentes e a ideia do React." },
      { title: "Componentes e props", duration: "14 min", videoId: "QwJHmcEJcPM", objective: "Dividir a interface em partes reutilizáveis." },
      { title: "Componentes na prática", duration: "12 min", videoId: "wAwcy2tfWiQ", objective: "Criar componentes simples com responsabilidade clara." },
      { title: "Props", duration: "12 min", videoId: "IujXKlcpTdM", objective: "Passar dados de um componente para outro." },
      { title: "useState", duration: "18 min", videoId: "3m3UaEvQkhQ", objective: "Controlar dados que mudam na tela." },
      { title: "Hooks essenciais", duration: "30 min", videoId: "Fc-___dblSI", objective: "Entender o papel dos hooks no React moderno." },
      { title: "React Router", duration: "21 min", videoId: "7b42lVMdEjE", objective: "Criar navegação entre telas." },
      { title: "Projeto todo list", duration: "45 min", videoId: "pSHN5gnYnQ4", objective: "Construir um projeto pequeno com estado e listas." }
    ],
    project: "Criar um painel de cursos favoritos com busca, filtros, detalhes e navegação entre telas."
  },
  "node-api": {
    firstLesson: "Primeira rota com Node.js",
    videoNote: "YouTube · trilha expandida",
    videoId: "IOfDoyP1Aq0",
    videoSource: "Felipe Rocha / DevClub",
    lessons: [
      { title: "Node.js para iniciantes", duration: "60 min", videoId: "IOfDoyP1Aq0", objective: "Entender Node e executar JavaScript no servidor." },
      { title: "O que é API", duration: "9 min", videoId: "vGuqKIRWosk", objective: "Entender APIs, endpoints e comunicação entre sistemas." },
      { title: "API do zero com Express", duration: "55 min", videoId: "94FonmsT27s", objective: "Criar rotas com Node e Express." },
      { title: "Request e response", duration: "13 min", videoId: "q1MjPUZUPFs", objective: "Ler dados de requisições e responder corretamente." },
      { title: "API com banco", duration: "60 min", videoId: "PyrMT0GA3sE", objective: "Persistir dados e estruturar endpoints." },
      { title: "CRUD completo", duration: "55 min", videoId: "iXZeDbhJTkM", objective: "Criar operações de criação, leitura, atualização e remoção." },
      { title: "Autenticação", duration: "45 min", videoId: "KKTX1l3sZGk", objective: "Entender login, tokens e proteção de rotas." },
      { title: "Publicando servidor", duration: "20 min", videoId: "163jmMqvGmY", objective: "Colocar um backend simples online." }
    ],
    project: "Construir uma API de cursos com cadastro, login, matrícula e progresso de aulas."
  },
  "carreira-dev": {
    firstLesson: "Como estudar sem travar",
    videoNote: "YouTube · trilha expandida",
    videoId: "DlVYnGMbP00",
    videoSource: "Canais de carreira e comunidade dev",
    lessons: [
      { title: "Programação do zero", duration: "35 min", videoId: "DlVYnGMbP00", objective: "Entender o mapa inicial para entrar na programação." },
      { title: "Importância do algoritmo", duration: "12 min", videoId: "0dWQdjR4ykw", objective: "Saber por que lógica vem antes das ferramentas." },
      { title: "Erros de iniciante", duration: "18 min", videoId: "77hhQ5qCa3s", objective: "Evitar armadilhas comuns no começo." },
      { title: "Portfólio dev", duration: "16 min", videoId: "KSXeuq-mSWs", objective: "Entender o que colocar no portfólio." },
      { title: "Analisando portfólios", duration: "26 min", videoId: "d8MReiqqElE", objective: "Aprender com exemplos reais de apresentação." },
      { title: "Projetos para portfólio", duration: "14 min", videoId: "ME58RWmVhe8", objective: "Escolher projetos que mostram habilidade." },
      { title: "Portfólio com GitHub", duration: "18 min", videoId: "94kXOfAL12Q", objective: "Usar GitHub como vitrine de aprendizado." },
      { title: "Primeira vaga", duration: "20 min", videoId: "3rB0Td20SSs", objective: "Organizar rotina, currículo e abordagem inicial." }
    ],
    project: "Organizar um portfólio inicial com três projetos, README, vídeo curto de apresentação e plano semanal de evolução."
  }
});

window.IniciaDevData.courses.push(
  {
    id: "ia-fundamentos",
    title: "Inteligência Artificial para Iniciantes",
    provider: "IA Foundations",
    category: "ia",
    level: "iniciante",
    duration: 9,
    rating: 4.8,
    students: "12 mil",
    badge: "Nova trilha",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    description: "Entenda IA, prompts, ferramentas generativas e aplicações práticas para estudo, trabalho e criação."
  },
  {
    id: "marketing-digital-zero",
    title: "Marketing Digital do Zero",
    provider: "Growth Start",
    category: "marketing",
    level: "iniciante",
    duration: 10,
    rating: 4.7,
    students: "14 mil",
    badge: "Para vender",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description: "Aprenda posicionamento, canais digitais, conteúdo, tráfego e funil para começar a divulgar projetos."
  },
  {
    id: "financas-pessoais",
    title: "Finanças Pessoais sem Complicação",
    provider: "Vida Financeira",
    category: "financas",
    level: "iniciante",
    duration: 8,
    rating: 4.8,
    students: "17 mil",
    badge: "Essencial",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    description: "Organize gastos, quite dívidas, monte reserva e aprenda os primeiros passos para investir melhor."
  },
  {
    id: "ingles-iniciantes",
    title: "Inglês para Iniciantes",
    provider: "Idioma Prático",
    category: "idiomas",
    level: "iniciante",
    duration: 12,
    rating: 4.7,
    students: "21 mil",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    description: "Comece pelo vocabulário básico, pronúncia, frases úteis e conversação simples para o dia a dia."
  },
  {
    id: "design-edicao-video",
    title: "Design e Edição de Vídeo para Criadores",
    provider: "Creator Lab",
    category: "design",
    level: "iniciante",
    duration: 11,
    rating: 4.8,
    students: "10 mil",
    badge: "Criativo",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    description: "Aprenda Canva, fundamentos visuais, edição no CapCut/Premiere e criação de peças para redes sociais."
  },
  {
    id: "concursos-base",
    title: "Base para Concursos Públicos",
    provider: "Estudo Direcionado",
    category: "concursos",
    level: "iniciante",
    duration: 10,
    rating: 4.6,
    students: "9 mil",
    badge: "Método",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    description: "Monte rotina, estude português, resolva questões e organize revisão para concursos públicos."
  },
  {
    id: "empreendedorismo-zero",
    title: "Negócios e Empreendedorismo do Zero",
    provider: "Negócio Real",
    category: "negocios",
    level: "iniciante",
    duration: 9,
    rating: 4.7,
    students: "8 mil",
    badge: "Primeiro negócio",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    description: "Valide uma ideia, entenda cliente, precifique, venda e organize os primeiros processos do negócio."
  }
);

Object.assign(window.IniciaDevData.learningPlans, {
  "ia-fundamentos": {
    firstLesson: "O que é inteligência artificial",
    videoNote: "YouTube · trilha prática",
    videoId: "jQMbuK6URws",
    videoSource: "Curso em Vídeo e criadores de IA",
    lessons: [
      { title: "Módulo 1: panorama da IA", duration: "18 min", videoId: "jQMbuK6URws", objective: "Entender o que é IA e por que ela importa." },
      { title: "Módulo 1: IA para iniciantes", duration: "45 min", videoId: "JQeItPqowOg", objective: "Conhecer aplicações práticas no estudo e trabalho." },
      { title: "Módulo 2: prompts melhores", duration: "35 min", videoId: "HcB2qiQTXgg", objective: "Escrever comandos mais claros para ferramentas generativas." },
      { title: "Módulo 2: ferramentas de IA", duration: "28 min", videoId: "EJVxyE1VR7I", objective: "Comparar ferramentas e escolher a certa para cada tarefa." },
      { title: "Módulo 3: IA para produtividade", duration: "20 min", videoId: "kM4vaKIkeZE", objective: "Usar IA para estudar, resumir, planejar e criar." },
      { title: "Módulo 3: projeto com IA", duration: "42 min", videoId: "gYrfGnYob5Q", objective: "Montar um fluxo simples com pesquisa, texto e revisão." }
    ],
    project: "Criar um assistente de estudos com prompts, roteiro de pesquisa, resumo e checklist de revisão."
  },
  "marketing-digital-zero": {
    firstLesson: "Marketing digital do zero",
    videoNote: "YouTube · trilha prática",
    videoId: "MQDUUodMfCQ",
    videoSource: "Criadores de marketing digital",
    lessons: [
      { title: "Módulo 1: fundamentos", duration: "35 min", videoId: "MQDUUodMfCQ", objective: "Entender canais, oferta, público e posicionamento." },
      { title: "Módulo 1: marketing para iniciantes", duration: "55 min", videoId: "pVZFDOTHKxA", objective: "Conhecer o mapa geral para começar." },
      { title: "Módulo 2: o que é marketing digital", duration: "20 min", videoId: "emtfheMpOkU", objective: "Aprender conceitos básicos e termos comuns." },
      { title: "Módulo 2: produtos digitais", duration: "50 min", videoId: "rtoUz56U16M", objective: "Entender como vender produtos e serviços online." },
      { title: "Módulo 3: conteúdo e tráfego", duration: "30 min", videoId: "ice_xL6x4Qg", objective: "Criar canais de aquisição com pouco orçamento." },
      { title: "Módulo 3: plano com zero reais", duration: "28 min", videoId: "N9abxb_plRQ", objective: "Montar ações orgânicas para validar uma oferta." }
    ],
    project: "Criar uma campanha simples com persona, promessa, calendário de conteúdo e página de captura."
  },
  "financas-pessoais": {
    firstLesson: "Organização financeira",
    videoNote: "YouTube · trilha prática",
    videoId: "L77tVt9aqTA",
    videoSource: "Criadores de educação financeira",
    lessons: [
      { title: "Módulo 1: diagnóstico", duration: "30 min", videoId: "L77tVt9aqTA", objective: "Mapear renda, gastos, dívidas e prioridades." },
      { title: "Módulo 1: finanças em 20 minutos", duration: "20 min", videoId: "UMxSHX712qo", objective: "Entender conceitos essenciais sem complicação." },
      { title: "Módulo 2: educação financeira", duration: "25 min", videoId: "VLypOc9mdX8", objective: "Criar hábitos para controlar o dinheiro." },
      { title: "Módulo 2: poupar e investir", duration: "40 min", videoId: "2QIuPOIeCBg", objective: "Diferenciar reserva, investimento e risco." },
      { title: "Módulo 3: plano de 15 dias", duration: "28 min", videoId: "hORJvcWlJi8", objective: "Organizar ações rápidas para retomar controle." },
      { title: "Módulo 3: cursos gratuitos", duration: "12 min", videoId: "HJn-tE6Cj94", objective: "Encontrar materiais para continuar evoluindo." }
    ],
    project: "Montar uma planilha de orçamento mensal com metas, dívidas, reserva e próximos investimentos."
  },
  "ingles-iniciantes": {
    firstLesson: "Inglês nível zero",
    videoNote: "YouTube · trilha prática",
    videoId: "S45kHeWnT0M",
    videoSource: "Canais de inglês para iniciantes",
    lessons: [
      { title: "Módulo 1: nível zero", duration: "35 min", videoId: "S45kHeWnT0M", objective: "Aprender primeiras palavras e estrutura básica." },
      { title: "Módulo 1: aula 2", duration: "30 min", videoId: "fVZhgNAXMd0", objective: "Reforçar frases simples e vocabulário essencial." },
      { title: "Módulo 2: conversação lenta", duration: "28 min", videoId: "aAiUgFC9nm8", objective: "Treinar escuta com frases fáceis." },
      { title: "Módulo 2: conversação básica", duration: "25 min", videoId: "CUS-z-YPMQg", objective: "Praticar respostas curtas do cotidiano." },
      { title: "Módulo 3: curso básico", duration: "45 min", videoId: "5Bz6-AKqROc", objective: "Consolidar gramática inicial." },
      { title: "Módulo 3: aula atualizada", duration: "40 min", videoId: "onL8nfQUE80", objective: "Revisar vocabulário e criar rotina de estudo." }
    ],
    project: "Criar uma rotina de 15 minutos por dia com vocabulário, escuta, frases e gravação de fala."
  },
  "design-edicao-video": {
    firstLesson: "Design do zero",
    videoNote: "YouTube · trilha prática",
    videoId: "kGK7BN04Lss",
    videoSource: "Criadores de design e vídeo",
    lessons: [
      { title: "Módulo 1: estudar design", duration: "25 min", videoId: "kGK7BN04Lss", objective: "Entender fundamentos visuais e caminho de estudo." },
      { title: "Módulo 1: Canva para iniciantes", duration: "50 min", videoId: "3vpUosP7e6w", objective: "Criar peças simples no Canva." },
      { title: "Módulo 2: edição completa", duration: "60 min", videoId: "c-6hCK-hXh8", objective: "Entender fluxo básico de edição de vídeo." },
      { title: "Módulo 2: Premiere para iniciantes", duration: "35 min", videoId: "j84UCBEEuGI", objective: "Aprender cortes, timeline e exportação." },
      { title: "Módulo 3: CapCut no PC", duration: "30 min", videoId: "8bRpozHvKi4", objective: "Editar vídeos curtos com ferramenta acessível." },
      { title: "Módulo 3: CapCut completo", duration: "50 min", videoId: "BMX9duyCu68", objective: "Adicionar texto, transições, cortes e ritmo." },
      { title: "Módulo 4: Photoshop", duration: "60 min", videoId: "RxxPt8rDSQ8", objective: "Conhecer edição de imagem e composições." }
    ],
    project: "Criar uma identidade visual simples e editar um vídeo curto para redes sociais com capa, cortes e legenda."
  },
  "concursos-base": {
    firstLesson: "Como começar para concursos",
    videoNote: "YouTube · trilha prática",
    videoId: "zd8_NUqoZH4",
    videoSource: "Canais de preparação para concursos",
    lessons: [
      { title: "Módulo 1: português do zero", duration: "35 min", videoId: "zd8_NUqoZH4", objective: "Entender a ordem de estudo em língua portuguesa." },
      { title: "Módulo 1: plano de português", duration: "25 min", videoId: "nVMPo7jGG1k", objective: "Criar rotina para uma matéria base." },
      { title: "Módulo 2: aula de português", duration: "45 min", videoId: "UQn3lWudBdM", objective: "Estudar tópicos recorrentes em provas." },
      { title: "Módulo 2: melhor ordem", duration: "20 min", videoId: "oJV1dudPX8o", objective: "Priorizar assuntos que mais aparecem." },
      { title: "Módulo 3: método de estudo", duration: "18 min", videoId: "OZ6ZSGiM1OM", objective: "Organizar teoria, questões e revisão." },
      { title: "Módulo 3: qualquer concurso", duration: "22 min", videoId: "MtWvH8rFMT4", objective: "Montar uma base reaproveitável para editais." }
    ],
    project: "Criar um plano de 30 dias com ciclo de estudos, questões, revisão e controle de desempenho."
  },
  "empreendedorismo-zero": {
    firstLesson: "Mentalidade empreendedora",
    videoNote: "YouTube · trilha prática",
    videoId: "DzRxCtB8c8A",
    videoSource: "Canais de empreendedorismo",
    lessons: [
      { title: "Módulo 1: mentalidade", duration: "18 min", videoId: "DzRxCtB8c8A", objective: "Entender o comportamento de quem começa um negócio." },
      { title: "Módulo 1: mini curso prático", duration: "40 min", videoId: "3DmixvSk7Wg", objective: "Conhecer etapas iniciais para validar uma ideia." },
      { title: "Módulo 2: negócio em casa", duration: "30 min", videoId: "TphpXjugpv8", objective: "Pensar em operação simples com baixo custo." },
      { title: "Módulo 2: empreender do zero", duration: "60 min", videoId: "iGSVdG_yXII", objective: "Organizar ideia, oferta, cliente e venda." },
      { title: "Módulo 3: plano de negócios", duration: "25 min", videoId: "3DmixvSk7Wg", objective: "Transformar a ideia em plano de ação." },
      { title: "Módulo 3: crescimento", duration: "30 min", videoId: "TphpXjugpv8", objective: "Pensar em processos, atendimento e próximos passos." }
    ],
    project: "Validar uma ideia de negócio com pesquisa de cliente, proposta de valor, preço inicial e plano de primeira venda."
  }
});
