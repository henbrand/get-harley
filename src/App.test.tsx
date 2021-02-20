import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Get Harley", () => {
  render(<App />);
  const title = screen.getByText(/Get Harley/i);
  expect(title).toBeInTheDocument();
});
