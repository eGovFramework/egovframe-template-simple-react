import { describe, it, expect } from 'vitest';
import { itemIdxByPage } from '@/utils/calc';

describe('itemIdxByPage', () => {
  it('첫 페이지 첫 번째 항목의 역순 인덱스를 반환한다', () => {
    // resultCnt=10, 1페이지, pageSize=5, index=0 → 10+1-(0*5+0+1) = 10
    expect(itemIdxByPage(10, 1, 5, 0)).toBe(10);
  });

  it('첫 페이지 마지막 항목의 역순 인덱스를 반환한다', () => {
    // resultCnt=10, 1페이지, pageSize=5, index=4 → 10+1-(0*5+4+1) = 6
    expect(itemIdxByPage(10, 1, 5, 4)).toBe(6);
  });

  it('두 번째 페이지 첫 번째 항목의 역순 인덱스를 반환한다', () => {
    // resultCnt=10, 2페이지, pageSize=5, index=0 → 10+1-(1*5+0+1) = 5
    expect(itemIdxByPage(10, 2, 5, 0)).toBe(5);
  });

  it('두 번째 페이지 마지막 항목의 역순 인덱스를 반환한다', () => {
    // resultCnt=10, 2페이지, pageSize=5, index=4 → 10+1-(1*5+4+1) = 1
    expect(itemIdxByPage(10, 2, 5, 4)).toBe(1);
  });

  it('resultCnt가 0이면 음수 인덱스를 반환할 수 있다', () => {
    // resultCnt=0, 1페이지, pageSize=5, index=0 → 0+1-(0+0+1) = 0
    expect(itemIdxByPage(0, 1, 5, 0)).toBe(0);
  });

  it('pageSize=10인 경우도 올바르게 동작한다', () => {
    // resultCnt=25, 3페이지, pageSize=10, index=2 → 25+1-(2*10+2+1) = 3
    expect(itemIdxByPage(25, 3, 10, 2)).toBe(3);
  });
});
