import { api } from './api';
import { mockGames } from '../utils/mockData';

// Flag to determine if we should use mock data
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || true;

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

// For development/testing, you can use this mock data
export const getMockGames = () => {
  return [
    {
      id: 1,
      title: 'Space Adventure',
      slug: 'space-adventure',
      thumbnail: 'https://via.placeholder.com/400x300?text=Space+Adventure',
      image: 'https://via.placeholder.com/800x600?text=Space+Adventure',
      description: 'An exciting space exploration game where you discover new planets and alien civilizations.',
      features: [
        'Explore 10+ unique planets',
        'Interact with alien species',
        'Build and customize your spaceship',
        'Trade resources across the galaxy'
      ],
      screenshots: [
        'https://via.placeholder.com/800x600?text=Screenshot+1',
        'https://via.placeholder.com/800x600?text=Screenshot+2',
        'https://via.placeholder.com/800x600?text=Screenshot+3'
      ],
      playLink: 'https://example.com/games/space-adventure'
    },
    {
      id: 2,
      title: 'Dungeon Crawler',
      slug: 'dungeon-crawler',
      thumbnail: 'https://via.placeholder.com/400x300?text=Dungeon+Crawler',
      image: 'https://via.placeholder.com/800x600?text=Dungeon+Crawler',
      description: 'A roguelike dungeon crawler with procedurally generated levels and challenging enemies.',
      features: [
        'Procedurally generated dungeons',
        '50+ unique enemies',
        '100+ items and weapons',
        'Character progression system'
      ],
      screenshots: [
        'https://via.placeholder.com/800x600?text=Screenshot+1',
        'https://via.placeholder.com/800x600?text=Screenshot+2'
      ],
      playLink: 'https://example.com/games/dungeon-crawler'
    }
    // Add more mock games as needed
  ];
}; 