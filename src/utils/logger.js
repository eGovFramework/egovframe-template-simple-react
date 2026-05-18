const SENSITIVE_KEYS = /(password|jToken|authorization|access_token|refresh_token|ihidnum|secret)/i;

function mask(value, seen = new WeakSet()) {
  if (value == null) return value;
  // 문자열·숫자 등 원시값은 그대로 통과. 마스킹은 "객체 내부에서 SENSITIVE_KEYS 와 매칭되는 키의 값" 에만 적용된다 (의도: 일반 메시지는 보존, 민감 정보만 차단).
  if (typeof value !== "object") return value;

  // 특수 객체는 spread 시 internal slot 정보가 손실되므로(Date → {}, Error → {} 등)
  // 원본 그대로 콘솔에 위임. 콘솔이 자체적으로 적절히 표시한다.
  if (
    value instanceof Date ||
    value instanceof Error ||
    value instanceof RegExp ||
    value instanceof Map ||
    value instanceof Set ||
    (typeof Blob !== "undefined" && value instanceof Blob) ||
    (typeof FormData !== "undefined" && value instanceof FormData) ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value)
  ) {
    return value;
  }

  // 순환 참조 가드 — `obj.self = obj` 같은 입력에서 무한 재귀 방지
  if (seen.has(value)) return "[Circular]";
  seen.add(value);

  const cloned = Array.isArray(value) ? [...value] : { ...value };
  for (const k of Object.keys(cloned)) {
    if (SENSITIVE_KEYS.test(k)) cloned[k] = "***";
    else if (typeof cloned[k] === "object") cloned[k] = mask(cloned[k], seen);
  }
  return cloned;
}

const noop = () => {};
const isProd = import.meta.env.PROD;

export const logger = {
  log:   isProd ? noop : (...args) => console.log(...args.map(mask)),
  info:  isProd ? noop : (...args) => console.info(...args.map(mask)),
  warn:  (...args) => console.warn(...args.map(mask)),
  error: (...args) => console.error(...args.map(mask)),
};
