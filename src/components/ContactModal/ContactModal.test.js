import { render, screen, cleanup, fireEvent } from "@testing-library/react";
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
  const submitButton = screen.getByText("Submit");

  // Assertion -- To Be in the document
  expect(nameInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();

  // Assertion -- to have init value of ''
  expect(nameInput).toHaveValue("");
  expect(phoneInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
  expect(submitButton).toBeDisabled(); // check if element has disabled property t/f
});

test("Enables submit button once form is valid", () => {
  render(<ContactModal />);
  // Setup, ref the elements
  const nameInput = screen.queryByPlaceholderText("Name");
  const phoneInput = screen.queryByPlaceholderText("Phone Number");
  const emailInput = screen.queryByPlaceholderText("Email Address");
  const submitButton = screen.getByText("Submit");

  // mock a onChange event
  fireEvent.change(nameInput, { target: { value: "Port Exe" } });
  fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
  fireEvent.change(emailInput, {
    target: { value: "portexeofficial" },
  });

  expect(submitButton).not.toBeDisabled();
});

// test("Disables submit button when fields are invalid", () => {
//     render(<ContactModal />);
//     // Setup, ref the elements
//     const nameInput = screen.queryByPlaceholderText("Name");
//     const phoneInput = screen.queryByPlaceholderText("Phone Number");
//     const emailInput = screen.queryByPlaceholderText("Email Address");
//     const submitButton = screen.getByText("Submit");

//     // mock a onChange event
//     fireEvent.change(nameInput, { target: { value: "Port Exe" } });
//     fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
//     fireEvent.change(emailInput, {
//       target: { value: "portexeofficial" },
//     });

//     expect(submitButton).not.toBeDisabled();
//   });
