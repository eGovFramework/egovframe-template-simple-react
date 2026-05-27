import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedInput } from '@/hooks/useDebounce';

describe('useDebouncedInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('지연 시간 전에는 setState가 호출되지 않는다', () => {
    const setState = vi.fn();
    const { result } = renderHook(() => useDebouncedInput(setState, 300));

    act(() => {
      result.current('name', '홍길동');
    });

    expect(setState).not.toHaveBeenCalled();
  });

  it('지연 시간 후에 setState가 호출된다', () => {
    const setState = vi.fn();
    const { result } = renderHook(() => useDebouncedInput(setState, 300));

    act(() => {
      result.current('name', '홍길동');
      vi.advanceTimersByTime(300);
    });

    expect(setState).toHaveBeenCalledTimes(1);
  });

  it('연속 호출 시 마지막 호출만 실행된다', () => {
    const setState = vi.fn();
    const { result } = renderHook(() => useDebouncedInput(setState, 300));

    act(() => {
      result.current('name', '첫번째');
      result.current('name', '두번째');
      result.current('name', '세번째');
      vi.advanceTimersByTime(300);
    });

    expect(setState).toHaveBeenCalledTimes(1);
  });

  it('setState에 이전 상태를 기반으로 업데이트 함수를 전달한다', () => {
    const setState = vi.fn();
    const { result } = renderHook(() => useDebouncedInput(setState, 300));

    act(() => {
      result.current('email', 'test@example.com');
      vi.advanceTimersByTime(300);
    });

    expect(setState).toHaveBeenCalledWith(expect.any(Function));

    const updater = setState.mock.calls[0][0];
    const prevState = { name: '홍길동' };
    expect(updater(prevState)).toEqual({ name: '홍길동', email: 'test@example.com' });
  });

  it('서로 다른 필드를 각각 디바운싱할 수 있다', () => {
    const setState = vi.fn();
    const { result } = renderHook(() => useDebouncedInput(setState, 300));

    act(() => {
      result.current('title', '제목');
      vi.advanceTimersByTime(300);
    });

    act(() => {
      result.current('content', '내용');
      vi.advanceTimersByTime(300);
    });

    expect(setState).toHaveBeenCalledTimes(2);
  });
});
