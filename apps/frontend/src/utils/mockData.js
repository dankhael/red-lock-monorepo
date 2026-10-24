// Dados mock para desenvolvimento sem o Strapi rodando.
// Ative com REACT_APP_USE_MOCK_DATA=true (ou `npm run dev:mock` na raiz).
// Imagens ficam em public/mock/ para não depender de links externos.
// Os posts cobrem casos de borda de layout: título longo, sem resumo, sem capa,
// todas as categorias do enum do Strapi (Review / Opinião / Artigo) e markdown completo.

const styleGuideContent = `Este post existe só para testar a tipografia do blog. Ele tem **negrito**, *itálico*, [um link](https://dankredbox.com) e \`código inline\` no meio do parágrafo.

## Um subtítulo (h2)

Parágrafo depois de um h2. Textos longos precisam respirar: a coluna de leitura tem ~720px e o corpo usa Atkinson Hyperlegible Next em 19px com entrelinha 1.75.

### Um subtítulo menor (h3)

- Item de lista não ordenada
- Outro item, um pouco mais comprido, para ver como a quebra de linha se comporta dentro da lista
- Terceiro item

1. Primeiro passo
2. Segundo passo
3. Terceiro passo

> Sorte é o fracasso que falhou.

![Imagem dentro do post](/mock/blue-lock.svg)

| Jogo | Nota | Plataforma |
| --- | --- | --- |
| Wind Waker | 10 | GameCube |
| Persona 5 | 9 | PS4 |

\`\`\`js
function hello() {
  return 'Red Box';
}
\`\`\`

---

Último parágrafo, depois de uma linha horizontal.`;

export const mockPosts = [
  {
    id: 1,
    title: 'Força Maior (2014) e como é bom ser covarde (e mentiroso)',
    slug: 'forca-maior-2014',
    summary: 'Porque a obsessão pelos alpes suíços está destruindo a masculinidade dos homens europeus',
    content: `Parece uma família feliz né? Só parece mesmo. **Force Majeure** (no Brasil: Força Maior), do diretor Ruben Östlund, é um filme sueco lançado em 2015 que retrata uma viagem de férias de uma família nos alpes suíços que… deu um pouco errado.

Não me entenda mal, não acontece uma catástrofe e eles não passam por muitas dificuldades para se manter juntos e sobreviver (apesar de ter uma avalanche no filme).

## A avalanche

> Uma avalanche desce as montanhas, inicialmente tímida, mas eventualmente tomando força.

O filme começa mostrando a rotina da família durante a viagem, e é aí que tudo começa a desandar. *(Texto mock — o post real vem do Strapi.)*`,
    image: '/mock/forca-maior.svg',
    publishedAt: '2025-09-10T12:00:00Z',
    publishedOn: '2025-09-10T12:00:00Z',
    category: 'Review',
    featured: true,
  },
  {
    id: 2,
    title: 'Hello World',
    slug: 'hello-world',
    summary: 'O passe tá pro ainda tá bem caro, lançou um brawler que ele é ultra-lendário…',
    content: `Primeiro post do blog! *(Texto mock.)*

Fiz esse site pra exercitar programação e pra ter um cantinho fora das redes sociais.`,
    image: '/mock/hello-world.svg',
    publishedAt: '2025-08-06T12:00:00Z',
    publishedOn: '2025-08-06T12:00:00Z',
    category: 'Artigo',
    featured: true,
  },
  {
    id: 3,
    title: 'Persona 5 e a arte de matar o tempo com estilo',
    slug: 'persona-5',
    summary: 'Um JRPG sobre rebeldia, calendário escolar e uma trilha sonora de acid jazz que não sai da cabeça.',
    content: `**Persona 5** é um JRPG da Atlus sobre um grupo de estudantes que invade o "palácio" mental de adultos corruptos. *(Texto mock.)*

## O que funciona

- Interface absurdamente estilosa
- Trilha do Shoji Meguro
- Gestão de tempo que vicia

## O que cansa

Os diálogos às vezes explicam a mesma coisa três vezes.`,
    image: '/mock/persona-5.svg',
    publishedAt: '2025-07-20T12:00:00Z',
    publishedOn: '2025-07-20T12:00:00Z',
    category: 'Review',
    featured: true,
  },
  {
    id: 4,
    title: 'Por que eu sempre volto pro Wind Waker',
    slug: 'por-que-eu-volto-pro-wind-waker',
    summary: 'O mar, o cel-shading e a sensação de que todo jogo deveria envelhecer assim.',
    content: `Wind Waker é o meu "jogo conforto". *(Texto mock.)*`,
    image: '/mock/wind-waker.svg',
    publishedAt: '2025-06-02T12:00:00Z',
    publishedOn: '2025-06-02T12:00:00Z',
    category: 'Opinião',
    featured: true,
  },
  {
    id: 5,
    title: 'The Sopranos: um título propositalmente longo para testar como os cards lidam com quebras de linha em várias larguras de tela',
    slug: 'the-sopranos-titulo-longo',
    summary: 'Este resumo também é comprido de propósito, para garantir que o corte em três linhas funciona e que o botão "Leia mais" não é empurrado para fora do card quando o texto cresce além do esperado em telas menores.',
    content: `Post de teste com título longo. *(Texto mock.)*`,
    image: '/mock/sopranos.svg',
    publishedAt: '2025-05-15T12:00:00Z',
    publishedOn: '2025-05-15T12:00:00Z',
    category: 'Opinião',
    featured: false,
  },
  {
    id: 6,
    title: 'Guia de estilo (post de teste)',
    slug: 'guia-de-estilo',
    summary: 'Todos os elementos de markdown que um post pode ter, para validar a tipografia.',
    content: styleGuideContent,
    image: '/mock/markdown.svg',
    publishedAt: '2025-04-01T12:00:00Z',
    publishedOn: '2025-04-01T12:00:00Z',
    category: 'Artigo',
    featured: false,
  },
  {
    id: 7,
    title: 'Post sem capa',
    slug: 'post-sem-capa',
    summary: 'Testa o fallback de imagem quando o post não tem coverImage no Strapi.',
    content: `Esse post não tem imagem de capa. *(Texto mock.)*`,
    image: '/images/no_image_found.png',
    publishedAt: '2025-03-10T12:00:00Z',
    publishedOn: '2025-03-10T12:00:00Z',
    category: 'Artigo',
    featured: false,
  },
];

