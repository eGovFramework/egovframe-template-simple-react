import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getLocalItem,
  setLocalItem,
  removeLocalItem,
  getSessionItem,
  setSessionItem,
  removeSessionItem,
} from '@/utils/storage';

function createStorageMock() {
  let store = {};
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
}

describe('storage utils', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createStorageMock());
    vi.stubGlobal('sessionStorage', createStorageMock());
  });

  describe('localStorage', () => {
    it('값을 저장하고 가져온다', () => {
      setLocalItem('user', { id: 1, name: '홍길동' });
      expect(getLocalItem('user')).toEqual({ id: 1, name: '홍길동' });
    });

    it('존재하지 않는 키는 null을 반환한다', () => {
      expect(getLocalItem('missing')).toBeNull();
    });

    it('항목을 삭제하면 null을 반환한다', () => {
      setLocalItem('token', 'abc');
      removeLocalItem('token');
      expect(getLocalItem('token')).toBeNull();
    });

    it('문자열 값을 저장하고 가져온다', () => {
      setLocalItem('lang', 'ko');
      expect(getLocalItem('lang')).toBe('ko');
    });

    it('숫자 값을 저장하고 가져온다', () => {
      setLocalItem('count', 42);
      expect(getLocalItem('count')).toBe(42);
    });

    it('undefined를 저장하면 null로 직렬화된다', () => {
      setLocalItem('empty', undefined);
      expect(getLocalItem('empty')).toBeNull();
    });
  });

  describe('sessionStorage', () => {
    it('값을 저장하고 가져온다', () => {
      setSessionItem('session', { token: 'xyz' });
      expect(getSessionItem('session')).toEqual({ token: 'xyz' });
    });

    it('존재하지 않는 키는 null을 반환한다', () => {
      expect(getSessionItem('missing')).toBeNull();
    });

    it('항목을 삭제하면 null을 반환한다', () => {
      setSessionItem('state', 'active');
      removeSessionItem('state');
      expect(getSessionItem('state')).toBeNull();
    });
  });
});
