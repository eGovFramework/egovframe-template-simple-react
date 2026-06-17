const stateKey = (provider) => `oauth_state_${provider}`;

export function issueState(provider) {
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  const state = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
  sessionStorage.setItem(stateKey(provider), state);
  return state;
}

export function consumeState(provider, received) {
  const saved = sessionStorage.getItem(stateKey(provider));
  sessionStorage.removeItem(stateKey(provider));
  return saved != null && saved === received;
}
