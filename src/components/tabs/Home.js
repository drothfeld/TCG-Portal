import React, { Component } from 'react';

import withAuthorization from '../auth/withAuthorization';
import { db } from '../../firebase';
import { firebase } from '../../firebase';
import * as cardGames from '../../constants/cardGames';
import './Home.css';

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
          var magic = { total: 0, wins: 0, losses: 0, winrate: 0.0 }
          var pokemon = { total: 0, wins: 0, losses: 0, winrate: 0.0 }
          var yugioh = { total: 0, wins: 0, losses: 0, winrate: 0.0 }
          Object.keys(games.val()).map(key => {

            // Game is of type Fire Emblem Cipher
            if (games.val()[key].cardGame === cardGames.FE_CIPHER) {
              // Player win
              if (games.val()[key].winningPlayer === snapshot.val().username) { cipher.wins += 1; cipher.total += 1; }
              // Player losses
              else if (games.val()[key].losingPlayers === snapshot.val().username) { cipher.losses += 1; cipher.total += 1; }
            }

            // Game is of type Magic The Gathering
            if (games.val()[key].cardGame === cardGames.MAGIC) {
              // Player win
              if (games.val()[key].winningPlayer === snapshot.val().username) { magic.wins += 1; magic.total += 1; }
              // Player losses
              else if (games.val()[key].losingPlayers === snapshot.val().username) { magic.losses += 1; magic.total += 1; }
            }

            // Game is of type Pokémon
            if (games.val()[key].cardGame === cardGames.POKEMON) {
              // Player win
              if (games.val()[key].winningPlayer === snapshot.val().username) { pokemon.wins += 1; pokemon.total += 1; }
              // Player losses
              else if (games.val()[key].losingPlayers === snapshot.val().username) { pokemon.losses += 1; pokemon.total += 1; }
            }

            // Game is of type Yu-Gi-Oh
            if (games.val()[key].cardGame === cardGames.YUGIOH) {
              // Player win
              if (games.val()[key].winningPlayer === snapshot.val().username) { yugioh.wins += 1; yugioh.total += 1; }
              // Player losses
              else if (games.val()[key].losingPlayers === snapshot.val().username) { yugioh.losses += 1; yugioh.total += 1; }
            }
            return null;
          });
          // Update current users Firebase game stats for Fire Emblem Cipher
          if (cipher.total !== 0) { cipher.winrate = (cipher.wins / cipher.total); }
          db.setUserGameStatsCIPHER(authUser.uid, cipher.total, cipher.wins, cipher.losses, cipher.winrate);

          // Update current users Firebase game stats for Magic The Gathering
          if (magic.total !== 0) { magic.winrate = (magic.wins / magic.total); }
          db.setUserGameStatsMAGIC(authUser.uid, magic.total, magic.wins, magic.losses, magic.winrate);

          // Update current users Firebase game stats for Pokémon
          if (pokemon.total !== 0) { pokemon.winrate = (pokemon.wins / pokemon.total); }
          db.setUserGameStatsPOKEMON(authUser.uid, pokemon.total, pokemon.wins, pokemon.losses, pokemon.winrate);

          // Update current users Firebase game stats for Yu-Gi-Oh
          if (yugioh.total !== 0) { yugioh.winrate = (yugioh.wins / yugioh.total); }
          db.setUserGameStatsYUGIOH(authUser.uid, yugioh.total, yugioh.wins, yugioh.losses, yugioh.winrate);
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
        <div className="recent-games-title"><h1>GAME STATS</h1></div>

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
    <div className="player-gameStats" hidden = {gameStats.fireEmblemCipher.totalGames === 0}><b>{cardGames.FE_CIPHER}</b> ({ gameStats.fireEmblemCipher.totalGames } Games)
      <div><b>Win Rate:</b> { parseFloat(gameStats.fireEmblemCipher.overallWinRate.toFixed(4)) }</div>
      <div><b>Total Wins:</b> { gameStats.fireEmblemCipher.totalWins }</div>
      <div><b>Total Losses:</b> { gameStats.fireEmblemCipher.totalLosses }</div>
      <hr/>
    </div>

    <div className="player-gameStats" hidden = {gameStats.magicTheGathering.totalGames === 0}><b>{cardGames.MAGIC}</b> ({ gameStats.magicTheGathering.totalGames } Games)
      <div><b>Win Rate:</b> { parseFloat(gameStats.magicTheGathering.overallWinRate.toFixed(4)) }</div>
      <div><b>Total Wins:</b> { gameStats.magicTheGathering.totalWins }</div>
      <div><b>Total Losses:</b> { gameStats.magicTheGathering.totalLosses }</div>
      <hr/>
    </div>

    <div className="player-gameStats" hidden = {gameStats.pokemon.totalGames === 0}><b>{cardGames.POKEMON}</b> ({ gameStats.pokemon.totalGames } Games)
      <div><b>Win Rate:</b> { parseFloat(gameStats.pokemon.overallWinRate.toFixed(4)) }</div>
      <div><b>Total Wins:</b> { gameStats.pokemon.totalWins }</div>
      <div><b>Total Losses:</b> { gameStats.pokemon.totalLosses }</div>
      <hr/>
    </div>

    <div className="player-gameStats" hidden = {gameStats.yugioh.totalGames === 0}><b>{cardGames.YUGIOH}</b> ({ gameStats.yugioh.totalGames } Games)
      <div><b>Win Rate:</b> { parseFloat(gameStats.yugioh.overallWinRate.toFixed(4)) }</div>
      <div><b>Total Wins:</b> { gameStats.yugioh.totalWins }</div>
      <div><b>Total Losses:</b> { gameStats.yugioh.totalLosses }</div>
      <hr/>
    </div>
  </div>

const AuthUserName = ({ currentUser }) =>
  <div>
    {currentUser}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
