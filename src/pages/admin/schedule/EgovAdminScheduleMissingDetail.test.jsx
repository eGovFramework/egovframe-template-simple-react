import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as EgovNet from "@/api/egovFetch";
import CODE from "@/constants/code";
import URL from "@/constants/url";
import EgovAdminScheduleDetail from "@/pages/admin/schedule/EgovAdminScheduleDetail";
import EgovAdminScheduleEdit from "@/pages/admin/schedule/EgovAdminScheduleEdit";
import EgovAdminScheduleList from "@/pages/admin/schedule/EgovAdminScheduleList";

vi.mock("@/api/egovFetch", async (importOriginal) => ({
  ...await importOriginal(), requestFetch: vi.fn(),
}));

const SCHEDULE_ID = "SCHDUL_0000000000001";
const SEARCH_CONDITION = { year: 2026, month: 8, date: 8, schdulSe: "1" };

function Destination() {
  const location = useLocation();
  return <output data-testid="destination">{JSON.stringify({
    pathname: location.pathname,
    state: location.state,
    navigationType: useNavigationType(),
  })}</output>;
}

function renderSchedule(element, state = { schdulId: SCHEDULE_ID, searchCondition: SEARCH_CONDITION }) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/test-schedule", state }]}>
      <Routes>
        <Route path="/test-schedule" element={element} />
        <Route path={URL.ADMIN_SCHEDULE} element={<Destination />} />
        <Route path={URL.ADMIN_SCHEDULE_DETAIL} element={<Destination />} />
        <Route path={URL.ADMIN_SCHEDULE_MODIFY} element={<Destination />} />
        <Route path={URL.ERROR} element={<Destination />} />
      </Routes>
    </MemoryRouter>
  );
}

function detailResponse(attachments = []) {
  return {
    resultCode: 200,
    result: {
      scheduleDetail: {
        schdulId: SCHEDULE_ID,
        schdulNm: "정기 회의",
        schdulCn: "진행 상황 공유",
        schdulSe: "1",
        schdulIpcrCode: "A",
        reptitSeCode: "1",
        schdulBgnde: "202609081000",
        schdulEndde: "202609081100",
        atchFileId: attachments.length ? "encodedFileId==" : "",
      },
      schdulSe: [{ code: "1", codeNm: "부서일정" }],
      schdulIpcrCode: [{ code: "A", codeNm: "높음" }],
      reptitSeCode: [{ code: "1", codeNm: "당일" }],
      resultFiles: attachments,
      user: { id: "admin" },
    },
  };
}

function respondWith(response) {
  EgovNet.requestFetch.mockImplementation((_url, _options, handler) => handler(response));
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => vi.restoreAllMocks());

