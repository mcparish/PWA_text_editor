import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Method to add content to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Add the content to the database; the ID will be auto-generated
    
    const data = await store.put({ value: content, id: 1 }); // No need to manually set the ID
    const results = await data; // Ensure the transaction is completed
    console.log('Content added to the database');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
// Method to get all content from the database
export const getDb = async () => {
  try {
    console.log('GET from the database');
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Retrieve all content from the object store
    const data = await store.get(1);
    const results = await data; // Ensure the transaction is completed

    console.log('Content retrieved from the database', data);
    return results.value; // Return the retrieved data
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
  }
}

// Initialize the database
initdb();
