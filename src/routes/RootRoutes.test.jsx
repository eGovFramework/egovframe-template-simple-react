import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RootRoutes from "@/routes";
import { AuthProvider } from "@/contexts/AuthContext";
import { mockJsonResponse } from "@/test/mockFetch";
import URL from "@/constants/url";

function renderWithAuth(initialPath, { user = null, roles = [] } = {}) {
  vi.stubGlobal(
    "fetch",
    vi.fn((url) => {
      if (url.includes("/auth/me")) {
        if (user) {
          return Promise.resolve(
            mockJsonResponse({
              resultCode: 200,
              resultVO: { id: user.id, name: user.name, roles },
            })
          );
        }
        return Promise.resolve(mockJsonResponse({ resultCode: 401 }));
      }
      return Promise.resolve(
        mockJsonResponse({
          resultCode: 0,
          result: { notiList: [], galList: [], resultList: [] },
        })
      );
    })
  );

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <RootRoutes />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("RootRoutes 라우트 접근 가드", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete window.location;
    window.location = { href: "" };
    vi.spyOn(window, "alert").mockImplementation(() => {});
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    window.location = originalLocation;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("비로그인 사용자가 /admin 접근 시 경고 후 로그인 화면으로 이동한다", async () => {
    renderWithAuth("/admin");
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("로그인이 필요한 경로입니다.");
      expect(window.location.href).toBe(URL.LOGIN);
    });
  });

  it("비로그인 사용자가 /mypage 접근 시 경고 후 로그인 화면으로 이동한다", async () => {
    renderWithAuth("/mypage");
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("로그인이 필요한 경로입니다.");
      expect(window.location.href).toBe(URL.LOGIN);
    });
  });

  it("비로그인 사용자라도 회원가입(/mypage/create) 경로는 접근이 허용된다", async () => {
    renderWithAuth(URL.MYPAGE_CREATE);
    expect(await screen.findByRole("heading", { name: "회원 생성" })).toBeInTheDocument();
    expect(window.alert).not.toHaveBeenCalled();
    expect(window.location.href).toBe("");
  });

  it("ROLE_ADMIN 권한이 없는 일반 사용자가 /admin 접근 시 경고 후 메인으로 이동한다", async () => {
    renderWithAuth("/admin", {
      user: { id: "user1", name: "일반사용자" },
      roles: ["ROLE_USER"],
    });
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("관리자 권한이 필요한 페이지입니다.");
      expect(window.location.href).toBe(URL.MAIN);
    });
  });

  it("ROLE_ADMIN 권한이 없는 일반 사용자도 /mypage 접근은 허용된다", async () => {
    renderWithAuth("/mypage", {
      user: { id: "user1", name: "일반사용자" },
      roles: ["ROLE_USER"],
    });
    expect(await screen.findAllByAltText("표준프레임워크포털 eGovFrame 심플홈페이지")).toHaveLength(2);
    expect(window.alert).not.toHaveBeenCalled();
    expect(window.location.href).toBe("");
  });

  it("관리자(ROLE_ADMIN) 사용자는 /admin 접근이 허용된다", async () => {
    renderWithAuth("/admin", {
      user: { id: "admin", name: "관리자" },
      roles: ["ROLE_ADMIN"],
    });
    expect(await screen.findAllByAltText("표준프레임워크포털 eGovFrame 심플홈페이지")).toHaveLength(2);
    expect(window.alert).not.toHaveBeenCalled();
    expect(window.location.href).toBe("");
  });
});
