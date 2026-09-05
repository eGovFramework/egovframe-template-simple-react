import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import EgovNoticeEdit from "@/pages/inform/notice/EgovNoticeEdit";
import CODE from "@/constants/code";

/**
 * 등록·수정 화면의 breadcrumb 은 목록·상세와 같은 게시판 이름을 보여야 한다.
 * Location 이 masterBoard 를 파라미터로 선언해 두고 <Location /> 이 props 없이
 * 호출되면, 그 이름은 바깥 상태가 아니라 빈 props 객체를 가리켜 항상 비어 있다.
 */
const BBS_NM = "공지사항";
const BBS_ID = "BBSMSTR_AAAAAAAAAAAA";

const detail = {
  resultCode: 200,
  result: {
    brdMstrVO: {
      bbsNm: BBS_NM,
      bbsUseFlag: "Y",
      replyPosblAt: "N",
      fileAtchPosblAt: "N",
    },
    boardVO: {
      bbsId: BBS_ID,
      nttId: 1,
      nttSj: "제목",
      nttCn: "내용",
    },
    resultFiles: [],
  },
};

const renderEdit = () =>
  render(
    <MemoryRouter
      initialEntries={[{ pathname: "/", state: { bbsId: BBS_ID, nttId: 1 } }]}
    >
      <EgovNoticeEdit mode={CODE.MODE_MODIFY} />
    </MemoryRouter>
  );

describe("공지사항 수정 화면 breadcrumb", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(detail) })
    );
  });

  it("breadcrumb 마지막 항목에 게시판 이름이 나온다", async () => {
    const { container } = renderEdit();

    // 같은 화면의 제목에는 이름이 나온다 — 데이터가 없어서 비는 것이 아니다
    await screen.findByText(`${BBS_NM} 수정`);

    const breadcrumb = container.querySelector(".location");
    await waitFor(() => expect(breadcrumb.textContent).toContain(BBS_NM));
  });
});
