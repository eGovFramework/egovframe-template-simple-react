import { useCallback, useEffect, useRef } from "react";

/** 
 * 일정 시간(delay) 동안 입력이 없을 때만 콜백 함수를 실행하는 디바운스 훅입니다.
 * 
 * @param {Function} callback - 디바운싱할 콜백 함수
 * @param {number} delay - 디바운싱 지연 시간 (기본값 300ms)
 * @returns {Function} - 디바운싱된 콜백 함수
*/
const useDebounce = (callback, delay = 300) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      // 이전 타이머가 존재하면 타이머 정리
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 새로운 타이머 설정 (delay만큼 지연 후 콜백 실행)
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

/**
 * useDebouncedInput 훅은 입력 필드의 변경 사항을 디바운싱하여 상태를 업데이트합니다.
 * 
 * @param {Function} setState - 상태 변경 함수
 * @param {number} delay - 디바운싱 지연 시간 (기본값 300ms)
 * @return {Function} - 디바운싱이 적용된 입력 핸들러 함수
 */
export const useDebouncedInput = (setState, delay = 300) => {
  const debouncedSetState = useDebounce((field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, delay);

  const handleInputChange = useCallback(
    (field, value) => {
      debouncedSetState(field, value);
    },
    [debouncedSetState]
  );

  return handleInputChange;
};