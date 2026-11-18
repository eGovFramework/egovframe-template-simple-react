import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import EgovMypageEdit from "@/pages/mypage/EgovMypageEdit";
import EgovAdminMemberEdit from "@/pages/admin/members/EgovAdminMemberEdit";
import CODE from "@/constants/code";

const failureMessage = "아이디 중복 확인에 실패했습니다. 다시 시도해 주세요.";

describe.each([
  ["회원가입", EgovMypageEdit, "/etc/member_insert"],
  ["관리자 회원등록", EgovAdminMemberEdit, "/members/insert"],
])("%s ID 중복 확인", (name, Component, insertUrl) => {
  beforeEach(() => vi.spyOn(window, "alert").mockImplementation(() => {}));
  afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

  function responses(checkResponse) {
    vi.stubGlobal("fetch", vi.fn(async (url) => {
      if (url.includes("/etc/member_checkid/")) {
        if (checkResponse instanceof Error) throw checkResponse;
        return { ok: true, json: async () => checkResponse };
      }
      return { ok: true, json: async () => ({ resultCode: 200, result: {
        groupId_result: [{ code: "GROUP_00000000000001", codeNm: "USER" }],
      } }) };
    }));
  }

  async function form() {
    const rendered = render(<MemoryRouter><Component mode={CODE.MODE_CREATE} /></MemoryRouter>);
    fireEvent.change(await screen.findByLabelText("회원ID"), { target: { value: "reviewuser" } });
    fireEvent.change(screen.getByLabelText("회원암호"), { target: { value: "Review1234" } });
    fireEvent.change(rendered.container.querySelector("#mberNm"), { target: { value: "테스트회원" } });
    return rendered;
  }

  function registrations() {
    return global.fetch.mock.calls.filter(([url, options]) => url.endsWith(insertUrl) && options.method === "POST");
  }

  it.each([
    ["서버 오류", { resultCode: 900, result: {} }],
    ["결과 누락", { resultCode: 200 }],
    ["개수 누락", { resultCode: 200, result: {} }],
    ["null 개수", { resultCode: 200, result: { usedCnt: null } }],
    ["빈 개수", { resultCode: 200, result: { usedCnt: "" } }],
    ["음수 개수", { resultCode: 200, result: { usedCnt: -1 } }],
    ["소수 개수", { resultCode: 200, result: { usedCnt: 0.5 } }],
    ["네트워크 오류", new TypeError("Failed to fetch")],
    ["null 응답", null],
  ])("%s이면 사용 가능 안내와 등록을 차단한다", async (label, response) => {
    responses(response);
    await form();
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    expect(await screen.findByRole("button", { name: failureMessage })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "사용 가능한 아이디입니다." })).not.toBeInTheDocument();
    expect(registrations()).toHaveLength(0);
  });

  it("중복된 ID로 등록하지 않는다", async () => {
    responses({ resultCode: 200, result: { usedCnt: 1 } });
    await form();
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    expect(await screen.findByRole("button", { name: "이미 사용중인 아이디입니다. [ID체크]" })).toBeInTheDocument();
    expect(registrations()).toHaveLength(0);
  });

  it("사용 가능한 ID는 등록한다", async () => {
    responses({ resultCode: 200, result: { usedCnt: 0 } });
    await form();
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    await waitFor(() => expect(registrations()).toHaveLength(1));
    expect(registrations()[0][1].body.get("mberId")).toBe("reviewuser");
  });

  it("중복 확인 실패 후 다시 확인하여 등록할 수 있다", async () => {
    responses({ resultCode: 900 });
    await form();
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    await screen.findByRole("button", { name: failureMessage });
    responses({ resultCode: 200, result: { usedCnt: 0 } });
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    await waitFor(() => expect(registrations()).toHaveLength(1));
  });

  it("중복 확인 응답을 기다린 뒤에 등록한다", async () => {
    responses({ resultCode: 200, result: { usedCnt: 0 } });
    await form();
    let finishCheck;
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => { finishCheck = resolve; }));
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    expect(finishCheck).toBeTypeOf("function");
    expect(registrations()).toHaveLength(0);
    finishCheck({ ok: true, json: async () => ({ resultCode: 200, result: { usedCnt: 0 } }) });
    await waitFor(() => expect(registrations()).toHaveLength(1));
  });

  it("조회 중 ID를 바꾸면 이전 ID의 사용 가능 안내를 표시하지 않는다", async () => {
    responses({ resultCode: 200, result: { usedCnt: 0 } });
    await form();
    let finishCheck;
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => { finishCheck = resolve; }));
    fireEvent.click(screen.getByRole("button", { name: "중복ID를 체크해 주세요." }));
    fireEvent.change(screen.getByLabelText("회원ID"), { target: { value: "anotheruser" } });
    const json = vi.fn(async () => ({ resultCode: 200, result: { usedCnt: 0 } }));
    finishCheck({ ok: true, json });
    await waitFor(() => expect(json).toHaveBeenCalled());
    expect(screen.getByLabelText("회원ID")).toHaveValue("anotheruser");
    expect(screen.queryByRole("button", { name: "사용 가능한 아이디입니다." })).not.toBeInTheDocument();
  });

  it("빈 ID는 조회하지 않는다", async () => {
    responses({ resultCode: 200, result: { usedCnt: 0 } });
    await form();
    fireEvent.change(screen.getByLabelText("회원ID"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "중복ID를 체크해 주세요." }));
    expect(window.alert).toHaveBeenCalledWith("회원ID를 입력해 주세요");
    expect(global.fetch.mock.calls.some(([url]) => url.includes("/etc/member_checkid/"))).toBe(false);
  });
});
