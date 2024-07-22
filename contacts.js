import { nanoid } from 'nanoid';
import fs from 'node:fs/promises';
import path from 'node:path';

const contactsPath = path.resolve('db', 'contacts.json');

export async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contactsAll = await listContacts();
  const result = contactsAll.find(contact => contact.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const contactsAll = await listContacts();

  const deleteContact = contactsAll.find(contact => contact.id === contactId);

  const updateCOntacts = contactsAll.filter(
    contact => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updateCOntacts));

  return deleteContact || null;
}

export async function addContact(name, email, phone) {
  const contactsAll = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contactsAll.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll));
  return newContact;
}
