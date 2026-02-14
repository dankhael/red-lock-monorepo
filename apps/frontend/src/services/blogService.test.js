import { getPosts, getPostBySlug, getQuote, getFeaturedImage, getActivities, getLastFmTracks } from './blogService';

// Mock the api module
jest.mock('./api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const { api } = require('./api');

// Force mock data mode for these tests
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv, REACT_APP_USE_MOCK_DATA: 'true' };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('blogService (mock data mode)', () => {
  test('getPosts returns paginated mock posts', async () => {
    // Re-import to pick up env change
    const { getPosts } = require('./blogService');
    const result = await getPosts({ page: 1, limit: 5 });
    expect(result).toHaveProperty('posts');
    expect(result).toHaveProperty('currentPage', 1);
    expect(result).toHaveProperty('totalPages');
    expect(Array.isArray(result.posts)).toBe(true);
  });

  test('getPosts filters by category', async () => {
    const { getPosts } = require('./blogService');
    const result = await getPosts({ category: 'Games', page: 1, limit: 10 });
    result.posts.forEach((post) => {
      expect(post.category).toBe('Games');
    });
  });

  test('getPosts filters by search term', async () => {
    const { getPosts } = require('./blogService');
    const result = await getPosts({ search: 'Persona', page: 1, limit: 10 });
    expect(result.posts.length).toBeGreaterThan(0);
    expect(result.posts[0].title).toContain('Persona');
  });

  test('getPostBySlug returns a post for valid slug', async () => {
    const { getPostBySlug } = require('./blogService');
    const post = await getPostBySlug('persona-5');
    expect(post).not.toBeNull();
    expect(post.slug).toBe('persona-5');
  });

  test('getPostBySlug returns null for invalid slug', async () => {
    const { getPostBySlug } = require('./blogService');
    const post = await getPostBySlug('nonexistent-slug');
    expect(post).toBeNull();
  });

  test('getQuote returns quote and author', async () => {
    const { getQuote } = require('./blogService');
    const result = await getQuote();
    expect(result).toHaveProperty('quote');
    expect(result).toHaveProperty('author');
  });

  test('getFeaturedImage returns url and caption', async () => {
    const { getFeaturedImage } = require('./blogService');
    const result = await getFeaturedImage();
    expect(result).toHaveProperty('url');
    expect(result).toHaveProperty('caption');
  });

  test('getActivities returns game, tv, and book', async () => {
    const { getActivities } = require('./blogService');
    const result = await getActivities();
    expect(result).toHaveProperty('game');
    expect(result).toHaveProperty('tv');
    expect(result).toHaveProperty('book');
  });

  test('getLastFmTracks returns an array of tracks', async () => {
    const { getLastFmTracks } = require('./blogService');
    const tracks = await getLastFmTracks();
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBeGreaterThan(0);
    expect(tracks[0]).toHaveProperty('name');
    expect(tracks[0]).toHaveProperty('artist');
  });
});
