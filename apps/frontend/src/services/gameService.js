import { api } from './api';
import { mockGames } from '../utils/mockData';

// Flag to determine if we should use mock data
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

export const getGames = async () => {
  if (USE_MOCK_DATA) {
    return mockGames;
  }
  
  const response = await api.get('/games');
  return response.data;
};

export const getGameBySlug = async (slug) => {
  if (USE_MOCK_DATA) {
    const game = mockGames.find(game => game.slug === slug);
    return game || null;
  }
  
  const response = await api.get(`/games/${slug}`);
  return response.data;
};
