import React from 'react';
/* eslint-disable react/prop-types */
import styles from './styles.module.css';

// prop for contacts, array, and two callback functions.
export const ContactList = ({
  contacts,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className={styles.main}>
      {contacts.map((c, index) => (
        <div key={`row-${index}`} data-testid={`contact-${index}`} className={styles.row}>
          <div className={styles.name}>{c.name}</div> {/*Each div is a row */}
          <div className={styles.phone}>{c.phone}</div>
          <div className={styles.email}>{c.email}</div>

          <div
            className={styles.edit}
            data-testid={`edit-btn-${index}`}
            onClick={() => onEditClick(index)}
          >
            Edit
          </div>

          <div
          className={styles.delete}
            data-testid={`delete-btn-${index}`}
            onClick={() => onDeleteClick(index)}
          >
            Delete
          </div>
        </div>
      ))}
    </div>
  );
};
