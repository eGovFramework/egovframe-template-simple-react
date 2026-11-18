import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import EgovAdminPasswordUpdate from "@/pages/admin/manager/EgovAdminPasswordUpdate";
import { requestFetch } from "@/api/egovFetch";

vi.mock("@/api/egovFetch", () => ({ requestFetch: vi.fn() }));

describe("관리자 비밀번호 변경 검증", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    requestFetch.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const changePassword = (newPassword, confirmPassword = newPassword, oldPassword = "old-password") => {
    render(
      <MemoryRouter>
        <EgovAdminPasswordUpdate />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText("기존 암호"), { target: { value: oldPassword } });
    fireEvent.change(screen.getByLabelText("신규 암호"), { target: { value: newPassword } });
    fireEvent.change(screen.getByLabelText("입력 확인"), { target: { value: confirmPassword } });
    fireEvent.click(screen.getByRole("button", { name: "변경" }));
  };

  it.each(["a", "abcde"])("6자 미만 신규 암호 %s는 요청 전에 거부한다", (password) => {
    changePassword(password);

    expect(window.alert).toHaveBeenCalledWith("신규 암호는 6자 이상이어야 합니다.");
    expect(requestFetch).not.toHaveBeenCalled();
  });

  it.each(["abcdef", "새비밀번호1", " abcde "])("6자 이상 신규 암호 %s는 원문 그대로 전송한다", (password) => {
    changePassword(password);

    expect(window.alert).not.toHaveBeenCalled();
    expect(requestFetch).toHaveBeenCalledTimes(1);
    const [url, options] = requestFetch.mock.calls[0];
    expect(url).toBe("/admin/password");
    expect(options.method).toBe("PATCH");
    expect(JSON.parse(options.body)).toEqual({
      old_password: "old-password",
      new_password: password,
    });
  });

  it.each([
    ["", "", "old-password", "신규 암호는 필수 값입니다."],
    ["abcdef", "abcdef", "", "기존 암호는 필수 값입니다."],
    ["old-password", "old-password", "old-password", "신규 암호는 기존 암호와 동일하게 사용할 수 없습니다."],
    ["abcdef", "different", "old-password", "신규 암호와 입력 확인값이 일치하지 않습니다"],
  ])("기존 입력 검사를 유지한다: %s / %s", (password, confirmation, oldPassword, message) => {
    changePassword(password, confirmation, oldPassword);

    expect(window.alert).toHaveBeenCalledWith(message);
    expect(requestFetch).not.toHaveBeenCalled();
  });
});
