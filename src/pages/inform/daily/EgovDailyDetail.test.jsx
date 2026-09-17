import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import EgovDailyDetail from "@/pages/inform/daily/EgovDailyDetail";

vi.mock("@/api/egovFetch", () => ({ requestFetch: vi.fn() }));

const SEARCH_CONDITION = { year: 2026, month: 8, date: 8, schdulSe: "1" };

function Destination() {
  const location = useLocation();
  return <output data-testid="destination">{JSON.stringify({
    pathname: location.pathname, state: location.state, navigationType: useNavigationType(),
  })}</output>;
}

function renderDetail(response, prevPath = URL.INFORM_DAILY) {
  EgovNet.requestFetch.mockImplementation((_url, _options, handler) => handler(response));
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/test-detail", state: {
      schdulId: "SCHDUL_0000000000001", prevPath, searchCondition: SEARCH_CONDITION,
    } }]}>
      <Routes>
        <Route path="/test-detail" element={<EgovDailyDetail />} />
        <Route path={URL.INFORM_DAILY} element={<Destination />} />
        <Route path={URL.INFORM_WEEKLY} element={<Destination />} />
        <Route path={URL.ERROR} element={<Destination />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => vi.restoreAllMocks());

it.each([
  ["없는 일정", { resultCode: 404, result: {} }, URL.INFORM_DAILY, URL.INFORM_DAILY],
  ["삭제된 일정", { resultCode: "404", result: { scheduleDetail: null } }, URL.INFORM_WEEKLY, URL.INFORM_WEEKLY],
  ["성공 응답에 상세 결과 없음", { resultCode: 200, result: {} }, URL.INFORM_WEEKLY, URL.INFORM_WEEKLY],
  ["이전 목록 정보 없음", { resultCode: 404, result: {} }, null, URL.INFORM_DAILY],
  ["이전 목록이 일정 목록이 아님", { resultCode: 404, result: {} }, URL.ADMIN, URL.INFORM_DAILY],
])("%s은 안내 후 해당 일정 목록으로 이동한다", (_scenario, response, prevPath, expectedPath) => {
  renderDetail(response, prevPath);

  expect(window.alert).toHaveBeenCalledExactlyOnceWith("일정이 존재하지 않거나 삭제되었습니다.");
  expect(JSON.parse(screen.getByTestId("destination").textContent)).toEqual({
    pathname: expectedPath,
    state: { searchCondition: SEARCH_CONDITION },
    navigationType: "REPLACE",
  });
  expect(EgovNet.requestFetch).toHaveBeenCalledTimes(1);
});

it("다른 오류는 일정 부재로 안내하지 않고 오류 화면으로 보낸다", () => {
  renderDetail({ resultCode: 800, resultMessage: "요청 처리 실패", result: {} });

  expect(window.alert).not.toHaveBeenCalled();
  const destination = JSON.parse(screen.getByTestId("destination").textContent);
  expect(destination.pathname).toBe(URL.ERROR);
  expect(destination.state).toEqual({ msg: "요청 처리 실패" });
});

it.each([false, true])("정상 일정의 내용·날짜·첨부를 유지한다 (첨부: %s)", (hasAttachment) => {
  renderDetail({
    resultCode: 200,
    result: {
      scheduleDetail: {
        schdulNm: "정기 회의", schdulCn: "진행 상황 공유",
        schdulBgnde: "202609081000", schdulEndde: "202609081100",
        schdulSe: "1", schdulIpcrCode: "A", reptitSeCode: "1",
      },
      schdulSe: [{ code: "1", codeNm: "회의" }],
      schdulIpcrCode: [{ code: "A", codeNm: "높음" }],
      reptitSeCode: [{ code: "1", codeNm: "당일" }],
      resultFiles: hasAttachment ? [{
        atchFileId: "encodedFileId==", fileSn: "0", orignlFileNm: "schedule.xlsx", fileMg: "3",
      }] : [],
    },
  });

  expect(window.alert).not.toHaveBeenCalled();
  expect(screen.getByText("정기 회의")).toBeInTheDocument();
  expect(screen.getByText("진행 상황 공유")).toBeInTheDocument();
  expect(screen.getByText(/2026년 09월 08일 10시 00분/)).toBeInTheDocument();
  if (hasAttachment) {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    fireEvent.click(screen.getByRole("link", { name: "schedule.xlsx" }));
    expect(open).toHaveBeenCalledWith(
      expect.stringContaining("/file?atchFileId=encodedFileId%3D%3D&fileSn=0"),
      "_blank", "noopener,noreferrer"
    );
  } else {
    expect(screen.queryByRole("link", { name: "schedule.xlsx" })).not.toBeInTheDocument();
  }
});
