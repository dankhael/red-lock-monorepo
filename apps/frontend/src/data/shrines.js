// Dados dos shrines — edite estes arrays para adicionar/remover shrines

// Índice de shrines (página de seleção)
export const shrineIndex = [
  {
    id: 'nagi-seishiro',
    name: 'Nagi Seishiro',
    icon: 'https://i.pinimg.com/736x/aa/8f/18/aa8f18168ffe79b51363e56a2cf86233.jpg',
    color: '#ffffffff',
    categoryIcon: 'death',
    tagline: 'This curiosity of mine can\'t be stopped.',
    available: true,
  },
  {
    id: 'coming-soon-0',
    name: '???',
    icon: null,
    color: '#666',
    categoryIcon: null,
    tagline: 'Em breve...',
    available: false,
  },
  {
    id: 'coming-soon-1',
    name: '???',
    icon: null,
    color: '#666',
    categoryIcon: null,
    tagline: 'Em breve...',
    available: false,
  },
  {
    id: 'coming-soon-2',
    name: '???',
    icon: null,
    color: '#666',
    categoryIcon: null,
    tagline: 'Em breve...',
    available: false,
  },
  {
    id: 'coming-soon-3',
    name: '???',
    icon: null,
    color: '#666',
    categoryIcon: null,
    tagline: 'Em breve...',
    available: false,
  },
];

