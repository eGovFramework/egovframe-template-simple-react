import { SERVER_URL } from "@/config";

const stateKey = (provider) => `oauth_state_${provider}`;

// 백엔드에서 state 발급 — 동일 값이 OAUTH_STATE 쿠키로도 심어진다(double-submit).
// 백엔드 콜백이 URL state 와 쿠키 state 를 대조하므로 CSRF 방어 권한은 백엔드가 가진다.
// sessionStorage 저장은 프론트 1차 검증(consumeState)용.
export async function issueState(provider) {
  const resp = await fetch(`${SERVER_URL}/auth/oauth-state`, {
    method: "GET",
    credentials: "include",
  }).then((r) => r.json());
  const state = resp.state;
  sessionStorage.setItem(stateKey(provider), state);
  return state;
}

export function consumeState(provider, received) {
  const saved = sessionStorage.getItem(stateKey(provider));
  sessionStorage.removeItem(stateKey(provider));
  return saved != null && saved === received;
}
