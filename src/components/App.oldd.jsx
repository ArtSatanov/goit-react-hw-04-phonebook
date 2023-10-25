import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { FilterBar } from './FilterBar/FilterBar';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const savedContact = localStorage.getItem('contacts');

    if (savedContact !== null) {
      this.setState({
        contacts: JSON.parse(savedContact),
      });
    }
  }

  addContact = newContact => {
    if (
      this.state.contacts.find(
        option => option.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  render() {
    const visibleContact = this.state.contacts.filter(contact =>
      this.state.filter === ''
        ? contact
        : contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />

        <h2>Contacts</h2>
        <FilterBar
          filter={this.state.filter}
          onChangeFilter={this.changeFilter}
        />
        <ContactList contacts={visibleContact} onDelete={this.deleteContact} />
      </div>
    );
  }
}
