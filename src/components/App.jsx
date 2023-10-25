import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { FilterBar } from './FilterBar/FilterBar';

const getInitialContacts = () => {
  const savedContact = localStorage.getItem('contacts');
  console.log(savedContact);
  if (savedContact !== null) {
    return JSON.parse(savedContact);
  } else {return  [] } ;
};


export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filters, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if ( setContacts(prevState => prevState.find(
        option => option.name.toLowerCase() === newContact.name.toLowerCase()
      ))
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      setContacts(prevState => ({
        contacts: [...prevState, { ...newContact, id: nanoid() }],
      }));
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState => 
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = filterValue => {
    setFilter({
      filter: filterValue,
    });
  };

  const visibleContact = contacts.filter(contact =>
    filters === ''
      ? contact
      : contact.name.toLowerCase().includes(filters.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact()} />

      <h2>Contacts</h2>
      <FilterBar filter={filters} onChangeFilter={changeFilter} />
      <ContactList contacts={visibleContact} onDelete={deleteContact} />
    </div>
  );
};
