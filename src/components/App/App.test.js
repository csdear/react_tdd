import { render, screen, fireEvent } from '@testing-library/react';
import { ContactList } from './App';
import { App } from './App';

const joe = {
  id: 0,
  name: 'Joe',
  email: 'test123@gmail.com',
  phone: '123-456-7890',
};

const bob = {
  id: 1,
  name: 'Bob',
  email: 'test456@gmail.com',
  phone: '123-456-9999',
};

const addContact = c => {
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
    target: { value: c.name },
  });

  fireEvent.change(phoneInput, {
    target: { value: c.phone },
  });

  fireEvent.change(emailInput, {
    target: { value: c.email },
  });

  fireEvent.submit(form);
};

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

  // ADD CONTACT
  addContact(joe);

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

  test('Properly manages the deletion of contacts', () => {
    render(<App />);
  });

  // on init, we expect localstorage to be empty, so we just excpect contacts with an empty array.
  test('Initializes empty array in localstorage if no contacts are stored yet', () => {
    render(<App />);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([]),
    );
  });

  test('Properly stores submitted users', () => {
    // Excised joe and bob here...
    render(<App />);

    //After app component we expect no modal on the screen.
    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    // ADD CONTACT
    addContact(joe);

    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    // Expect local storage to be called with Joe.
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([joe]),
    );

    addContact(bob);

    // since we have submitted the form we should not see the modal.
    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    // Expect local storage to be called with Joe and bob..
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([joe, bob]),
    );
  });
});
