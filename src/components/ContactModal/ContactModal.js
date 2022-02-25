import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import React from "react"; //gotta be a better way than adding this to every component.

export const ContactModal = ({ submit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isValid, setIsValid] = useState(false);

  // run everytime deps name,phone,email change
  // tests if exists and is regex valid.
  useEffect(() => {
    // when we run first reset all the errors
    setNameError("");
    setPhoneError("");
    setEmailError("");

    // _valid Arrow IIFE
    // Returns true or false. And sets potential error messages.

    let _valid = (() => {
      if (!name) {
        setNameError("Name is required");
        return false;
      } else if (!phone) {
        setPhoneError("Phone is required");
        return false;
      } else if (!email) {
        setEmailError("Email is required");
        return false;
      } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)) {
        setPhoneError("Phone is improperly formatted");
        return false;
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Email is improperly formatted");
        return false;
      } else {
        // if all of the above pass, return true.
        return true;
      }
    })();

    setIsValid(_valid);
  }, [name, phone, email]);

  return (
    <div className={styles.main}>
      <form
        data-testid="contact-modal-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) {
            submit();
          }
        }}
      >
        <input
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!!nameError && <div className={styles.error}>{nameError}</div>}
        <input
          required
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {!!phoneError && <div className={styles.error}>{phoneError}</div>}
        <input
          required
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Error messages*/}
        {!!emailError && <div className={styles.error}>{emailError}</div>}
        <button disabled={!isValid}>Submit</button>
      </form>
    </div>
  );
};
