import { db } from './firebase';

//
// User APIs
//

// Creates local user object stored at: users/${id}
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

// Retrieves all users from Firebase realtime db.
export const onceGetUsers = () =>
  db.ref('users').once('value');

//
// TODO:
// Other Entity APIs
//
