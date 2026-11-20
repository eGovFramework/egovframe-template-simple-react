import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import App from '@/App';
import { mockJsonResponse } from '@/test/mockFetch';

describe('App', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.stubGlobal('fetch', vi.fn((url) => {
      if (url.includes('/auth/me')) {
        return Promise.resolve(mockJsonResponse({ resultCode: 401 }));
      }
      return Promise.resolve(mockJsonResponse({
        resultCode: 0,
        result: { notiList: [], galList: [], resultList: [] }
      }));
    }));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('마운트 시 상단 로고 및 주요 메뉴를 정상 렌더링한다', async () => {
    render(<App />);
    expect(await screen.findAllByAltText('표준프레임워크포털 eGovFrame 심플홈페이지')).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: '사이트소개' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: '정보마당' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: '알림마당' })[0]).toBeInTheDocument();
  });
});
