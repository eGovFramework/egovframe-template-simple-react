import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as EgovNet from "@/api/egovFetch";
import CODE from "@/constants/code";

/**
 * 백엔드 /auth/me 호출 결과를 전역 인증 상태로 보관.
 * 라우트 가드·메뉴 분기는 이 컨텍스트의 roles 를 기준으로 판단한다.
 * sessionStorage 의 loginUser 는 표시용 보조 캐시로만 사용.
 */
const AuthContext = createContext({
  user: null,
  roles: [],
  loading: true,
  refresh: () => {},
  clear: () => {},
});

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, roles: [], loading: true });

  const refresh = useCallback(() => {
    EgovNet.requestFetch(
      "/auth/me",
      { method: "GET", headers: { "Content-type": "application/json" } },
      (resp) => {
        if (resp && Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          const vo = resp.resultVO || {};
          setState({
            user: { id: vo.id, name: vo.name, userSe: vo.userSe, uniqId: vo.uniqId },
            roles: Array.isArray(vo.roles) ? vo.roles : [],
            loading: false,
          });
        } else {
          setState({ user: null, roles: [], loading: false });
        }
      },
      () => {
        setState({ user: null, roles: [], loading: false });
      }
    );
  }, []);

  const clear = useCallback(() => {
    setState({ user: null, roles: [], loading: false });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ ...state, refresh, clear }}>
      {children}
    </AuthContext.Provider>
  );
}

// Provider와 훅을 같은 파일에 두는 관용 패턴 — HMR 경고만 억제(런타임 무해)
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
