import { api } from './api';
import { mockPosts } from '../utils/mockData';

// Flag to determine if we should use mock data
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:1337';

export const getPosts = async ({ category, search, page = 1, limit = 10 }) => {
  if (USE_MOCK_DATA) {
    // Filter mock data based on category and search
    let filteredPosts = [...mockPosts];

    if (category) {
      filteredPosts = filteredPosts.filter((post) => post.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.summary.toLowerCase().includes(searchLower)
      );
    }

    // Sort posts by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      currentPage: page,
      totalPages: Math.ceil(filteredPosts.length / limit),
    };
  }

  // Use real API for production
  const params = new URLSearchParams();
  if (category) params.append('filters[category]', category);
  if (search) params.append('filters[search]', search);
  params.append('pagination[page]', page.toString());
  params.append('pagination[pageSize]', limit.toString());
  params.append('populate', '*');
  params.append('sort', 'publishedAt:desc'); // Add sorting parameter

  const response = await api.get(`/posts?${params.toString()}`);

  const posts = response.data.data.map((post) => ({
    id: post.id,
    title: post.title || 'Untitled Post',
    slug: post.slug || '#',
    summary: post.excerpt || 'No summary available.',
    image: post.coverImage
      ? BASE_URL + post.coverImage.formats.thumbnail.url
      : 'https://via.placeholder.com/800x400?text=No+Image',
    publishedOn: post.publishedAt || 'Unknown Date',
    category: post.category || 'Uncategorized',
  }));

  return {
    posts,
    currentPage: response.data.meta.pagination.page,
    totalPages: response.data.meta.pagination.pageCount,
  };
};

export const getPostBySlug = async (slug) => {
  if (USE_MOCK_DATA) {
    const post = mockPosts.find(post => post.slug === slug);
    return post || null;
  }
  
  let response = await api.get(`/posts?filters[slug]=${slug}&populate=*`);
  if (response.data.data.length === 0) {
    return null;
  }

  let formats_length = response.data.data[0].coverImage.formats.length;

  const formats = response.data.data[0].coverImage.formats;
  const availableFormats = ['large', 'medium', 'small', 'thumbnail'];
  let selectedFormat = null;

  for (let format of availableFormats) {
    if (formats[format]) {
      selectedFormat = formats[format].url;
      break;
    }
  }

  response.data.data[0].image = selectedFormat ? BASE_URL + selectedFormat : '/images/no_image_found.png';

  return response.data.data[0] || null;
};

export const getFeaturedPosts = async () => {
  let featuredPosts = [];
  if (USE_MOCK_DATA) {
    for (let i = 0; i < mockPosts.length; i++) {
      if (mockPosts[i].featured) {
        featuredPosts.push(mockPosts[i]);
      }
    }
    return featuredPosts;
  }
  
  const response = await api.get('/posts?filters[featured]=true&populate=*');


  const posts = response.data.data.map((post) => ({
    id: post.id,
    title: post.title || 'Untitled Post',
    slug: post.slug || '#',
    summary: post.excerpt || 'No summary available.',
    image: BASE_URL + post.coverImage?.formats.small.url,
    publishedOn: post.publishedOn || 'Unknown Date',
  }));

  
  return posts;
};

export const getRecentPosts = async () => {
  let recentPosts = [];
  if (USE_MOCK_DATA) {
    for (let i = 0; i < mockPosts.length; i++) {
      if (mockPosts[i].featured) {
        recentPosts.push(mockPosts[i]);
      }
    }
    return recentPosts;
  }

  const response = await api.get('/posts?pagination[limit]=5&sort=publishedAt&populate=*');

  const posts = response.data.data.map((post) => ({
    id: post.id,
    title: post.title || 'Untitled Post',
    slug: post.slug || '#',
    summary: post.excerpt || 'No summary available.',
    image: BASE_URL + post.coverImage?.formats.small.url,
    publishedOn: post.publishedOn,
    category: post.category,
  }));


  return posts;
};

