import { api } from './api';

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

const mockEntries = [
  {
    id: 1,
    authorName: 'Visitante Legal',
    message: 'Adorei o site! Muito bem feito, parabéns!',
    website: 'https://example.com',
    createdAt: '2024-01-15T14:30:00Z',
  },
  {
    id: 2,
    authorName: 'Gamer Anônimo',
    message: 'Ótimas reviews de jogos, continue assim!',
    website: '',
    createdAt: '2024-01-10T09:15:00Z',
  },
  {
    id: 3,
    authorName: 'Maria',
    message: 'Que saudade dos guestbooks antigos da internet. Fico feliz que ainda existam!',
    website: '',
    createdAt: '2024-01-05T20:00:00Z',
  },
];

export const getGuestbookEntries = async (page = 1, limit = 20) => {
  if (USE_MOCK_DATA) {
    const startIndex = (page - 1) * limit;
    const paginatedEntries = mockEntries.slice(startIndex, startIndex + limit);
    return {
      entries: paginatedEntries,
      currentPage: page,
      totalPages: Math.ceil(mockEntries.length / limit),
    };
  }

  const response = await api.get(
    `/guestbook-entries?filters[approved]=true&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${limit}`
  );

  const entries = response.data.data.map((entry) => ({
    id: entry.id,
    authorName: entry.authorName,
    message: entry.message,
    website: entry.website,
    createdAt: entry.createdAt,
  }));

  return {
    entries,
    currentPage: response.data.meta.pagination.page,
    totalPages: response.data.meta.pagination.pageCount,
  };
};

export const submitGuestbookEntry = async ({ authorName, message, website }) => {
  if (USE_MOCK_DATA) {
    return { success: true };
  }

  const response = await api.post('/guestbook-entries', {
    data: { authorName, message, website },
  });
  return response.data;
};
