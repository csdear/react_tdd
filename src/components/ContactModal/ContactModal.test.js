import { render, screen, cleanup } from "@testing-library/react";
import { ContactModal } from "./";
import "@testing-library/jest-dom";

afterEach(cleanup);

// test("ContactModal has text 'I am the contact modal'", async () => {
//   render(<ContactModal />);
//   const text = await screen.findByText("I am the contact modal");
//   expect(text).toBeInTheDocument();
// });

test("Initializes empty form", () => {
  render(<ContactModal />);

  // Setup. Ref the elements by some factor
  const nameInput = screen.queryByPlaceholderText("Name");
  const phoneInput = screen.queryByPlaceholderText("Phone Number");
  const emailInput = screen.queryByPlaceholderText("Email Address");

  // Assertion -- To Be in the document
  expect(nameInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();

  // Assertion -- to have init value of ''
  expect(nameInput).toHaveValue("");
  expect(phoneInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