// For development/testing, you can use this mock data
export const getMockPosts = () => {
  return {
    posts: [
      {
        id: 1,
        title: 'Getting Started with React',
        slug: 'getting-started-with-react',
        summary: 'Learn the basics of React and how to set up your first project.',
        content: '<p>This is the full content of the post...</p>',
        image: 'https://via.placeholder.com/800x400?text=React',
        publishedAt: '2023-06-15T10:00:00Z',
        category: 'React',
      },
      {
        id: 2,
        title: 'Advanced CSS Techniques',
        slug: 'advanced-css-techniques',
        summary: 'Explore advanced CSS techniques to create stunning web designs.',
        content: '<p>This is the full content of the post...</p>',
        image: 'https://via.placeholder.com/800x400?text=CSS',
        publishedAt: '2023-06-10T10:00:00Z',
        category: 'CSS',
      },
      // Add more mock posts as needed
    ],
    currentPage: 1,
    totalPages: 1,
  };
}; 

export const getQuote = async () => {
  if (USE_MOCK_DATA) {
    return {quote: 'Sorte é o fracasso que falhou', author: 'Ornn'};
  }
  
  const response = await api.get('/quote');

  const quote = response.data.data.quote;
  const author = response.data.data.author;
  return { quote: quote, author: author };
};

export const getFeaturedImage = async () => {
  if (USE_MOCK_DATA) {
    return {
      url: 'https://i.pinimg.com/736x/2d/3a/c4/2d3ac4b0516e7bb63cbf266fa2157069.jpg',
      caption: 'Um bom lugar'
    };
  }

  const response = await api.get('featured-image?populate=image');

  const formats = response.data.data.image.formats;
  const availableFormats = ['large', 'medium', 'small', 'thumbnail'];
  let selectedFormat = null;

  for (let format of availableFormats) {
    if (formats[format]) {
      selectedFormat = formats[format].url;
      break;
    }
  }

  const imageUrl = selectedFormat ? BASE_URL + selectedFormat : '/images/no_image_found.png';
  const caption = response.data.data.caption;
  
  return {url: imageUrl, caption: caption};
};

export const getActivities = async () => {
  if (USE_MOCK_DATA) {
    return { game: 'League of Legends',
       tv: 'The Mentalist' ,
       book: 'The Hobbit' };
  }
  
  const response = await api.get('/activity');
  return response.data.data;
}

export const getAboutInfo = async () => {
  if (USE_MOCK_DATA) {
    return {
      description: `Oi, meu nome é Danilo, mas pode me chamar de dankhael, preguiçoso por natureza, mas curioso na mesma medida. Desenvolvo software entre um gole e outro de coca cola, viciado em jogos (qualquer um!), apreciador de mangás (principalmente sobre jogos!) e torcedor do tricolor de Recife. Fiz esse site pra exercitar minhas habilidades de programação, e também pra colocar um pézinho fora dessas bolhas de eco e derretidoras de cerebro que são as redes sociais, espero que curta o site e que eu não tenha o abandonado depois de 2 meses XD. Tentando ser melhor (apesar de não parecer -_-).`,
      profileImage: 'https://www.animeclick.it/images/Anime_big/PhiBrainKaminoPuzzle2/PhiBrainKaminoPuzzle211.jpg',
      socialMedia: {
        twitter: 'https://twitter.com/danilokhael',
        linkedin: 'https://www.linkedin.com/in/danilokhael/',
        instagram: 'https://instagram.com/danilokhael',
        discord: 'https://discordapp.com/users/240667893837201408',
        email: 'danilokhael@gmail.com',
      },
    };
  }

  const response = await api.get('/about-me?populate=profileImage');

  const aboutMeData = response.data.data;
  const aboutMe = {
    description: aboutMeData.description,
    profileImage: BASE_URL + aboutMeData.profileImage.formats.thumbnail.url,
    socialMedia: {
      twitter: aboutMeData.socialMedia.twitter,
      linkedin: aboutMeData.socialMedia.linkedin,
      instagram: aboutMeData.socialMedia.instagram,
      discord: aboutMeData.socialMedia.discord,
      email: aboutMeData.socialMedia.email,
    },
  }


  return aboutMe;
};