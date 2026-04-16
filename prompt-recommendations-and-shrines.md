# Prompt: Criar páginas de Recomendações e Shrines para blog pessoal

## Contexto do site existente

Tenho um blog pessoal chamado "Red Box" com a seguinte identidade visual:
- **Paleta de cores:** rosa/pink (#d4a0a0 ~ #c87e8a) como cor primária, branco como fundo principal, preto para texto, cinza claro para cards
- **Tipografia:** fonte monospace estilizada para títulos (tipo "Special Elite", "VT323", ou "Courier Prime"), sans-serif para corpo de texto
- **Header:** banner com fundo rosa com padrão floral repetido, silhuetas de personagens de anime/jogos em preto, logo "RED BOX" centralizado com ícone de cubo
- **Navbar:** borda arredondada preta, links: Home, Blog, Games, Extras, Guestbook, Sobre mim, campo de busca com botão rosa
- **Cards de post:** fundo branco/cinza claro, imagem de capa, título em fonte monospace, texto de preview, botão "Leia Mais →" rosa
- **Sidebar:** seções "O QUE ESTOU FAZENDO" (jogando/assistindo/lendo), "IMAGEM EM DESTAQUE", "LAST.FM LOG" — títulos em caixa alta com underline rosa
- **Vibe geral:** blog pessoal old-web/neocities, otaku/gamer, layout limpo mas com personalidade

O site usa HTML/CSS/JS estático (sem framework). As novas páginas devem manter o header e navbar do site existente.

---

## PÁGINA 1: Recomendações (`recomendacoes.html`)

### Referência visual
Inspirado no site "Twelvemen" (Neocities): página de recomendações com grid de capas de jogos/animes organizadas por categoria, com títulos grandes estilizados e efeito de marquee/scroll no texto da categoria ao fundo.

### Especificação

**Layout geral:**
- Mesmos header e navbar do site
- Fundo: branco ou levemente rosa (#fff5f5)
- Título principal "Recomendações" grande, com a mesma fonte monospace bold do site
- Cada seção de categoria separada visualmente

**Seções de categoria (exemplo: "Video Games", "Anime", "Filmes", "Músicas", "Mangás/HQs"):**
- Cada seção tem:
  1. Um **banner de categoria**: o nome da categoria em fonte grande/bold preta, com atrás dele um **marquee** do mesmo texto repetido em loop horizontal, opacidade reduzida (~0.15), criando o efeito de fundo como no Twelvemen
  2. Uma **linha decorativa** rosa (#c87e8a) separando o título do grid
  3. Um **grid responsivo** de cards de recomendação

**Cards de recomendação:**
- Imagem de capa (aspect-ratio fixa, tipo 3:4 para jogos/anime, 1:1 para álbuns)
- No hover: leve scale(1.05), sombra, e overlay escuro com o **nome do item** + **uma frase curta** (tipo tooltip)
- Sem borda, fundo transparente — as imagens falam por si
- Grid: `display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem;`

**Dados estruturados (JSON):**
Criar uma estrutura de dados simples que eu possa editar para adicionar/remover itens:

```js
const recommendations = [
  {
    category: "Video Games",
    items: [
      { name: "Portal", image: "img/recs/portal.jpg", comment: "Puzzle perfeito." },
      { name: "Ghost Trick", image: "img/recs/ghost-trick.jpg", comment: "Narrativa genial." },
      // ...
    ]
  },
  {
    category: "Anime",
    items: [ /* ... */ ]
  },
  // ...
];
```

A página deve ser **gerada via JS** a partir desse JSON, iterando categorias e items para criar o HTML dinamicamente. Isso facilita manutenção.

**Extras opcionais:**
- Navegação rápida com âncoras no topo da página (links para cada categoria)
- Animação suave de scroll ao clicar nas âncoras
- Filtro simples por categoria (botões toggle que mostram/escondem seções)

---

## PÁGINA 2: Shrines — Página Índice (`shrines.html`)

### Conceito
Uma página no estilo **"character select screen"** de jogo de luta/RPG. Cada shrine é representado por um ícone/banner clicável que leva à página individual do shrine. O visual deve ser divertido, interativo, e diferente do resto do site (pode quebrar a paleta rosa — cada ícone de shrine pode ter sua própria cor).

### Especificação

**Layout geral:**
- Mesmos header e navbar do site
- Fundo: pode ser mais escuro que o resto do site (tipo #1a1a2e ou um gradiente escuro) para dar a vibe de "tela de seleção"
- Título "SHRINES" grande, estilizado, centralizado, com efeito de glow ou text-shadow colorido
- Subtítulo pequeno: "Escolha um shrine para explorar" ou algo temático

**Grid de seleção (character select):**
- Grid de slots com borda estilizada (tipo pixel art border ou borda dupla)
- Cada slot contém:
  1. **Imagem/ícone** do shrine (pode ser uma imagem quadrada, pixel art, ou ícone desenhado)
  2. **Nome** do shrine embaixo
  3. **Borda/glow** com cor temática do shrine (cada shrine tem sua cor)
- Layout: `display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1.5rem; max-width: 900px; margin: 0 auto;`

**Efeitos de hover (o que faz parecer um character select):**
- No hover:
  - A imagem faz um leve **bounce/shake** (CSS animation `@keyframes`)
  - A borda ganha um **glow** mais intenso (box-shadow com a cor do shrine)
  - O nome fica **highlighted** (fundo colorido ou text-shadow)
  - Opcionalmente: som de "cursor move" de menu de jogo (usando um `<audio>` curto com JS no mouseenter)
- No estado selecionado/hover, pode aparecer uma **tooltip ou preview card** com:
  - Uma frase descritiva ("Meu jogo favorito de todos os tempos")
  - Um ícone de categoria (🎮 jogos, 🎵 música, 🐱 pet, etc.)

**Efeito extra de "character select":**
- Borda decorativa ao redor de todo o grid (como a borda de um menu de jogo retro)
- Um indicador visual tipo "cursor de seleção" que segue o mouse ou destaca o item atual
- Slots vazios com "?" ou "coming soon" para shrines futuros (cria antecipação)

**Dados estruturados (JSON):**
```js
const shrines = [
  {
    id: "wind-waker",
    name: "Wind Waker",
    icon: "img/shrines/icons/wind-waker.png",
    color: "#4fc3f7",       // cor temática
    category: "game",       // game | music | character | pet | other
    tagline: "O melhor Zelda e eu morro nessa colina.",
    url: "shrines/wind-waker.html"
  },
  {
    id: "coming-soon-1",
    name: "???",
    icon: null,             // null = slot vazio com "?"
    color: "#666",
    category: null,
    tagline: "Em breve...",
    url: null
  },
  // ...
];
```

Gerar o grid via JS a partir desse JSON.

---

## PÁGINA 3: Template de Shrine Individual (`shrines/[nome].html`)

### Conceito
Cada shrine é uma página única com seu próprio visual/cor/layout, mas todas compartilham uma estrutura base. O shrine pode ter "sub-páginas" simuladas via JS (toggle de divs), sem precisar de múltiplos arquivos HTML.

### Especificação

**Layout base:**
- **NÃO usa** o header/navbar padrão do site — o shrine tem seu próprio mini-header
- Mini-header: nome do shrine + botão "← Voltar aos Shrines"
- Fundo: cor temática do shrine (gradiente ou cor sólida)
- Paleta de cores derivada da cor principal do shrine (usar variáveis CSS para facilitar)

**Navegação interna (sub-páginas via JS):**
- Uma barra de abas/botões no topo do conteúdo: ["Sobre", "Galeria", "Citações", "Links"]
- Cada aba mostra/esconde uma div diferente (display toggle)
- A aba ativa tem destaque visual
- Implementar como:
```js
function showTab(tabId) {
  document.querySelectorAll('.shrine-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.shrine-tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).style.display = 'block';
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}
```

**Seções do template:**
1. **Hero section:** imagem grande ou banner do assunto, nome em destaque, frase/tagline
2. **Sobre:** texto livre em parágrafos — por que eu amo isso, história pessoal com aquele assunto
3. **Galeria:** grid de imagens com lightbox simples (clicar na imagem abre ela grande com overlay escuro, clicar fora fecha). Implementar com CSS/JS puro, sem lib externa
4. **Citações/Favoritos:** lista de frases, momentos, músicas, episódios, etc. — estilizada como cards ou como anotações de caderno
5. **Links:** links externos relevantes (wiki, soundtrack, comprar, etc.)

**Variações de layout por tipo de shrine (sugestões):**
- **Jogo/anime:** layout tipo wiki — infobox lateral (imagem, dados: desenvolvedor, ano, plataforma) + texto ao lado
- **Música/banda:** layout com paleta de cores de um álbum, embed de player (Spotify/YouTube iframe), timeline
- **Pet:** galeria como elemento principal, texto carinhoso, talvez timeline de fotos por data
- **Personagem:** layout de "ficha de RPG" — stats, aparências, momentos favoritos

**CSS Variables para tematização fácil:**
```css
:root {
  --shrine-primary: #4fc3f7;
  --shrine-secondary: #0288d1;
  --shrine-bg: #e1f5fe;
  --shrine-text: #1a1a2e;
  --shrine-accent: #ff6f00;
}
```

Cada shrine sobrescreve essas variáveis no seu próprio `<style>` block.

---

## Requisitos técnicos gerais

1. **HTML/CSS/JS puro** — sem React, sem framework, sem build step
2. **Responsivo** — funcionar bem em mobile (grid colapsando para menos colunas)
3. **Acessível** — alt text em imagens, navegação por teclado funcional, contraste adequado
4. **Fácil de manter** — dados em JSON no topo do arquivo JS, adicionar itens = adicionar objetos
5. **Arquivos separados:**
   - `recomendacoes.html` + `recomendacoes.js` + `recomendacoes.css`
   - `shrines.html` + `shrines.js` + `shrines.css`
   - `shrines/template.html` (com instruções de como duplicar e personalizar)
6. **Comentários no código** explicando onde editar (em português)
7. **Placeholder images** — usar `https://placehold.co/300x400?text=Nome` para as imagens de exemplo
8. **Google Fonts sugeridas:** "Special Elite" ou "VT323" para títulos, "Inter" ou "Nunito" para corpo

---

## Entrega esperada

Gere todos os arquivos completos e funcionais, prontos para abrir no browser. Inclua dados de exemplo (5-6 items por categoria na página de recomendações, 4-5 shrines na página de seleção, 1 shrine individual completo como exemplo). Priorize a página de shrines (índice + template individual) pois é a mais importante.
