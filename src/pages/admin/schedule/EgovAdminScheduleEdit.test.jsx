import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import EgovAdminScheduleEdit from "@/pages/admin/schedule/EgovAdminScheduleEdit";
import CODE from "@/constants/code";

/**
 * 일정 수정 저장 URL 은 modeInfo.editURL(상태)을 제자리에서 이어 붙여 만든다.
 * 형제 게시판 수정 화면들은 수정 URL 을 초기화 때 한 번 완성하는데,
 * 이 화면만 저장할 때마다 상태를 덧붙이므로 저장이 두 번 불리면 id 가 겹친다.
 */
const SCHDUL_ID = "SCHDUL_00000000000123";
const detail = {
  resultCode: 200,
  result: {
    scheduleDetail: {
      schdulId: SCHDUL_ID,
      schdulNm: "회의",
      schdulCn: "정기 회의",
      schdulSe: "1",
      schdulIpcrCode: "1",
      reptitSeCode: "0",
      schdulBgnde: "20260101000000",
      schdulEndde: "20260101010000",
      atchFileId: "",
    },
    resultFiles: [],
  },
};

describe("일정 수정 저장 URL", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(detail) })
    );
  });

  it("저장을 두 번 눌러도 수정 URL 에 일정 ID 가 한 번만 붙는다", async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", state: { schdulId: SCHDUL_ID } }]}>
        <EgovAdminScheduleEdit mode={CODE.MODE_MODIFY} />
      </MemoryRouter>
    );

    // 상세 조회가 끝나 폼이 채워질 때까지
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const save = await screen.findByText("저장");
    fireEvent.click(save);
    fireEvent.click(save);

    await waitFor(() => {
      const puts = global.fetch.mock.calls.filter(
        (c) => (c[1]?.method || "GET") === "PUT"
      );
      expect(puts.length).toBeGreaterThanOrEqual(2);
    });

    const putUrls = global.fetch.mock.calls
      .filter((c) => (c[1]?.method || "GET") === "PUT")
      .map((c) => c[0]);
    // 모든 저장 요청이 같은 URL 이어야 한다
    for (const u of putUrls) {
      expect(u).toContain(`/schedule/${SCHDUL_ID}`);
      expect(u).not.toContain(`${SCHDUL_ID}/${SCHDUL_ID}`);
    }
  });
});
