import styles from './styles.module.css';
import { useEffect, useState } from 'react'; // dunno why but had to add else react is not defined..
import { App2 } from '../App2/App2';
import { Date } from '../Date/Date';
import { ContactModal } from '../ContactModal';
import { ContactList } from '../ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [addingContact, setAddingContact] = useState(false);

  const [editContact, setEditContact] = useState(); // init as undefined.

  //when we click a button for edit contact...
  // remember instead of using an Id, we are using the index, contactIndex
  // as our source of referential truth in this project.
  // the state for editContact will be the contact we are editing.
  // might not need though, MAGPIE32236:36, commenting out for now
  // const editContact = contactIndex => {
  // call update Fn, setting contact to use by its index.
  // setEditContact(contacts[contactIndex]);
  // }

  const deleteContact = contactIndex => {
    const newContacts = contacts.filter((_, i) => i !== contactIndex);
    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };

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

      {typeof editContact === 'number' && (
        <ContactModal
          contact={contacts[editContact]}
          cancel={() => setEditContact(undefined)}
          submit={c => {
            const newContacts = contacts.map((contact, index) => {
              console.log(c);
              if (index === editContact) {
                return c;
              } else {
                return contact;
              }
            });

            setContacts(newContacts);

            localStorage.setItem(
              'contacts',
              JSON.stringify(newContacts),
            );
            setEditContact(undefined); // to close modal after submit
          }}
        />
      )}

      <button
        className={styles.addContactBtn}
        data-testid="add-contact-btn"
        onClick={() => setAddingContact(true)}
      >
        Add Contact
      </button>

      <ContactList
        contacts={contacts}
        onDeleteClick={deleteContact}
        onEditClick={contactIndex => setEditContact(contactIndex)}
      />
    </div>
  );
};
