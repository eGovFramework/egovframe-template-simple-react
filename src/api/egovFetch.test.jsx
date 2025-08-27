import { describe, it, expect, vi } from 'vitest';
import { getQueryString } from '@/api/egovFetch';

// Mock fetch globally
global.fetch = vi.fn();

describe('egovFetch API Functions', () => {
  describe('getQueryString', () => {
    it('should convert params object to query string', () => {
      const params = {
        page: 1,
        size: 10,
        keyword: 'test'
      };
      const result = getQueryString(params);
      expect(result).toBe('?page=1&size=10&keyword=test');
    });

    it('should handle empty params object', () => {
      const params = {};
      const result = getQueryString(params);
      expect(result).toBe('?');
    });

    it('should handle single param', () => {
      const params = { id: 123 };
      const result = getQueryString(params);
      expect(result).toBe('?id=123');
    });

    it('should handle special characters in values', () => {
      const params = {
        search: 'hello world',
        filter: 'type=board&status=active'
      };
      const result = getQueryString(params);
      expect(result).toBe('?search=hello world&filter=type=board&status=active');
    });

    it('should handle null and undefined values', () => {
      const params = {
        valid: 'test',
        nullValue: null,
        undefinedValue: undefined
      };
      const result = getQueryString(params);
      expect(result).toBe('?valid=test&nullValue=&undefinedValue=');
    });
  });
});