import { api } from './api';
import {
  mockPosts,
  mockQuote,
  mockFeaturedImage,
  mockActivities,
  mockLastFmTracks,
  mockAbout,
} from '../utils/mockData';

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
      : '/images/no_image_found.png',
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

  const formats = response.data.data[0].coverImage?.formats || {};
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
  if (USE_MOCK_DATA) {
    return mockPosts.filter((post) => post.featured);
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
  if (USE_MOCK_DATA) {
    return [...mockPosts]
      .sort((a, b) => new Date(b.publishedOn) - new Date(a.publishedOn))
      .slice(0, 5);
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

export const getQuote = async () => {
  if (USE_MOCK_DATA) {
    return mockQuote;
  }
  
  const response = await api.get('/quote');

  const quote = response.data.data.quote;
  const author = response.data.data.author;
  return { quote: quote, author: author };
};

export const getFeaturedImage = async () => {
  if (USE_MOCK_DATA) {
    return mockFeaturedImage;
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
    return mockActivities;
  }
  
  const response = await api.get('/activity');
  return response.data.data;
}

export const getLastFmTracks = async () => {
  if (USE_MOCK_DATA) {
    return mockLastFmTracks;
  }

  const response = await api.get('/lastfm/recent-tracks');
  return response.data.data;
};

export const getAboutInfo = async () => {
  if (USE_MOCK_DATA) {
    return mockAbout;
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