import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test component", () => {
  it("renders the component", () => {
    render(<div>Autenticação</div>);
    expect(screen.getByText("Autenticação")).toBeInTheDocument();
  });
});