// Dados completos de cada shrine individual
export const shrineDetails = {
  'nagi-seishiro': {
    id: 'nagi-seishiro',
    name: 'Nagi Seishiro',
    color: '#ffffffff',
    secondaryColor: '#000000ff',
    bgColor: '#57717e8c',
    textColor: '#1a1a2e',
    accentColor: '#000000ff',
    bannerImage: 'https://i.imgur.com/jMMbOQP.png',
    tagline: 'This curiosity of mine can\'t be stopped.',
    tabs: {
      sobre: {
        content: `Na maioria das religiões a morte é vista como um processo de transição, uma passagem de ciclos e não como o fim, mais especificamente no budismo, a morte é só uma etapa antes do renascimento, provavelmente por isso a carta da morte no tarot é um signo de mudança e transformação. Acredito que o Nagi incorpore esse significado no seu personagem, um corpo em estado de inércia que só se move perante à iminência da morte.


Tendo sido criado sem quase nenhuma atenção dos seus pais (segundo ele uma criação laissez-faire), claramente o Nagi nunca teve uma referência ou guia pra se apegar ou pra ensiná-lo coisas básicas, por isso ele tem dificuldades pra lidar com coisas como motivação, disciplina, expressar seus sentimentos e a sua curiosidade. Apesar do seu talento absurdo, quando se fala de ego, o Nagi era o mais desprovido de todo o blue lock, por isso é tão prazeroso vê-lo aprender e evoluir, descobrir sensações novas, se frustrar e principalmente se entender melhor.
`,
        infobox: {
          Japonês: '凪 誠士郎',
          Apelidos: '"O Gênio Preguiçoso", "O Gênio Caído", "Painman", "hassle man"',
          'Armas': 'Controle de Bola, Dominio, Two Stage Fake Volley, Five Shot Revolver',
          'Time': 'Brightneon',
        },
      },
      galeria: [
        {
          src: 'https://preview.redd.it/which-is-the-best-panel-of-nagi-seishiro-v0-xo6prw4iqmef1.png?width=1520&format=png&auto=webp&s=63aca3c055ab88a0acb397af358342c46fae7c07',
          alt: 'Two Stage Fake Volley em Episode Nagi',
        },
        {
          src: 'https://i.redd.it/obh02r31fbrd1.jpeg',
          alt: 'Ego do Nagi exposto',
        },
        {
          src: 'https://preview.redd.it/which-is-the-best-panel-of-nagi-seishiro-v0-2edmarivmmef1.jpeg?width=1920&format=pjpg&auto=webp&s=34341a28b33968d1d293c56767f2c282f8ce4fdc',
          alt: 'Nagi tentando ser independente e sonhar por conta própria',
        },
        {
          src: 'https://preview.redd.it/which-is-the-best-panel-of-nagi-seishiro-v0-h308lg6v5lef1.jpeg?width=1050&format=pjpg&auto=webp&s=239a3d4e0ef702ea9f6e329a5e7f0407cbd5022e',
          alt: 'Zero Reset Turn na Liga Neo Egoísta',
        },
        {
          src: 'https://i.pinimg.com/736x/3a/60/94/3a6094e93fc9e041cc58cd1d588f7cc5.jpg',
          alt: 'O renascimento da aura da morte de Nagi',
        },
        {
          src: 'https://preview.redd.it/reo-x-nagi-teaming-up-was-super-sick-v0-xofhm2qa68ja1.jpg?width=1080&crop=smart&auto=webp&s=b3e6af7fe15403bd1a390482d064b47d442add37',
          alt: 'Grito de vitória após o gol contra o Bastard Munchen',
        },
        {
          src: 'https://i.redd.it/what-part-of-nagis-super-goal-makes-it-a-fluke-v0-vx1puw8ffccc1.jpg?width=1600&format=pjpg&auto=webp&s=dc36f0e51b5b66edaa0f69d4d863f76d51947ad1',
          alt: 'Five Shot Revolver, o gol impossivel',
        },
        {
          src: 'https://pbs.twimg.com/media/Ehd6vXNUMAEcDRP.jpg',
          alt: 'Two Stage Fake Volley no mangá original de Blue Lock',
        },
        {
          src: 'https://pbs.twimg.com/media/GjIgAGdWwAAZJiw.png',
          alt: 'Nagi sendo o mais motivado do mundo',
        },
        {
          src: 'https://pbs.twimg.com/media/HFDlDHtXIAEpq-h.jpg',
          alt: 'O retorno de Nagi',
        },
        {
          src: 'https://pbs.twimg.com/media/GjGYhbDaUAAr3d7.jpg',
          alt: 'A dupla improvavel, Nagi e Barou, Leão e Morte',
        },
        {
          src: 'https://preview.redd.it/nagi-x-bessatsu-shonen-magazine-hq-redraw-and-clean-by-me-v0-kugr6a88xz4e1.jpeg?width=640&crop=smart&auto=webp&s=1140d98225d0e8f57cc38d759b6877e40e3eec57',
          alt: 'Nagi e a aura da morte',
        },
      ],
      citacoes: [
        {
          text: 'I\'ll believe you but promise me one thing: Stay with me \'till the end',
          source: 'Nagi Seishiro para Reo Mikage',
        },
        {
          text: 'I hate feeling frustrated, so I don\'t want to lose anymore. It\'s not fun... unless I win',
          source: 'Nagi Seishiro',
        },
        {
          text: 'Nice to meet you, Japan. I\'m Seishiro Nagi.',
          source: 'Nagi Seishiro depois de marcar o gol de empate contra o Japão Sub-20',
        },
        {
          text: 'This fire, this pleasure, I have things I could lose, and dreams I\'m putting on the line, so that\'s why I can get fired up.',
          source: 'Nagi Seishiro',
        },
      ],
      links: [
        {
          label: 'Nagi Seishiro Edit - TikTok',
          url: 'https://www.tiktok.com/@treasured.com/video/7494598543911472402?is_from_webapp=1&sender_device=pc&web_id=7542129298619631160',
        },
        {
          label: 'Nagi Seishiro - Blue Lock Wiki',
          url: 'https://bluelock.fandom.com/wiki/Seishiro_Nagi',
        },
        {
          label: 'Nagi Seishiro Goal - YouTube',
          url: 'https://www.youtube.com/watch?v=qTsjNWglgNk',
        },
      ],
    },
  },
  'wind-waker': {
    id: 'wind-waker',
    name: 'The Legend of Zelda: The Wind Waker',
    color: '#4fc3f7',
    secondaryColor: '#0288d1',
    bgColor: '#e1f5fe',
    textColor: '#1a1a2e',
    accentColor: '#ff6f00',
    bannerImage: 'https://placehold.co/1200x400/4fc3f7/ffffff?text=Wind+Waker',
    tagline: 'O melhor Zelda e eu morro nessa colina.',
    tabs: {
      sobre: {
        content: `Wind Waker foi o primeiro Zelda que eu joguei do começo ao fim, e desde então nunca mais saiu do meu coração. O cel-shading que todo mundo odiou no reveal se tornou o visual mais atemporal da franquia.

Navegar pelo Great Sea com o King of Red Lions, descobrir ilhas escondidas, sentir o vento mudar... tudo nesse jogo respira aventura e liberdade. A história de um garoto comum que se torna herói por amor à irmã é simples, mas contada com tanta alma que emociona até hoje.

O final é um dos melhores de qualquer jogo que eu já joguei. Hyrule submersa, o rei se sacrificando, a esperança de um novo mundo. Perfeito.`,
        infobox: {
          Desenvolvedor: 'Nintendo EAD',
          Ano: '2002',
          Plataforma: 'GameCube',
          'Gênero': 'Action-Adventure',
          Diretor: 'Eiji Aonuma',
        },
      },
      galeria: [
        {
          src: 'https://placehold.co/600x400/4fc3f7/ffffff?text=Great+Sea',
          alt: 'Navegando pelo Great Sea',
        },
        {
          src: 'https://placehold.co/600x400/0288d1/ffffff?text=Dragon+Roost',
          alt: 'Dragon Roost Island',
        },
        {
          src: 'https://placehold.co/600x400/ff6f00/ffffff?text=Wind+Waker+Item',
          alt: 'Link usando o Wind Waker',
        },
        {
          src: 'https://placehold.co/600x400/1a1a2e/ffffff?text=Hyrule+Castle',
          alt: 'Hyrule Castle submerso',
        },
        {
          src: 'https://placehold.co/600x400/4fc3f7/ffffff?text=Toon+Link',
          alt: 'Toon Link em ação',
        },
        {
          src: 'https://placehold.co/600x400/0288d1/ffffff?text=Final+Battle',
          alt: 'Batalha final contra Ganondorf',
        },
      ],
      citacoes: [
        {
          text: 'My country lay within a vast desert. When the sun rose into the sky, a burning wind punished my lands, searing the world. And in my suffering, I naturally turned my gaze to the north, to the green fields of Hyrule.',
          source: 'Ganondorf',
        },
        {
          text: 'I have scattered the seeds of the future...',
          source: 'Daphnes Nohansen Hyrule',
        },
        {
          text: 'The wind... it is blowing.',
          source: 'Ganondorf',
        },
        {
          text: 'Do not betray my expectations.',
          source: 'Tetra',
        },
      ],
      links: [
        {
          label: 'Zelda Wiki — The Wind Waker',
          url: 'https://zelda.fandom.com/wiki/The_Legend_of_Zelda:_The_Wind_Waker',
        },
        {
          label: 'Soundtrack no YouTube',
          url: 'https://www.youtube.com/results?search_query=wind+waker+ost',
        },
        {
          label: 'Speedrun (Any%) — ZeldaSpeedRuns',
          url: 'https://www.zeldaspeedruns.com/tww/',
        },
      ],
    },
  },
  'death-note': {
    id: 'death-note',
    name: 'Death Note',
    color: '#9c27b0',
    secondaryColor: '#6a1b9a',
    bgColor: '#f3e5f5',
    textColor: '#1a1a2e',
    accentColor: '#d32f2f',
    bannerImage: 'https://placehold.co/1200x400/9c27b0/ffffff?text=Death+Note',
    tagline: 'O caderno que mudou minha vida.',
    tabs: {
      sobre: {
        content: `Death Note foi o anime que me transformou em otaku. Assisti pela primeira vez com uns 13 anos e fiquei completamente obcecado com o duelo intelectual entre Light e L.

O conceito é genial na sua simplicidade: um caderno que mata quem tiver o nome escrito nele. Mas o que Tsugumi Ohba e Takeshi Obata fizeram com essa premissa é extraordinário — um thriller psicológico onde cada episódio é um jogo de xadrez.

L é um dos melhores personagens já criados. Excêntrico, brilhante, e com uma humanidade escondida por trás de toda aquela estranheza. A dinâmica dele com Light é magnética.

Sim, o anime cai um pouco depois do episódio 25. Mas os primeiros 25 episódios são perfeição absoluta em anime.`,
        infobox: {
          'Mangaká': 'Tsugumi Ohba / Takeshi Obata',
          Ano: '2006',
          'Episódios': '37',
          'Estúdio': 'Madhouse',
          'Gênero': 'Thriller Psicológico',
        },
      },
      galeria: [
        {
          src: 'https://placehold.co/600x400/9c27b0/ffffff?text=Light+Yagami',
          alt: 'Light Yagami',
        },
        {
          src: 'https://placehold.co/600x400/1a1a2e/ffffff?text=L',
          alt: 'L em sua pose clássica',
        },
        {
          src: 'https://placehold.co/600x400/d32f2f/ffffff?text=Ryuk',
          alt: 'Ryuk comendo uma maçã',
        },
        {
          src: 'https://placehold.co/600x400/6a1b9a/ffffff?text=Death+Note+Book',
          alt: 'O caderno Death Note',
        },
      ],
      citacoes: [
        {
          text: 'I am justice!',
          source: 'Light Yagami',
        },
        {
          text: 'I\'ll take a potato chip... and eat it!',
          source: 'Light Yagami',
        },
        {
          text: 'The real evil is the power to kill people. Someone who finds himself with that power is cursed. No matter how you use it, anything obtained by killing people can never bring true happiness.',
          source: 'Soichiro Yagami',
        },
      ],
      links: [
        {
          label: 'Death Note Wiki',
          url: 'https://deathnote.fandom.com/wiki/Death_Note_Wiki',
        },
        {
          label: 'Assistir no Crunchyroll',
          url: 'https://www.crunchyroll.com/death-note',
        },
      ],
    },
  },
};
