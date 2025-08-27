import { describe, it, expect } from 'vitest';
import { itemIdxByPage } from '@/utils/calc';

describe('Calc Utility Functions', () => {
  describe('itemIdxByPage', () => {
    it('should calculate correct item index for pagination', () => {
      // 총 50개 아이템, 1페이지, 페이지당 10개, 첫 번째 아이템(index 0)
      const result = itemIdxByPage(50, 1, 10, 0);
      expect(result).toBe(50); // 50번째 아이템
    });

    it('should calculate correct item index for second page', () => {
      // 총 50개 아이템, 2페이지, 페이지당 10개, 첫 번째 아이템(index 0)  
      const result = itemIdxByPage(50, 2, 10, 0);
      expect(result).toBe(40); // 40번째 아이템
    });

    it('should calculate correct item index for last item on page', () => {
      // 총 50개 아이템, 1페이지, 페이지당 10개, 마지막 아이템(index 9)
      const result = itemIdxByPage(50, 1, 10, 9);
      expect(result).toBe(41); // 41번째 아이템
    });

    it('should handle middle page correctly', () => {
      // 총 100개 아이템, 3페이지, 페이지당 10개, 중간 아이템(index 5)
      const result = itemIdxByPage(100, 3, 10, 5);
      expect(result).toBe(75); // 75번째 아이템
    });

    it('should handle different page sizes', () => {
      // 총 30개 아이템, 2페이지, 페이지당 5개, 첫 번째 아이템(index 0)
      const result = itemIdxByPage(30, 2, 5, 0);
      expect(result).toBe(25); // 25번째 아이템
    });

    it('should handle single item page', () => {
      // 총 10개 아이템, 1페이지, 페이지당 1개, 첫 번째 아이템(index 0)
      const result = itemIdxByPage(10, 1, 1, 0);
      expect(result).toBe(10); // 10번째 아이템
    });

    it('should handle edge case with last page', () => {
      // 총 23개 아이템, 3페이지, 페이지당 10개, 마지막 3개 아이템 중 첫 번째(index 0)
      const result = itemIdxByPage(23, 3, 10, 0);
      expect(result).toBe(3); // 3번째 아이템
    });
  });
});