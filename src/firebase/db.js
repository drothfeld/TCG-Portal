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

// Retrieves a single user from Firebase.
export const getUser = (id) =>
  db.ref(`users/${id}`).once('value');

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
export const setUserGameStatsCIPHER = (id, totalGames, totalWins, totalLosses, overallWinRate) =>
  db.ref(`users/${id}/playerStats/fireEmblemCipher`).set({
    totalGames,
    totalWins,
    totalLosses,
    overallWinRate,
  });

// Get all of the game stats for a user
export const getUserGameStats = (id) =>
  db.ref(`users/${id}/playerStats`).once('value');