export const mockQuote = { quote: 'Sorte é o fracasso que falhou', author: 'Ornn' };

export const mockFeaturedImage = {
  url: '/mock/featured-image.svg',
  caption: 'Imagem em destaque (mock)',
};

export const mockActivities = {
  game: 'The Legend of Zelda: Wind Waker',
  tv: 'The Sopranos',
  book: 'A República',
};

const track = (name, artist, image = '', album = '') => ({
  name,
  artist: { '#text': artist },
  image: [{ '#text': '' }, { '#text': image }],
  album: { '#text': album },
});

export const mockLastFmTracks = [
  track('NO BATIDÃO (Slowed)', 'ZXKAI e slxughter', '/mock/album-1.svg'),
  track('MUTILATOR', 'ZMAJOR e Lurk'),
  track('SEM CONTROLE (Slowed)', 'NIGHTFXRCE', '/mock/album-2.svg'),
  track('Gonna Fly Now (Theme From "Rocky")', 'Bill Conti', '/mock/album-3.svg'),
  track('we are number one', 'LazyTown'),
  track("I'm Still Standing", 'Taron Egerton', '/mock/album-1.svg'),
  track('My Way (Epic Version) (CHECK DESCRIPTION)', 'Akresh Khan'),
  track('gta 4 theme (slowed)', 'Gaido', '/mock/album-2.svg'),
];

export const mockAbout = {
  description: `Oi, meu nome é Danilo, mas pode me chamar de dankhael, preguiçoso por natureza, mas curioso na mesma medida. Desenvolvo software entre um gole e outro de coca cola, viciado em jogos (qualquer um!), apreciador de mangás (principalmente sobre jogos!) e torcedor do tricolor de Recife. Fiz esse site pra exercitar minhas habilidades de programação, e também pra colocar um pézinho fora dessas bolhas de eco e derretidoras de cerebro que são as redes sociais, espero que curta o site e que eu não tenha o abandonado depois de 2 meses XD. Tentando ser melhor (apesar de não parecer -_-).`,
  profileImage: '/mock/avatar.svg',
  socialMedia: {
    twitter: 'https://twitter.com/danilokhael',
    linkedin: 'https://www.linkedin.com/in/danilokhael/',
    instagram: 'https://instagram.com/danilokhael',
    discord: 'https://discordapp.com/users/240667893837201408',
    email: 'danilokhael@gmail.com',
  },
};

export const mockGames = [
  {
    id: 1,
    title: 'Space Adventure',
    slug: 'space-adventure',
    thumbnail: '/mock/blue-lock.svg',
    image: '/mock/blue-lock.svg',
    description: 'Jogo de exploração espacial (mock).',
    features: ['Explore 10+ planetas', 'Customize sua nave'],
    screenshots: ['/mock/wind-waker.svg', '/mock/persona-5.svg'],
    playLink: 'https://example.com/games/space-adventure',
  },
  {
    id: 2,
    title: 'Dungeon Crawler',
    slug: 'dungeon-crawler',
    thumbnail: '/mock/persona-5.svg',
    image: '/mock/persona-5.svg',
    description: 'Roguelike com dungeons procedurais (mock).',
    features: ['Dungeons procedurais', '50+ inimigos'],
    screenshots: ['/mock/sopranos.svg'],
    playLink: 'https://example.com/games/dungeon-crawler',
  },
];
