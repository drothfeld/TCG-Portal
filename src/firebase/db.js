import { db } from './firebase';

//
// User APIs
//

// Creates user object stored at: users/${id}
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

// Deletes user object stored at: users/${id}
export const doDeleteUser = (id) =>
  db.ref(`users/${id}`).remove()

// Creates a recorded-game object stored at: recorded-object/$

// Retrieves all users from Firebase realtime db.
export const onceGetUsers = () =>
  db.ref('users').once('value');

//
// TODO:
// Other Entity APIs
//
