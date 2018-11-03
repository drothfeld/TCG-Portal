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

// Retrieves all users from Firebase.
export const onceGetUsers = () =>
  db.ref('users').once('value');

// Creates a new recorded-game object in Firebase.
export const doCreateRecordedGame = (id, cardGame, date, playerOne, playerTwo, playerThree, playerFour, winningPlayer, winningDeckOrCharacterName, winningColor, losingPlayers, losingDecksOrCharacterNames, losingColors, battleRoyale,) =>
  db.ref(`recorded-games/${id}`).set({
    cardGame,
    date,
    playerOne,
    playerTwo,
    playerThree,
    playerFour,
    winningPlayer,
    winningDeckOrCharacterName,
    winningColor,
    losingPlayers,
    losingDecksOrCharacterNames,
    losingColors,
    battleRoyale,
  });

// Retrieves all the recorded-game objects from Firebase.
export const onceGetRecordedGames = () =>
  db.ref('recorded-games').once('value');

// Updates the amount of total card game wins a user has.
export const doSetUserWins = (id, cipherWins, magicWins, pokemonWins, yugiohWins) =>
  db.ref(`users/${id}/cardGameWins`).set({
    cipherWins,
    magicWins,
    pokemonWins,
    yugiohWins,
  });

// Updates the amount of total card game losses a user has.
export const doSetUserLosses = (id, cipherLosses, magicLosses, pokemonLosses, yugiohLosses) =>
  db.ref(`users/${id}/cardGameLosses`).set({
    cipherLosses,
    magicLosses,
    pokemonLosses,
    yugiohLosses,
  });

// Gets all the users card game win counts
export const getUserWins = (id) =>
  db.ref(`users/${id}/cardGameWins`).once('value');

// Get all the users card game lose counts
export const getUserLosses = (id) =>
  db.ref(`users/${id}/cardGameLosses`).once('value');
