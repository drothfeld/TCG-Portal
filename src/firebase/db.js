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

// Updates a players game stats for Fire Emblem Cipher.
export const setUserGameStatsCIPHER = (id, totalGames, totalWins, totalLosses, overallWinRate) =>
  db.ref(`users/${id}/playerStats/fireEmblemCipher`).set({
    totalGames,
    totalWins,
    totalLosses,
    overallWinRate,
  });

// Updates a players game stats for Magic The Gathering
export const setUserGameStatsMAGIC = (id, totalGames, totalWins, totalLosses, overallWinRate) =>
  db.ref(`users/${id}/playerStats/magicTheGathering`).set({
    totalGames,
    totalWins,
    totalLosses,
    overallWinRate,
  });

// Updates a players game stats for Pokémon
export const setUserGameStatsPOKEMON = (id, totalGames, totalWins, totalLosses, overallWinRate) =>
  db.ref(`users/${id}/playerStats/pokemon`).set({
    totalGames,
    totalWins,
    totalLosses,
    overallWinRate,
  });

// Updates a players game stats for Yu-Gi-Oh
export const setUserGameStatsYUGIOH = (id, totalGames, totalWins, totalLosses, overallWinRate) =>
  db.ref(`users/${id}/playerStats/yugioh`).set({
    totalGames,
    totalWins,
    totalLosses,
    overallWinRate,
  });

// Get all of the game stats for a user
export const getUserGameStats = (id) =>
  db.ref(`users/${id}/playerStats`).once('value');

// Updates the global game statistics
export const updateGlobalGameStats = (totalGamesPlayed) =>
  db.ref(`game-statistics`).set({
    totalGamesPlayed,
  });

// Updates the Fire Emblem Cipher game statistics
export const updateGeneralCIPHERGameStats = (totalGamesPlayed, mostPopularDeckName, mostPopularDeckWinCount, mostPopularDeckLossCount, mostPopularDeckWinRate, mostPopularDeckGameCount, mostVictoriousDeckName, mostVictoriousDeckWinCount, mostVictoriousDeckLossCount, mostVictoriousDeckWinRate) =>
  db.ref(`game-statistics/fireEmblemCipher`).set({
    totalGamesPlayed,
    mostPopularDeckName,
    mostPopularDeckWinCount,
    mostPopularDeckLossCount,
    mostPopularDeckWinRate,
    mostPopularDeckGameCount,
    mostVictoriousDeckName,
    mostVictoriousDeckWinCount,
    mostVictoriousDeckLossCount,
    mostVictoriousDeckWinRate,
  });

// Updates the Fire Emblem Cipher game statistics
export const updateCIPHERGameStats = (color, totalGamesPlayed, totalWins, totalLosses, mostPopularDeckName, mostPopularDeckGameCount, mostVictoriousDeckName, mostVictoriousDeckWinCount, mostVictoriousDeckLossCount, mostVictoriousDeckWinRate,
  winsAgainstRed, lossesAgainstRed, winRateAgainstRed,
  winsAgainstBlue, lossesAgainstBlue, winRateAgainstBlue,
  winsAgainstWhite, lossesAgainstWhite, winRateAgainstWhite,
  winsAgainstBlack, lossesAgainstBlack, winRateAgainstBlack,
  winsAgainstGreen, lossesAgainstGreen, winRateAgainstGreen,
  winsAgainstPurple, lossesAgainstPurple, winRateAgainstPurple,
  winsAgainstYellow, lossesAgainstYellow, winRateAgainstYellow,
  winsAgainstColorless, lossesAgainstColorless, winRateAgainstColorless,
  ) =>
  db.ref(`game-statistics/fireEmblemCipher/${color}`).set({
    totalGamesPlayed,
    totalWins,
    totalLosses,
    mostPopularDeckName,
    mostPopularDeckGameCount,
    mostVictoriousDeckName,
    mostVictoriousDeckWinCount,
    mostVictoriousDeckLossCount,
    mostVictoriousDeckWinRate,
    winsAgainstRed, lossesAgainstRed, winRateAgainstRed,
    winsAgainstBlue, lossesAgainstBlue, winRateAgainstBlue,
    winsAgainstWhite, lossesAgainstWhite, winRateAgainstWhite,
    winsAgainstBlack, lossesAgainstBlack, winRateAgainstBlack,
    winsAgainstGreen, lossesAgainstGreen, winRateAgainstGreen,
    winsAgainstPurple, lossesAgainstPurple, winRateAgainstPurple,
    winsAgainstYellow, lossesAgainstYellow, winRateAgainstYellow,
    winsAgainstColorless, lossesAgainstColorless, winRateAgainstColorless,
  });

// Updates the Magic The Gathering game statistics
export const updateGeneralMAGICGameStats = (totalGamesPlayed) =>
  db.ref(`game-statistics/magicTheGathering`).set({
    totalGamesPlayed,
  });

// Updates the Pokémon game statistics
export const updateGeneralPOKEMONGameStats = (totalGamesPlayed) =>
  db.ref(`game-statistics/pokemon`).set({
    totalGamesPlayed,
  });

// Updates the Yu-Gi-Oh game statistics
export const updateGeneralYUGIOHGameStats = (totalGamesPlayed) =>
  db.ref(`game-statistics/yugioh`).set({
    totalGamesPlayed,
  });

// Get all the game stats for Fire Emblem Cipher
export const getCIPHERGameStats = () =>
  db.ref(`game-statistics/fireEmblemCipher`).once('value');

// Get all the game stats for Magic The Gathering
export const getMAGICGameStats = () =>
  db.ref(`game-statistics/magicTheGathering`).once('value');

// Get all the game stats for Pokémon
export const getPOKEMONGameStats = () =>
  db.ref(`game-statistics/pokemon`).once('value');

// Get all the game stats for Yu-Gi-Oh
export const getYUGIOHGameStats = () =>
  db.ref(`game-statistics/yugioh`).once('value');
