jest.mock('./api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv, REACT_APP_USE_MOCK_DATA: 'true' };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('guestbookService (mock data mode)', () => {
  test('getGuestbookEntries returns paginated entries', async () => {
    const { getGuestbookEntries } = require('./guestbookService');
    const result = await getGuestbookEntries(1, 20);
    expect(result).toHaveProperty('entries');
    expect(result).toHaveProperty('currentPage', 1);
    expect(result).toHaveProperty('totalPages');
    expect(Array.isArray(result.entries)).toBe(true);
    expect(result.entries.length).toBeGreaterThan(0);
  });

  test('entries have required fields', async () => {
    const { getGuestbookEntries } = require('./guestbookService');
    const result = await getGuestbookEntries();
    result.entries.forEach((entry) => {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('authorName');
      expect(entry).toHaveProperty('message');
      expect(entry).toHaveProperty('createdAt');
    });
  });

  test('submitGuestbookEntry returns success', async () => {
    const { submitGuestbookEntry } = require('./guestbookService');
    const result = await submitGuestbookEntry({
      authorName: 'Test',
      message: 'Hello!',
    });
    expect(result).toHaveProperty('success', true);
  });
});
