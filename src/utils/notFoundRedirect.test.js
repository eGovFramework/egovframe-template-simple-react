import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { redirectIfNotFound } from "@/utils/notFoundRedirect";
import CODE from "@/constants/code";
import URL from "@/constants/url";

describe("redirectIfNotFound", () => {
  let navigate;

  beforeEach(() => {
    navigate = vi.fn();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  const call = (resp) =>
    redirectIfNotFound(resp, {
      navigate,
      listURL: "/list",
      searchCondition: { pageIndex: 2 },
      message: "없음",
      resultKey: "boardVO",
    });

  it("resultCode 404면 안내 후 목록으로 복귀하고 true 를 반환한다", () => {
    const handled = call({ resultCode: CODE.RCV_ERROR_NOT_FOUND, result: null });

    expect(handled).toBe(true);
    expect(window.alert).toHaveBeenCalledWith("없음");
    expect(navigate).toHaveBeenCalledWith("/list", {
      replace: true,
      state: { searchCondition: { pageIndex: 2 } },
    });
  });

  it("200 이지만 대상 데이터가 비어 있으면 목록으로 복귀하고 true 를 반환한다", () => {
    const handled = call({ resultCode: CODE.RCV_SUCCESS, result: {} });

    expect(handled).toBe(true);
    expect(navigate).toHaveBeenCalledWith(
      "/list",
      expect.objectContaining({ replace: true })
    );
  });

  it("200 도 404 도 아니면 공통 에러 페이지로 보내고 true 를 반환한다", () => {
    const handled = call({ resultCode: CODE.RCV_ERROR_SAVE, resultMessage: "저장오류" });

    expect(handled).toBe(true);
    expect(navigate).toHaveBeenCalledWith(
      { pathname: URL.ERROR },
      { state: { msg: "저장오류" } }
    );
  });

  it("200 이고 대상 데이터가 있으면 아무 동작 없이 false 를 반환한다", () => {
    const handled = call({
      resultCode: CODE.RCV_SUCCESS,
      result: { boardVO: { nttId: 1 } },
    });

    expect(handled).toBe(false);
    expect(navigate).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("resultKey 를 주지 않으면 result 자체 유무로 판별한다", () => {
    const handled = redirectIfNotFound(
      { resultCode: CODE.RCV_SUCCESS, result: null },
      { navigate, listURL: "/l", message: "x" }
    );
    expect(handled).toBe(true);
  });
});

  