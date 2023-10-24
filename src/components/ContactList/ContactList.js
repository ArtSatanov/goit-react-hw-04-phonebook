import { StyledTh, StyledTb, StyledTd } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  console.log(contacts);
  return (
    <StyledTb>
      <thead>
        <tr>
          <StyledTh>Name</StyledTh>
          <StyledTh>Number</StyledTh>
          <StyledTh>Action</StyledTh>
        </tr>
      </thead>

      <tbody>
        {contacts.map(contact => (
          <tr key={contact.id}>
            <StyledTd>{contact.name}</StyledTd>
            <StyledTd>{contact.number}</StyledTd>
            <StyledTd>
              <button onClick={() => onDelete(contact.id)}>Delete</button>
            </StyledTd>
          </tr>
        ))}
      </tbody>
    </StyledTb>
  );
};
