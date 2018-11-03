import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { firebase } from '../firebase';
import * as cardGames from '../constants/cardGames';

/* Wrapped in higher order component wtih defined authorization for this component. */
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordedGames: null,
      currentUser: null,
      gameStats: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      db.getUser(authUser.uid).then(snapshot => {
        this.setState({ currentUser: snapshot.val().username })
        this.setState({ gameStats: snapshot.val().playerStats})

        db.onceGetRecordedGames().then(games => {
          this.setState({ recordedGames: games.val() })
          var cipher = { total: 0, wins: 0, losses: 0, winrate: 0.0 }
          Object.keys(games.val()).map(key => {
            // Game is of type Fire Emblem Cipher
            if (games.val()[key].cardGame === cardGames.FE_CIPHER) {
              // Player win
              if (games.val()[key].winningPlayer === snapshot.val().username) { cipher.wins += 1; cipher.total += 1; }
              // Player losses
              else if (games.val()[key].losingPlayers === snapshot.val().username) { cipher.losses += 1; cipher.total += 1; }
            } return null;
          });
          // Update current users Firebase game stats
          cipher.winrate = (cipher.wins / cipher.total);
          db.setUserGameStatsCIPHER(authUser.uid, cipher.total, cipher.wins, cipher.losses, cipher.winrate);
        });
      });
    });
  }

  render() {
    const { recordedGames } = this.state;
    const { currentUser } = this.state;
    const { gameStats } = this.state;

    return (
      <div>
        { !!currentUser && <AuthUserName currentUser = {currentUser}/> }
        <div className="recent-games-title"><h1>STATS</h1></div>

        { !!gameStats && <PlayerStats gameStats = {gameStats}/> }
        <div className="recent-games-title"><h1>RECENT GAMES</h1></div>

        { !!recordedGames && <RecordedGamesList recordedGames = {recordedGames}/> }
      </div>
    );
  }
}

/* Since returned recorded-games are objects, not a list, the recorded-games
   must be mapped over the keys in order to display them. */
const RecordedGamesList = ({ recordedGames }) =>
  <div>
    { Object.keys(recordedGames).slice(0, 5).map(key =>
      <div className="recorded-game-container" key = { key }>
        <div className="recorded-game-gameName"><b>{ recordedGames[key].cardGame } - { recordedGames[key].date }</b></div>
        <div className="recorded-game-players">

          <span hidden = {recordedGames[key].winningPlayer === recordedGames[key].playerOne}>{ recordedGames[key].playerOne } ({ recordedGames[key].losingDecksOrCharacterNames })</span>
          <span hidden = {recordedGames[key].winningPlayer !== recordedGames[key].playerOne} style={{color: 'green'}}>{ recordedGames[key].playerOne } ({ recordedGames[key].winningDeckOrCharacterName })</span>
          <div className="versus-player">-VS-</div>
          <span hidden = {recordedGames[key].winningPlayer === recordedGames[key].playerTwo}>{ recordedGames[key].playerTwo } ({ recordedGames[key].losingDecksOrCharacterNames })</span>
          <span hidden = {recordedGames[key].winningPlayer !== recordedGames[key].playerTwo} style={{color: 'green'}}>{ recordedGames[key].playerTwo } ({ recordedGames[key].winningDeckOrCharacterName })</span>

          <span hidden = {recordedGames[key].battleRoyale === false}>
            <span hidden = {recordedGames[key].playerThree === ""}>
              <div className="versus-player">-VS-</div>
              <span hidden = {recordedGames[key].playerThree === "" && recordedGames[key].winningPlayer === recordedGames[key].playerThree}>{ recordedGames[key].playerThree }</span>
              <span hidden = {recordedGames[key].playerThree === "" && recordedGames[key].winningPlayer !== recordedGames[key].playerThree} style={{color: 'green'}}>{ recordedGames[key].playerThree }</span>
            </span>
            <span hidden = {recordedGames[key].playerFour === ""}>
              <div className="versus-player">-VS-</div>
              <span hidden = {recordedGames[key].playerFour === "" && recordedGames[key].winningPlayer === recordedGames[key].playerFour}>{ recordedGames[key].playerFour }</span>
              <span hidden = {recordedGames[key].playerFour === "" && recordedGames[key].winningPlayer !== recordedGames[key].playerFour} style={{color: 'green'}}>{ recordedGames[key].playerFour }</span>
            </span>
          </span>
        </div>
      </div>
    )}
  </div>

const PlayerStats = ({ gameStats }) =>
  <div>
    Fire Emblem Cipher Win Rate: { gameStats.fireEmblemCipher.overallWinRate }
  </div>

const AuthUserName = ({ currentUser }) =>
  <div>
    {currentUser}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
