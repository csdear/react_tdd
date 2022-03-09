import styles from './styles.module.css';
import { useEffect, useState } from 'react'; // dunno why but had to add else react is not defined..
import { App2 } from '../App2/App2';
import { Date } from '../Date/Date';
import { ContactModal } from '../ContactModal';

export const App = () => {
  const [addingContact, setAddingContact] = useState(false);

  const date = '2020-01-01';
  return (
    <div className={styles.main}>
      <h2>Welcome to react_tdd</h2>
      <Date dateString={date} />
      {addingContact && (
        <ContactModal
          cancel={() => setAddingContact(false)}
          submit={c => {
            // c = contact passed in.
            console.log(c);
            localStorage.setItem('contacts', c);
            setAddingContact(false); // to close modal after submit
          }}
        />
      )}

      <button
        data-testid="add-contact-btn"
        onClick={() => setAddingContact(true)}
      >
        Add Contact
      </button>
    </div>
  );
};
