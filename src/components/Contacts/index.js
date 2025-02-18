import "./index.css";
import contact from "../../contacts.json";

import React, { useState } from "react";

const ContactsTable = () => {
  const [contactsState, setContactsState] = useState(contact.splice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(contact.slice(2));

  const addRandomContact = () => {
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts[randomIndex];
      setContactsState([randomContact, ...contactsState]);
      setRemainingContacts(
        remainingContacts.filter((_, i) => i !== randomIndex)
      );
    }
  };

  const sortByName = () => {
    setContactsState(
      [...contactsState].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortByPopularity = () => {
    setContactsState(
      [...contactsState].sort((a, b) => b.popularity - a.popularity)
    );
  };
  const deleteContact = (id) => {
    setContactsState(contactsState.filter((contact) => contact.id !== id));
    setRemainingContacts([
      ...remainingContacts,
      contactsState.find((contact) => contact.id === id),
    ]);
  };

  return (
    <div className="ContactsTable">
      <div className="ButtonsContainer">
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortByPopularity}>Sort By Popularity</button>
        <button onClick={sortByName}>Sort By Name</button>
      </div>
<br></br>
      <table className="table">
        <thead>
          <tr className="titles">
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <br></br>
        <tbody>
          {contactsState.map((contact) => (
            <tr key={contact.name}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(1)}</td>
                <td>{contact.wonOscar ? "🏆" : "🔴"}</td>
                <td>{contact.wonEmmy ? "🌟" : "🔴"}</td>
                <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
