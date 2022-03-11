import { render, screen, fireEvent } from '@testing-library/react';
import { ContactList } from './App';
import { App } from './App';

test('Shows contact modal when add contact button is clicked', () => {
  render(<App />);

  //After app component we expect no modal on the screen.
  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();

  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  // now we expect 2BN DOC
  expect(
    screen.queryByTestId('contact-modal-form'),
  ).toBeInTheDocument();
});

test('Hides contact modal when cancel button is clicked', () => {
  render(<App />);

  //After app component we expect no modal on the screen.
  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();

  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  // now we expect 2BN DOC
  expect(
    screen.queryByTestId('contact-modal-form'),
  ).toBeInTheDocument();

  //ref to concel button
  const cancelBtn = screen.getByText('Cancel');

  fireEvent.click(cancelBtn);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();
});

test('Closes modal automatically after submit', () => {
  render(<App />);

  //After app component we expect no modal on the screen.
  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();

  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  // now we expect 2BN DOC
  expect(
    screen.queryByTestId('contact-modal-form'),
  ).toBeInTheDocument();

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');
  const form = screen.getByTestId('contact-modal-form');

  // filling out the form
  fireEvent.change(nameInput, {
    target: { value: 'Joe' },
  });

  fireEvent.change(phoneInput, {
    target: { value: '123-456-7890' },
  });

  fireEvent.change(emailInput, {
    target: { value: 'test123@gmail.com' },
  });

  fireEvent.submit(form);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();
});

describe('Local Storage Logic Mock', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(c => c),
      },
      writable: true,
    });
  });

  test('Initializes empty array in localstorage if no contacts are stored yet', () => {
    render(<App />);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([]),
    );
  });

  test('Properly stores submitted users', () => {
    const joe = {
      name: 'Joe',
      email: 'test123@gmail.com',
      phone: '123-456-7890',
    };

    render(<App />);

    //After app component we expect no modal on the screen.
    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    const addContactBtn = screen.getByTestId('add-contact-btn');

    fireEvent.click(addContactBtn);

    // now we expect 2BN DOC
    expect(
      screen.queryByTestId('contact-modal-form'),
    ).toBeInTheDocument();

    const nameInput = screen.queryByPlaceholderText('Name');
    const phoneInput = screen.queryByPlaceholderText('Phone Number');
    const emailInput = screen.queryByPlaceholderText('Email Address');
    const form = screen.getByTestId('contact-modal-form');

    // filling out the form
    fireEvent.change(nameInput, {
      target: { value: joe.name },
    });

    fireEvent.change(phoneInput, {
      target: { value: joe.phone },
    });

    fireEvent.change(emailInput, {
      target: { value: joe.email },
    });

    fireEvent.submit(form);

    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([joe]),
    );
  });
});
