import { describe, it, expect } from 'vitest';
import { hashPassword } from '@/utils/passwordHash';

describe('hashPassword', () => {
  it('동일한 id와 password는 동일한 해시를 반환한다', async () => {
    const hash1 = await hashPassword('user01', 'password123');
    const hash2 = await hashPassword('user01', 'password123');
    expect(hash1).toBe(hash2);
  });

  it('Base64 문자열을 반환한다', async () => {
    const hash = await hashPassword('user01', 'password123');
    expect(typeof hash).toBe('string');
    // Base64 형식 검증 (알파벳, 숫자, +, /, = 만 허용)
    expect(hash).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });

  it('password가 달라지면 다른 해시를 반환한다', async () => {
    const hash1 = await hashPassword('user01', 'password123');
    const hash2 = await hashPassword('user01', 'differentPassword');
    expect(hash1).not.toBe(hash2);
  });

  it('id가 달라지면 다른 해시를 반환한다', async () => {
    const hash1 = await hashPassword('user01', 'password123');
    const hash2 = await hashPassword('user02', 'password123');
    expect(hash1).not.toBe(hash2);
  });

  it('SHA-256 기반 Base64 결과는 44자이다', async () => {
    const hash = await hashPassword('user01', 'password123');
    // SHA-256은 32바이트 → Base64 인코딩 시 44자 (패딩 포함)
    expect(hash.length).toBe(44);
  });
});
