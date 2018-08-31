import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

import * as cardGames from '../constants/cardGames';
import * as games from '../constants/cardGameList';
import withAuthorization from './withAuthorization';
import '../main.css';
import './AddCardGame.css';

/* Main add card game content display. */
class AddCardGamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardGame: '',
      playerOne: '',
      playerTwo: '',
      playerThree: '',
      playerFour: '',
      winningPlayer: '',
      winningDeckOrCharacterName: '',
      winningColor: '',
      losingPlayers: '',
      losingDecksOrCharacterNames: '',
      losingColors: '',
      battleRoyale: false,
      error: null,
    };
  }

  render() {
    return (
      <div>
        <AddCardGameForm/>
      </div>
    )
  }
}

/* Initialize state of form component. */
const INITIAL_STATE = {
  cardGame: '',
  playerOne: '',
  playerTwo: '',
  playerThree: '',
  playerFour: '',
  winningPlayer: '',
  winningDeckOrCharacterName: '',
  winningColor: '',
  losingPlayers: '',
  losingDecksOrCharacterNames: '',
  losingColors: '',
  battleRoyale: false,
  error: null,
};

/* The key value is used as a dynamic key
   to allocate the actual value in the local state object. */
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


/* Add card game form class declaration. */
class AddCardGameForm extends Component {
  constructor(props) {
    super(props);

    /* Setting field values to INITAL_STATE values. */
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    /* Values to pass to firebase API. */
    const {
      cardGame,
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
    } = this.state;

    console.log(this.state);

    /* Prevents reload of the browser. */
    event.preventDefault();
  }

  checkBattleRoyale = (event) => {
    var p3 = document.getElementById("player-3");
    var p4 = document.getElementById("player-4");

    if (this.state.battleRoyale === true) {
      this.setState(byPropKey('battleRoyale', false));
      this.setState(byPropKey('playerThree', ""));
      this.setState(byPropKey('playerFour', ""));
      p3.style.display = "none";
      p4.style.display = "none";
    } else {
      this.setState(byPropKey('battleRoyale', true));
      p3.style.display = "inline";
      p4.style.display = "inline";
    }
  }

  render() {
    /* Values to capture state. */
    const {
      cardGame,
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
      error,
    } = this.state;

    /* Defining validation for recording a card game. */
    const isInvalid =
      cardGame === '' ||
      playerOne === '' ||
      playerTwo === '' ||
      winningPlayer === '' ||
      winningDeckOrCharacterName === '' ||
      winningColor === '' ||
      losingPlayers === '' ||
      losingDecksOrCharacterNames ||
      losingColors === '';

    /* Each input field gets a value from local state
       and updates the value in local state with OnChange handler. */
    return (
      <form onSubmit = { this.onSubmit }>

        <div className="container">

          <div className="select-container">
            <label><b>Card Game</b></label>
            <select className="addgame-select" defaultValue={-1} onChange = { event => this.setState(byPropKey('cardGame', event.target.value)) }>
              <option value='-1' disabled>Choose a Card Game</option>
              { Object.keys(cardGames).map((name,index) => <option key={index} value={games.GAMES[index]}>{games.GAMES[index]}</option>) }
            </select>
          </div>

          <label className="addgame-checkbox-container">Battle Royale
            <input
              value = { battleRoyale }
              type= "checkbox"
              onClick = { this.checkBattleRoyale }
            />
            <span className="addgame-checkmark"></span>
          </label>

          <label><b>Player One</b></label>
          <input className="addgame-input" style={{ backgroundColor: '#ffc5bf'}}
            value = { playerOne }
            onChange = { event => this.setState(byPropKey('playerOne', event.target.value))}
            type = "text"
            placeholder = "Enter Full Name"
          />

          <label><b>Player Two</b></label>
          <input className="addgame-input" style={{ backgroundColor: '#b8d1f9'}}
            value = { playerTwo }
            onChange = { event => this.setState(byPropKey('playerTwo', event.target.value))}
            type = "text"
            placeholder = "Enter Full Name"
          />

          <div id="player-3" className="optional-player">
            <label hidden = { !this.state.battleRoyale }><b>Player Three</b></label>
            <input className="addgame-input" style={{ backgroundColor: '#9bffa8'}}
              value = { playerThree }
              onChange = { event => this.setState(byPropKey('playerThree', event.target.value))}
              type = "text"
              placeholder = "Enter Full Name"
            />
          </div>

          <div id="player-4" className="optional-player">
            <label hidden = { !this.state.battleRoyale }><b>Player Four</b></label>
            <input className="addgame-input" style={{ backgroundColor: '#f9fcab'}}
              value = { playerFour }
              onChange = { event => this.setState(byPropKey('playerFour', event.target.value))}
              type = "text"
              placeholder = "Enter Full Name"
            />
          </div>

          <div className="select-container">
            <label><b>Winning Player</b></label>
            <select className="addgame-select" defaultValue={-1} onChange = { event => this.setState(byPropKey('winningPlayer', event.target.value)) }>
              <option value='-1' disabled>Select the Winner</option>
              <option value= { playerOne }>{ playerOne }</option>
              <option value= { playerTwo }>{ playerTwo }</option>
              <option hidden = { !this.state.battleRoyale } value= { playerThree }>{ playerThree }</option>
              <option hidden = { !this.state.battleRoyale } value= { playerFour }>{ playerFour }</option>
            </select>
          </div>

          <button type = "submit">
            Submit Card Game
          </button>

        </div>

        { error && <p className="error-text">{ error.message }</p> }
      </form>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AddCardGamePage);
