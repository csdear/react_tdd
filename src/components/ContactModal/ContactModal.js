import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import React from 'react'; //gotta be a better way than adding this to every component.
import { Input } from '../Input/Input.js';

/* eslint-disable react/prop-types */
export const ContactModal = ({ cancel, submit, contact }) => {


  const [name, setName] = useState(contact?.name || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [email, setEmail] = useState(contact?.email || '');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  // in prod, would be better to use an object, and per object
  // and it contains properties such as isDirty, isTouched, value, errorMessage etc.
  // but no reason to go through that for this tutorial says portEXE
  // replaces `formDirty` (R1)
  const [nameDirty, setNameDirty] = useState('');
  const [phoneDirty, setPhoneDirty] = useState('');
  const [emailDirty, setEmailDirty] = useState('');

  const [isValid, setIsValid] = useState(false);

  // (R1) Removed, opted to check each one because, you would
  // still get some that would display a message inappropriated. see minute 1:32, first vid.
  // const [formDirty, setFormDirty] = useState(false);

  useEffect(() => {}, []);

  // run everytime deps name,phone,email change
  // tests if exists and is regex valid.
  useEffect(() => {
    //(R1) if (!formDirty) {
    //   return;
    // }
    // when we run first reset all the errors
    setNameError('');
    setPhoneError('');
    setEmailError('');

    // _valid Arrow IIFE
    // Returns true or false. And sets potential error messages.
    // doesnt care about w||n dirty, just w||n it is valid.
    let _valid = (() => {
      if (!name) {
        return false;
      } else if (!phone) {
        return false;
      } else if (!email) {
        return false;
      } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)) {
        return false;
      } else if (
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ) {
        return false;
      } else {
        // if all of the above pass, return true.
        return true;
      }
    })();

    if (nameDirty && !name) {
      setNameError('Name is required');
    } else if (phoneDirty && !phone) {
      setPhoneError('Phone is required');
    } else if (emailDirty && !email) {
      setEmailError('Email is required');
    } else if (
      phoneDirty &&
      !/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)
    ) {
      setPhoneError('Phone is improperly formatted');
    } else if (
      emailDirty &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setEmailError('Email is improperly formatted');
    }

    setIsValid(_valid);
  }, [name, phone, email, nameDirty, phoneDirty, emailDirty]);

  return (
    <>
    <div className={styles.main}>
    <form
      data-testid="contact-modal-form"
      onSubmit={e => {
        e.preventDefault();
        if (isValid) {
          submit({
            name,
            email,
            phone,
          });
        }
      }}
    >
      <h2>Contact Info:</h2>
      <Input
        value={name}
        label="Name"
        errorMessage={nameError}
        onValueUpdated={val => {
          setNameDirty(true);
          setName(val);
        }}
      />

      <Input
        value={phone}
        label="Phone Number"
        errorMessage={phoneError}
        onValueUpdated={val => {
          setPhoneDirty(true);
          setPhone(val);
        }}
      />

      <Input
        value={email}
        label="Email Address"
        errorMessage={emailError}
        onValueUpdated={val => {
          setEmailDirty(true);
          setEmail(val);
        }}
      />
     <div className={styles.actions}>
        <button disabled={!isValid} className={styles.submit}>Submit</button>
        <button type="button" onClick={cancel} className={styles.cancel}>
            Cancel
        </button>
     </div>

    </form>
  </div>

  <div className={styles.backDrop}></div>
    </>
  );
};
