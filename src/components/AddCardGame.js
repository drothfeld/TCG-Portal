import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

import * as cardGames from '../constants/cardGames';
import * as games from '../constants/cardGameList';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import '../main.css';
import './AddCardGame.css';

/* Main add card game content display. */
class AddCardGamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
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
      battleRoyal: false,
      error: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
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
  users: null,
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
  battleRoyal: false,
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

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  onSubmit = (event) => {
    /* Values to pass to firebase API. */
    const {
      users,
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
      battleRoyal,
    } = this.state;

    console.log(this.state);

    /* Prevents reload of the browser. */
    event.preventDefault();
  }

  render() {
    /* Values to capture state. */
    const {
      users,
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
      battleRoyal,
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
            <select className="dropdown-select" defaultValue={-1} onChange = { event => this.setState(byPropKey('cardGame', event.target.value)) }>
              <option value='-1' disabled>Choose a Card Game</option>
              { Object.keys(cardGames).map((name,index) => <option key={index} value={games.GAMES[index]}>{games.GAMES[index]}</option>) }
            </select>
          </div>

          <div className="select-container">
            <label><b>Player One</b></label>
            <select className="dropdown-select" defaultValue={-1} onChange = { event => this.setState(byPropKey('playerOne', event.target.value)) }>
              <option value='-1' disabled>Select Player One</option>
              { Object.keys(cardGames).map((name,index) => <option key={index} value={games.GAMES[index]}>{games.GAMES[index]}</option>) }
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

/* Since returned users are objects, not a list, the users
   must be mapped over the keys in order to display them. */
const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    { Object.keys(users).map(key =>
      <div key = { key }>{ users[key].username }</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AddCardGamePage);
