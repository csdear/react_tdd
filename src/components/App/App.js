import styles from './styles.module.css';
import { useEffect, useState } from 'react'; // dunno why but had to add else react is not defined..
import { App2 } from '../App2/App2';
import { Date } from '../Date/Date';
import { ContactModal } from '../ContactModal';

export const App = () => {
  const [contacts, setContacts] = useState();
  const [addingContact, setAddingContact] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    // if no contacts create empty contacts array in localStorage and state.
    if (!storedContacts) {
      localStorage.setItem('contacts', JSON.stringify([]));
      setContacts([]);
    } else {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

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
            const newContacts = [...contacts, c]; // contacts plus any new oones
            localStorage.setItem(
              'contacts',
              JSON.stringify(newContacts),
            ); //set it in localStorage
            setContacts(newContacts); //set it in state
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
