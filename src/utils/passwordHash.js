/**
 * 로그인 비밀번호 클라이언트 측 1차 해싱.
 *
 * 백엔드 EgovFileScrty.encryptPassword(password, id) 와 동일 형식의
 * Base64(SHA-256(id_bytes ++ password_bytes)) 을 만든다.
 *
 * 서버는 받은 1차 해시에 한 번 더 SHA-256 을 적용해 이중해시로 저장값과 비교한다.
 * 클라이언트가 보내는 값과 DB 저장값이 다르므로 DB 유출 시 그 값으로 직접 로그인할 수 없다.
 */
export async function hashPassword(id, password) {
  const data = new TextEncoder().encode(id + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hashBuffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
