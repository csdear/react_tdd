import { render, screen } from "@testing-library/react";
import { ContactModal } from "./";
import "@testing-library/jest-dom";

test("ContactModal has text 'I am the contact modal'", async () => {
  render(<ContactModal />);
  const text = await screen.findByText("I am the contact modal");
  expect(text).toBeInTheDocument();
});
