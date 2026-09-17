import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import CODE from "@/constants/code";
import URL from "@/constants/url";
import EgovAdminBoardEdit from "@/pages/admin/board/EgovAdminBoardEdit";
import EgovAdminBoardList from "@/pages/admin/board/EgovAdminBoardList";
import EgovAdminMemberEdit from "@/pages/admin/members/EgovAdminMemberEdit";
import EgovAdminMemberList from "@/pages/admin/members/EgovAdminMemberList";
import EgovAdminUsageEdit from "@/pages/admin/usage/EgovAdminUsageEdit";

/**
 * 목록 화면들은 수정 화면으로 갈 때 searchCondition 을 라우터 state 에 실어 보내고,
 * 되돌아왔을 때 location.state?.searchCondition 으로 그 값을 복원하도록 선언돼 있다.
 * 수정 화면의 '목록' 버튼이 그 값을 되돌려주는지 확인한다.
 */
const SEARCH_CONDITION = { pageIndex: 3, searchCnd: "1", searchWrd: "홍길동" };

function ListProbe() {
  const location = useLocation();
  return (
    <div data-testid="list-state">{JSON.stringify(location.state ?? null)}</div>
  );
}

const CASES = [
  {
    name: "회원관리",
    Edit: EgovAdminMemberEdit,
    listPath: URL.ADMIN_MEMBERS,
    editPath: URL.ADMIN_MEMBERS_MODIFY,
    itemState: { uniqId: "USRCNFRM_00000000001" },
    result: { mberManageVO: { uniqId: "USRCNFRM_00000000001" }, groupId_result: [] },
  },
  {
    name: "게시판생성관리",
    Edit: EgovAdminBoardEdit,
    listPath: URL.ADMIN_BOARD,
    editPath: URL.ADMIN_BOARD_MODIFY,
    itemState: { bbsId: "BBSMSTR_AAAAAAAAAAAA" },
    result: { bbsId: "BBSMSTR_AAAAAAAAAAAA", bbsNm: "", useAt: "Y" },
  },
  {
    name: "게시판사용관리",
    Edit: EgovAdminUsageEdit,
    listPath: URL.ADMIN_USAGE,
    editPath: URL.ADMIN_USAGE_MODIFY,
    itemState: {
      bbsId: "BBSMSTR_AAAAAAAAAAAA",
      trgetId: "SYSTEM_DEFAULT_BOARD",
    },
    result: {
      bdUseVO: { bbsId: "BBSMSTR_AAAAAAAAAAAA", useAt: "Y" },
      resultList: [],
    },
  },
];

describe("사이트관리 수정 화면의 '목록' 버튼", () => {
  it.each(CASES)(
    "$name — 목록에서 받은 검색조건을 목록으로 되돌려준다",
    async ({ Edit, listPath, editPath, itemState, result }) => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ resultCode: 200, result }),
        })
      );

      render(
        <MemoryRouter
          initialEntries={[
            {
              pathname: editPath,
              state: { ...itemState, searchCondition: SEARCH_CONDITION },
            },
          ]}
        >
          <Routes>
            <Route path={editPath} element={<Edit mode={CODE.MODE_MODIFY} />} />
            <Route path={listPath} element={<ListProbe />} />
          </Routes>
        </MemoryRouter>
      );

      const backToList = await screen.findByRole("link", { name: "목록" });
      await userEvent.click(backToList);

      await waitFor(() =>
        expect(screen.getByTestId("list-state")).toBeInTheDocument()
      );
      expect(JSON.parse(screen.getByTestId("list-state").textContent)).toEqual(
        expect.objectContaining({ searchCondition: SEARCH_CONDITION })
      );
    }
  );
});

const PAGINATION = {
  currentPageNo: 1,
  pageSize: 5,
  totalRecordCount: 100,
  recordCountPerPage: 10,
};

const LIST_CASES = [
  {
    name: "회원관리",
    List: EgovAdminMemberList,
    listPath: URL.ADMIN_MEMBERS,
    editPath: URL.ADMIN_MEMBERS_MODIFY,
    result: {
      paginationInfo: PAGINATION,
      resultList: [{ uniqId: "USRCNFRM_00000000001", mberNm: "홍길동" }],
      groupId_result: [],
    },
  },
  {
    name: "게시판생성관리",
    List: EgovAdminBoardList,
    listPath: URL.ADMIN_BOARD,
    editPath: URL.ADMIN_BOARD_MODIFY,
    result: {
      paginationInfo: PAGINATION,
      resultCnt: 30,
      resultList: [{ bbsId: "BBSMSTR_AAAAAAAAAAAA", bbsNm: "공지사항" }],
    },
  },
];

describe("사이트관리 목록이 수정 화면으로 넘기는 검색조건", () => {
  it.each(LIST_CASES)(
    "$name — 2페이지에서 항목을 열면 그 페이지 조건이 함께 넘어간다",
    async ({ List, listPath, editPath, result }) => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ resultCode: 200, result }),
        })
      );

      render(
        <MemoryRouter initialEntries={[listPath]}>
          <Routes>
            <Route path={listPath} element={<List />} />
            <Route path={editPath} element={<ListProbe />} />
          </Routes>
        </MemoryRouter>
      );

      await userEvent.click(await screen.findByRole("button", { name: "2" }));

      const [item] = await screen.findAllByRole("link", {
        name: (name, element) => element.classList.contains("list_item"),
      });
      await userEvent.click(item);

      expect(
        JSON.parse(screen.getByTestId("list-state").textContent).searchCondition
      ).toEqual({ pageIndex: 2, searchCnd: "0", searchWrd: "" });
    }
  );
});

const RESTORED = { pageIndex: 2, searchCnd: "1", searchWrd: "홍길동" };

describe("복원된 검색조건으로 마운트한 목록", () => {
  it.each(LIST_CASES)(
    "$name — 페이지를 더 넘겨도 검색유형이 유지된다",
    async ({ List, listPath, result }) => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ resultCode: 200, result }),
        })
      );

      render(
        <MemoryRouter
          initialEntries={[
            { pathname: listPath, state: { searchCondition: RESTORED } },
          ]}
        >
          <Routes>
            <Route path={listPath} element={<List />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
      await userEvent.click(await screen.findByRole("button", { name: "3" }));

      expect(global.fetch.mock.calls.at(-1)[0]).toContain("searchCnd=1");
    }
  );
});

describe("회원관리 목록과 수정 화면 사이의 왕복", () => {
  it("2페이지에서 항목을 열고 목록으로 돌아오면 2페이지를 다시 조회한다", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            resultCode: 200,
            result: {
              paginationInfo: PAGINATION,
              resultList: [{ uniqId: "USRCNFRM_00000000001", mberNm: "홍길동" }],
              groupId_result: [],
              mberManageVO: { uniqId: "USRCNFRM_00000000001" },
            },
          }),
      })
    );

    render(
      <MemoryRouter initialEntries={[URL.ADMIN_MEMBERS]}>
        <Routes>
          <Route path={URL.ADMIN_MEMBERS} element={<EgovAdminMemberList />} />
          <Route
            path={URL.ADMIN_MEMBERS_MODIFY}
            element={<EgovAdminMemberEdit mode={CODE.MODE_MODIFY} />}
          />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(await screen.findByRole("button", { name: "2" }));

    const [item] = await screen.findAllByRole("link", {
      name: (name, element) => element.classList.contains("list_item"),
    });
    await userEvent.click(item);

    await userEvent.click(await screen.findByRole("link", { name: "목록" }));

    await waitFor(() =>
      expect(global.fetch.mock.calls.at(-1)[0]).toContain("pageIndex=2")
    );
  });
});
