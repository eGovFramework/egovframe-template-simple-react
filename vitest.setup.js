import "@testing-library/jest-dom"; // 테스트에서 커스텀 매처 사용
import { vi } from 'vitest';

// Mock fetch API for tests
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        resultCode: 0,
        result: {
          notiList: [],
          galList: []
        }
      })
  })
);
