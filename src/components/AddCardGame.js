import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';
import * as cardGames from '../constants/cardGames';
import * as games from '../constants/cardGameList';
import '../main.css';
import './AddCardGame.css';

/* Main add card game content display. */
const AddCardGamePage = ({ history }) =>
  <div>
    <AddCardGameForm history = { history }/>
  </div>

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
      battleRoyal,
    } = this.state;

    const {
      history,
    } = this.props;

    console.log(this.state.cardGame);

    /* Prevents reload of the browser. */
    event.preventDefault();
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

          <div className="select-game-container">
            <label><b>Card Game</b></label>
            <select className="dropdown-select" defaultValue={-1} onChange = { event => this.setState(byPropKey('cardGame', event.target.value)) }>
              <option value='-1' disabled>Choose a Card Game</option>
              { Object.keys(cardGames).map((name,index) => <option key={index} value={games.GAMES[index]}>{games.GAMES[index]}</option>) }
            </select>

            <button type = "submit">
              Submit Card Game
            </button>
          </div>

        </div>

        { error && <p className="error-text">{ error.message }</p> }
      </form>
    );
  }
}

/* Passing component to withRouter allows
   us to redirect the user. */
export default withRouter(AddCardGamePage);

export {
  AddCardGameForm,
};
