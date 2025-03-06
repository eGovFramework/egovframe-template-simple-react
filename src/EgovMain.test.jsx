import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import EgovMain from "@/pages/main/EgovMain";

describe("EgovMain Component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <EgovMain />
      </MemoryRouter>
    );
  });
});
