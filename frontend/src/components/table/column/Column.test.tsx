import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Column } from "./Column";

describe("Column cell table", () => {
  it("should render a decorative Column header cell component", async () => {
    const thead = document.createElement("thead");
    render(<Column title="Name" />, {
      container: document.body.appendChild(thead),
    });
    screen.debug();
    expect(screen.getByRole("columnheader").textContent).toBe("Name");
  });
});
