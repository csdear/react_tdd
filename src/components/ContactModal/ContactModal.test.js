import {
  render,
  screen,
  cleanup,
  fireEvent,
  getByText,
} from "@testing-library/react";
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

test("Disables submit button when fields are invalid", () => {
  render(<ContactModal />);

  const nameInput = screen.getByPlaceholderText("Name");
  const phoneInput = screen.getByPlaceholderText("Phone Number");
  const emailInput = screen.getByPlaceholderText("Email Address");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(nameInput, { target: { value: "Port Exe" } });
  fireEvent.change(phoneInput, {
    target: { value: "123-456-7890" },
  });
  fireEvent.change(emailInput, {
    target: { value: "portexeofficial" },
  });

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, {
    target: { value: "portexeofficial@gmail.com" },
  });

  expect(submitButton).not.toBeDisabled();

  fireEvent.change(phoneInput, { target: { value: "1234567890" } });

  expect(submitButton).toBeDisabled();
});

test("Displays error messages for invalid inputs", () => {
  render(<ContactModal />);

  const nameInput = screen.getByPlaceholderText("Name");
  const phoneInput = screen.getByPlaceholderText("Phone Number");
  const emailInput = screen.getByPlaceholderText("Email Address");

  fireEvent.change(nameInput, { target: { value: "Port Exe" } });
  fireEvent.change(phoneInput, {
    target: { value: "123-456-7890" },
  });
  fireEvent.change(emailInput, {
    target: { value: "portexeofficial" },
  });

  let errorDiv = screen.queryByTestId("error");
  expect(errorDiv).toHaveTextContent("Email is improperly formatted");

  fireEvent.change(phoneInput, { target: { value: "1234567890" } });
  fireEvent.change(emailInput, {
    target: { value: "portexeofficial@gmail.com" },
  });

  errorDiv = screen.queryByTestId("error");
  expect(errorDiv).toHaveTextContent("Phone is improperly formatted");

  fireEvent.change(phoneInput, {
    target: { value: "123-456-7890" },
  });

  errorDiv = screen.queryByTestId("error");
  expect(errorDiv).not.toBeInTheDocument();
});
