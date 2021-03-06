import {
  render,
  screen,
  fireEvent,
  // getByText,
} from '@testing-library/react';
import { ContactModal } from './';
import React from 'react'


// no longer needed they say, commenting out.
// cleanup,
// afterEach(cleanup);

// test("ContactModal has text 'I am the contact modal'", async () => {
//   render(<ContactModal />);
//   const text = await screen.findByText("I am the contact modal");
//   expect(text).toBeInTheDocument();
// });

describe('Edit Contact', () => {
  test('Initializes form with contact info', () => {
    render(
      <ContactModal
        contact={{
          name: 'Joe',
          phone: '987-654-3210',
          email: 'test@gmail.com',
        }}
      />,
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    expect(nameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    expect(nameInput).toHaveValue('Joe');
    expect(phoneInput).toHaveValue('987-654-3210');
    expect(emailInput).toHaveValue('test@gmail.com');

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    expect(submitButton).not.toBeDisabled();
  });

  test('Enables submit button once form is valid', () => {
    render(<ContactModal />);

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: 'Port Exe' } });

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial@gmail.com' },
    });

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    expect(submitButton).not.toBeDisabled();
  });

  test('Calls cancel when cancel button is clicked', () => {
    const cancelFn = jest.fn();
    render(<ContactModal cancel={cancelFn} />);

    const cancelBtn = screen.getByText('Cancel');
    fireEvent.click(cancelBtn);
    expect(cancelFn).toHaveBeenCalled();
  });

  test('Disables submit button when fields are invalid', () => {
    render(<ContactModal />);

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial' },
    });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial@gmail.com' },
    });

    expect(submitButton).not.toBeDisabled();

    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(submitButton).toBeDisabled();
  });

  test('Displays error messages for invalid inputs', () => {
    render(<ContactModal />);

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');

    fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial' },
    });

    let errorDiv = screen.queryByTestId('error');
    expect(errorDiv).toHaveTextContent(
      'Email is improperly formatted',
    );

    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial@gmail.com' },
    });

    errorDiv = screen.queryByTestId('error');
    expect(errorDiv).toHaveTextContent(
      'Phone is improperly formatted',
    );

    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });

    errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();
  });

  test('Prevents submit function from being called if invalid', () => {
    const onSubmit = jest.fn();
    // then pass it in as the submit function.
    render(<ContactModal submit={onSubmit} />);
    // Setup, ref the elements
    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');
    const form = screen.getByTestId('contact-modal-form');

    // mock a onChange event
    fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });
    // bebug email, it is invalid, so submit() should not be avail.
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial' },
    });

    // is it invalide? expecting to be disabled.
    expect(submitButton).toBeDisabled();

    // try to submit the form
    fireEvent.submit(form);

    // and we expect submit not to have been called.
    expect(onSubmit).not.toHaveBeenCalled();

    // Then we are gonna bless it by fixing the email
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial@gmail.com' },
    });

    // and expect for submit to now NOT be disabled
    expect(submitButton).not.toBeDisabled();

    // submit the form again
    fireEvent.submit(form);

    // and expect the function to have been invoked.
    expect(onSubmit).toHaveBeenCalled();
  });
});

describe('Create Contact', () => {
  test('Initializes empty form', () => {
    render(<ContactModal />);

    // Setup. Ref the elements by some factor
    const nameInput = screen.queryByPlaceholderText('Name');
    const phoneInput = screen.queryByPlaceholderText('Phone Number');
    const emailInput = screen.queryByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    // Assertion -- To Be in the document
    expect(nameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    // Assertion -- to have init value of ''
    expect(nameInput).toHaveValue('');
    expect(phoneInput).toHaveValue('');
    expect(emailInput).toHaveValue('');

    // Expext on init no error messages shown yet.
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    expect(submitButton).toBeDisabled(); // check if element has disabled property t/f
  });

  test('Disables submit button when fields are invalid', () => {
    render(<ContactModal />);

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial' },
    });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial@gmail.com' },
    });

    expect(submitButton).not.toBeDisabled();

    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(submitButton).toBeDisabled();
  });

  test('Displays error messages for invalid inputs', () => {
    render(<ContactModal />);

    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');

    fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial' },
    });

    let errorDiv = screen.queryByTestId('error');
    expect(errorDiv).toHaveTextContent(
      'Email is improperly formatted',
    );

    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial@gmail.com' },
    });

    errorDiv = screen.queryByTestId('error');
    expect(errorDiv).toHaveTextContent(
      'Phone is improperly formatted',
    );

    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });

    errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();
  });

  test('Prevents submit function from being called if invalid', () => {
    const onSubmit = jest.fn();
    // then pass it in as the submit function.
    render(<ContactModal submit={onSubmit} />);
    // Setup, ref the elements
    const nameInput = screen.getByPlaceholderText('Name');
    const phoneInput = screen.getByPlaceholderText('Phone Number');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const submitButton = screen.getByText('Submit');
    const form = screen.getByTestId('contact-modal-form');

    // mock a onChange event
    fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
    fireEvent.change(phoneInput, {
      target: { value: '123-456-7890' },
    });
    // bebug email, it is invalid, so submit() should not be avail.
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial' },
    });

    // is it invalide? expecting to be disabled.
    expect(submitButton).toBeDisabled();

    // try to submit the form
    fireEvent.submit(form);

    // and we expect submit not to have been called.
    expect(onSubmit).not.toHaveBeenCalled();

    // Then we are gonna bless it by fixing the email
    fireEvent.change(emailInput, {
      target: { value: 'portexeofficial@gmail.com' },
    });

    // and expect for submit to now NOT be disabled
    expect(submitButton).not.toBeDisabled();

    // submit the form again
    fireEvent.submit(form);

    // and expect the function to have been invoked.
    expect(onSubmit).toHaveBeenCalled();
  });
});
