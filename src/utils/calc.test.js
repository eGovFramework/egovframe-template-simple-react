import { describe, it, expect } from 'vitest';
import { itemIdxByPage } from '@/utils/calc';

describe('itemIdxByPage', () => {
  it('첫 페이지 첫 번째 항목의 역순 인덱스를 반환한다', () => {
    // resultCnt=10, 1페이지, recordCountPerPage=5, index=0 → 10+1-(0*5+0+1) = 10
    expect(itemIdxByPage(10, 1, 5, 0)).toBe(10);
  });

  it('첫 페이지 마지막 항목의 역순 인덱스를 반환한다', () => {
    // resultCnt=10, 1페이지, recordCountPerPage=5, index=4 → 10+1-(0*5+4+1) = 6
    expect(itemIdxByPage(10, 1, 5, 4)).toBe(6);
  });

  it('두 번째 페이지 첫 번째 항목의 역순 인덱스를 반환한다', () => {
    // resultCnt=10, 2페이지, recordCountPerPage=5, index=0 → 10+1-(1*5+0+1) = 5
    expect(itemIdxByPage(10, 2, 5, 0)).toBe(5);
  });

  it('두 번째 페이지 마지막 항목의 역순 인덱스를 반환한다', () => {
    // resultCnt=10, 2페이지, recordCountPerPage=5, index=4 → 10+1-(1*5+4+1) = 1
    expect(itemIdxByPage(10, 2, 5, 4)).toBe(1);
  });

  it('resultCnt가 0이면 음수 인덱스를 반환할 수 있다', () => {
    // resultCnt=0, 1페이지, recordCountPerPage=5, index=0 → 0+1-(0+0+1) = 0
    expect(itemIdxByPage(0, 1, 5, 0)).toBe(0);
  });

  it('recordCountPerPage=10인 경우도 올바르게 동작한다', () => {
    // resultCnt=25, 3페이지, recordCountPerPage=10, index=2 → 25+1-(2*10+2+1) = 3
    expect(itemIdxByPage(25, 3, 10, 2)).toBe(3);
  });

  it('페이저 그룹 크기(pageSize)를 넘기면 2페이지부터 번호가 어긋난다', () => {
    // 회귀 방지: Globals.pageUnit=5, Globals.pageSize=10 인 게시판 2페이지 첫 항목.
    // recordCountPerPage=5 를 넘기면 5, pageSize=10 을 잘못 넘기면 0 이 된다.
    expect(itemIdxByPage(10, 2, 5, 0)).toBe(5);
    expect(itemIdxByPage(10, 2, 10, 0)).toBe(0);
  });
});
