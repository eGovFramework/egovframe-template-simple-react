import "@testing-library/jest-dom";
import { vi } from 'vitest';

// window.matchMedia 모킹
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// fetch API 모킹 설정
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ resultCode: 0, result: { notiList: [], galList: [] } }),
  })
);