describe.each([
  ["상세", <EgovAdminScheduleDetail key="detail" />],
  ["수정", <EgovAdminScheduleEdit key="modify" mode={CODE.MODE_MODIFY} />],
])("일정 %s 화면", (_name, element) => {
  it.each([
    ["없는 일정", { resultCode: 404, result: {} }],
    ["삭제된 일정", { resultCode: "404", result: { scheduleDetail: null } }],
    ["성공 응답에 상세 결과 없음", { resultCode: 200, result: {} }],
  ])("%s은 안내 후 기존 검색 조건의 목록으로 이동한다", (_scenario, response) => {
    respondWith(response);

    renderSchedule(element);

    expect(window.alert).toHaveBeenCalledExactlyOnceWith("일정이 존재하지 않거나 삭제되었습니다.");
    expect(JSON.parse(screen.getByTestId("destination").textContent)).toEqual({
      pathname: URL.ADMIN_SCHEDULE,
      state: { searchCondition: SEARCH_CONDITION },
      navigationType: "REPLACE",
    });
    expect(EgovNet.requestFetch).toHaveBeenCalledTimes(1);
    expect(EgovNet.requestFetch).toHaveBeenCalledWith(
      `/schedule/${SCHEDULE_ID}`, expect.objectContaining({ method: "GET" }), expect.any(Function)
    );
  });

  it("다른 오류 응답은 일정 부재로 안내하지 않고 오류 화면으로 보낸다", () => {
    respondWith({ resultCode: 800, resultMessage: "요청 처리 실패", result: {} });

    renderSchedule(element);

    expect(window.alert).not.toHaveBeenCalled();
    const destination = JSON.parse(screen.getByTestId("destination").textContent);
    expect(destination.pathname).toBe(URL.ERROR);
    expect(destination.state).toEqual({ msg: "요청 처리 실패" });
  });

  it.each([false, true])("정상 일정의 내용과 첨부파일을 유지한다 (첨부: %s)", (hasAttachment) => {
    const attachments = hasAttachment ? [{
      atchFileId: "encodedFileId==", fileSn: "0", orignlFileNm: "schedule.xlsx", fileMg: "3",
    }] : [];
    respondWith(detailResponse(attachments));

    renderSchedule(element);

    expect(screen.queryByTestId("destination")).not.toBeInTheDocument();
    expect(window.alert).not.toHaveBeenCalled();
    if (_name === "상세") {
      expect(screen.getByText("정기 회의")).toBeInTheDocument();
      expect(screen.getByText("진행 상황 공유")).toBeInTheDocument();
      expect(screen.getByText(/2026년 09월 08일 10시 00분/)).toBeInTheDocument();
    } else {
      expect(screen.getByDisplayValue("정기 회의")).toBeInTheDocument();
      expect(screen.getByDisplayValue("진행 상황 공유")).toBeInTheDocument();
    }
    if (hasAttachment) {
      const open = vi.spyOn(window, "open").mockImplementation(() => null);
      fireEvent.click(screen.getByRole("link", { name: "schedule.xlsx" }));
      expect(open).toHaveBeenCalledWith(
        expect.stringContaining("/file?atchFileId=encodedFileId%3D%3D&fileSn=0"),
        "_blank", "noopener,noreferrer"
      );
      expect(screen.getByText("[3byte]")).toBeInTheDocument();
    } else {
      expect(screen.queryByRole("link", { name: "schedule.xlsx" })).not.toBeInTheDocument();
    }
  });
});

it("신규 등록은 상세 조회 없이 선택한 날짜로 입력 화면을 연다", () => {
  renderSchedule(<EgovAdminScheduleEdit mode={CODE.MODE_CREATE} />, { iUseDate: "20260908000000" });

  expect(EgovNet.requestFetch).not.toHaveBeenCalled();
  expect(window.alert).not.toHaveBeenCalled();
  expect(screen.queryByTestId("destination")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "저장" })).toBeInTheDocument();
  expect(screen.getAllByDisplayValue("2026-09-08 00:00")).toHaveLength(2);
});

it("목록의 월과 일정구분을 상세 화면으로 전달한다", () => {
  respondWith({ resultCode: 200, result: { resultList: [detailResponse().result.scheduleDetail] } });

  renderSchedule(<EgovAdminScheduleList />, { searchCondition: SEARCH_CONDITION });
  fireEvent.click(screen.getByRole("link", { name: "정기 회의" }));

  const destination = JSON.parse(screen.getByTestId("destination").textContent);
  expect(destination.pathname).toBe(URL.ADMIN_SCHEDULE_DETAIL);
  expect(destination.state).toEqual({ schdulId: SCHEDULE_ID, searchCondition: SEARCH_CONDITION });
});

it("상세 화면에서 수정 화면으로 이동해도 목록 검색 조건을 유지한다", () => {
  respondWith(detailResponse());

  renderSchedule(<EgovAdminScheduleDetail />);
  fireEvent.click(screen.getByRole("link", { name: "수정" }));

  const destination = JSON.parse(screen.getByTestId("destination").textContent);
  expect(destination.pathname).toBe(URL.ADMIN_SCHEDULE_MODIFY);
  expect(destination.state).toEqual({ schdulId: SCHEDULE_ID, searchCondition: SEARCH_CONDITION });
});
