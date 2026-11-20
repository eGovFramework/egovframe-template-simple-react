import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { mockJsonResponse } from "@/test/mockFetch";

function Consumer() {
  const { user, roles, loading, refresh } = useAuth();
  return <>
    <output>{loading ? "loading" : user ? `${user.name}:${roles.join(",")}` : "anonymous"}</output>
    <button onClick={refresh}>refresh</button>
  </>;
}

describe("AuthProvider 인증 상태 관리", () => {
  const originalLocation = window.location;
  beforeEach(() => {
    delete window.location;
    window.location = { href: "/login" };
    vi.spyOn(window, "alert").mockImplementation(() => {});
    sessionStorage.clear();
  });
  afterEach(() => {
    cleanup();
    window.location = originalLocation;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("/auth/me 호출이 성공(resultCode 200)하면 user 정보와 roles 목록을 설정한다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        mockJsonResponse({
          resultCode: 200,
          resultVO: { id: "test-user", name: "홍길동", userSe: "USR", uniqId: "UNIQ_01", roles: ["ROLE_ADMIN", "ROLE_USER"] },
        })
      )
    );
    render(<AuthProvider><Consumer /></AuthProvider>);
    expect(await screen.findByText("홍길동:ROLE_ADMIN,ROLE_USER")).toBeInTheDocument();
  });

  it.each([
    [200, { resultCode: "401", resultMessage: "not authenticated" }],
    [401, { resultCode: "401", resultMessage: "invalid or expired token" }],
    [401, undefined],
  ])("HTTP %s 익명 응답에서도 로딩을 마치고 로그인 화면에 머문다", async (status, body) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockJsonResponse(body, { ok: status === 200, status })));
    render(<AuthProvider><Consumer /></AuthProvider>);
    expect(await screen.findByText("anonymous")).toBeInTheDocument();
    expect(window.location.href).toBe("/login");
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("갱신 중 401이면 이전 사용자와 역할을 초기화한다", async () => {
    const fetchSpy = vi.fn()
      .mockResolvedValueOnce(
        mockJsonResponse({ resultCode: 200, resultVO: { id: "demo-user", name: "Demo", roles: ["ROLE_ADMIN"] } })
      )
      .mockResolvedValue(mockJsonResponse({ resultCode: "401" }, { ok: false, status: 401 }));
    vi.stubGlobal("fetch", fetchSpy);
    render(<AuthProvider><Consumer /></AuthProvider>);
    expect(await screen.findByText("Demo:ROLE_ADMIN")).toBeInTheDocument();
    await act(async () => screen.getByRole("button", { name: "refresh" }).click());
    await waitFor(() => expect(screen.getByText("anonymous")).toBeInTheDocument());
    expect(window.location.href).toBe("/login");
    expect(window.alert).not.toHaveBeenCalled();
  });
});
