import { render, screen, fireEvent } from '@testing-library/react';
// import { ContactList } from './App';
import { App } from './App';
import React from 'react';

const joe = {
  name: 'Joe',
  email: 'test123@gmail.com',
  phone: '123-456-7890',
};

const bob = {
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

  fireEvent.submit(screen.queryByTestId('contact-modal-form'));
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

// Mocking window.localstorage here.
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

  test('Properly manages the edit scenario for the contact modal', () => {
    render(<App />);
    addContact(joe);

    const editBtn = screen.getByTestId('edit-btn-0');
    fireEvent.click(editBtn);
    // after click we would expect to see contact modal
    expect(
      screen.getByTestId('contact-modal-form'),
    ).toBeInTheDocument();
    // how can we test a component has been given the props we expect?

    // const nameInput = screen.getByTestId('name-input');
    const nameInput = screen.getByPlaceholderText('Name');
    expect(nameInput).toHaveValue('Joe');

    // Test changing the contact's name...

    // FAILURE HERE, WASNT UPDATING THE NAME AS EXPECTED !!!
    // BECAUSE THERE IS NO PLACEHOLDER TEXT (6 lines above) at that/this point anymore.
    // we had to got to ContactModal and add a data test id for name-input instead.
    fireEvent.change(nameInput, {
      target: {
        value: 'Port Exe',
      },
    });
    expect(nameInput).toHaveValue('Port Exe');

    //...click the submit button
    fireEvent.click(screen.getByText('Submit'));

    //... then expectLocalStorage to get called with a new object
    // all the same as joe (...joe), except for the name
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([
        {
          ...joe,
          name: 'Port Exe',
        },
      ]),
    );
  });

  test('Properly manages the deletion of contacts', () => {
    // Mocking window.confirm so that the  function always returns true
    Object.defineProperty(window, 'confirm', {
      value: jest.fn(() => true),
      writable: true,
    });

    render(<App />);
    // rendering App, adding joe, adding bob, verifying they are in
    // the localstorage. Then click delete button with joe, and expect
    // only bob to be in.

    addContact(joe);
    addContact(bob);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([joe, bob]),
    );

    // delete button click. Index for joe is zero
    const deleteBtn = screen.getByTestId('delete-btn-0');

    fireEvent.click(deleteBtn);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([bob]),
    );
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
