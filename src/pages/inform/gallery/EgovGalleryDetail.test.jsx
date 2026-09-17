import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import EgovGalleryDetail from "@/pages/inform/gallery/EgovGalleryDetail";

/**
 * JWT 는 httpOnly 쿠키라 새 탭에도 붙지만 sessionStorage 는 탭마다 별개다.
 * 그래서 로그인 여부·작성자 여부는 응답이 준 user 로만 판정해야 한다.
 */
const OWNER = "USRCNFRM_00000000001";

const detailResponse = {
  resultCode: 200,
  result: {
    brdMstrVO: { bbsUseFlag: "Y", replyPosblAt: "N", fileAtchPosblAt: "N" },
    boardVO: { bbsId: "BBSMSTR_BBBBBBBBBBBB", nttId: 1, frstRegisterId: OWNER },
    user: { id: "tester", uniqId: OWNER },
    resultFiles: [],
  },
};

const renderDetail = () =>
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/",
          state: {
            bbsId: "BBSMSTR_BBBBBBBBBBBB",
            nttId: 1,
            searchCondition: { pageIndex: 1, searchCnd: "0", searchWrd: "" },
          },
        },
      ]}
    >
      <EgovGalleryDetail />
    </MemoryRouter>
  );

describe("사이트갤러리 상세", () => {
  beforeEach(() => {
    sessionStorage.clear(); // 새 탭 — 이 탭에는 로그인 캐시가 없다
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(detailResponse) })
    );
  });

  it("새 탭에서 열어도 작성자 본인에게 수정·삭제 버튼을 보여준다", async () => {
    renderDetail();

    await waitFor(() =>
      expect(screen.getByRole("link", { name: "수정" })).toBeInTheDocument()
    );
    expect(screen.getByText("삭제")).toBeInTheDocument();
  });

  it("작성자가 아니면 수정 버튼을 보여주지 않는다", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ...detailResponse,
            result: {
              ...detailResponse.result,
              user: { id: "other", uniqId: "USRCNFRM_00000000002" },
            },
          }),
      })
    );

    renderDetail();

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.queryByRole("link", { name: "수정" })).not.toBeInTheDocument();
  });
});
