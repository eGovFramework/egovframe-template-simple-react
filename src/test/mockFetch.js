import { vi } from 'vitest';

/**
 * 표준 fetch Response 객체의 모의 응답을 생성한다.
 * @param {any} body - JSON 변환될 본문 (undefined인 경우 SyntaxError 발생 모의)
 * @param {object} options - ok, status 등의 Response 속성
 * @returns {object} 모의 Response 객체
 */
export function mockJsonResponse(body = {}, { ok = true, status = 200 } = {}) {
  return {
    ok,
    status,
    json: () => (body !== undefined ? Promise.resolve(body) : Promise.reject(new SyntaxError('Empty body'))),
  };
}

/**
 * 전역 fetch를 특정 JSON 응답을 반환하도록 스텁한다.
 * @param {any} body
 * @param {object} options
 * @returns {import('vitest').Mock}
 */
export function stubFetchWithJson(body = {}, options = {}) {
  const response = mockJsonResponse(body, options);
  const spy = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', spy);
  return spy;
}
