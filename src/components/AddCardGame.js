import React, { Component } from 'react';

import { db } from '../firebase';
import * as cardGames from '../constants/cardGames';
import * as feCipherColors from '../constants/feCipherDeckColors';
import withAuthorization from './withAuthorization';
import '../main.css';
import './AddCardGame.css';

/* Main add card game content display. */
class AddCardGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
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
  date: '',
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
  touched: {
    cardGame: false,
    date: false,
    playerOne: false,
    playerTwo: false,
    playerThree: false,
    playerFour: false,
    winningPlayer: false,
    winningDeckOrCharacterName: false,
    winningColor: false,
    losingPlayers: false,
    losingDecksOrCharacterNames: false,
    losingColors: false,
  },
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
    /* Prevents reload of the browser. */
    event.preventDefault();

    /* Values to pass to firebase API. */
    const { cardGame, date, playerOne, playerTwo, playerThree, playerFour, winningPlayer, winningDeckOrCharacterName, winningColor, losingPlayers, losingDecksOrCharacterNames, losingColors, battleRoyale } = this.state;
    const gameId = Number(date + String(Math.floor((Math.random() * 99999999) + 111)))

    /* Create new recorded-game in the realtime Firebase database. */
    db.doCreateRecordedGame(gameId, cardGame, date, playerOne, playerTwo, playerThree, playerFour, winningPlayer, winningDeckOrCharacterName, winningColor, losingPlayers, losingDecksOrCharacterNames, losingColors, battleRoyale,)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  /* Handler for inital field validation when onBlur occurs */
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  /* Validation function used to create custom
     form field error logic. */
  validateForm(cardGame, date, playerOne, playerTwo, winningPlayer, winningDeckOrCharacterName, winningColor, losingPlayers, losingDecksOrCharacterNames, losingColors, battleRoyale) {
    /* True means invalid, so conditions are reversed. */
    return {
      cardGame: (cardGame.length === 0 || cardGame.value === -1),
      date: date.length === 0,
      playerOne: playerOne.length === 0,
      playerTwo: playerTwo.length === 0,
      winningPlayer: (winningPlayer.length === 0 || winningPlayer.value === -1),
      winningDeckOrCharacterName: winningDeckOrCharacterName.length === 0,
      winningColor: (this.state.cardGame === cardGames.FE_CIPHER && winningColor.length === 0) || (this.state.cardGame === cardGames.FE_CIPHER && winningColor.value === -1),
      losingPlayers: (losingPlayers.length === 0 || losingPlayers.value === -1),
      losingDecksOrCharacterNames: (losingDecksOrCharacterNames.length === 0 || losingDecksOrCharacterNames.value === -1),
      losingColors: (this.state.cardGame === cardGames.FE_CIPHER && losingColors.length === 0) || (this.state.cardGame === cardGames.FE_CIPHER && losingColors.value === -1),
    };
  }

  /* Called when the battle royale box is toggled
     in order to change the UI as needed. */
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
    const { cardGame, date, playerOne, playerTwo, playerThree, playerFour, winningPlayer, winningDeckOrCharacterName, winningColor, losingPlayers, losingDecksOrCharacterNames, losingColors, battleRoyale, error } = this.state;

    /* Create validation object based on form values. */
    const errors = this.validateForm(cardGame, date, playerOne, playerTwo, winningPlayer, winningDeckOrCharacterName, winningColor, losingPlayers, losingDecksOrCharacterNames, losingColors, battleRoyale);

    /* Defining validation for recording a card game. */
    const isInvalid = Object.keys(errors).some(x => errors[x]);

    /* Check if should field should have error class. */
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    /* Each input field gets a value from local state
       and updates the value in local state with OnChange handler. */
    return (
      <form onSubmit = { this.onSubmit }>

        <div className="container">

          <div className="select-container">
            <label><b>Card Game</b></label>
            <select className={["addgame-select", ...Array.from(shouldMarkError('cardGame') && ["error"])
          ].join(" ")} defaultValue={-1} onChange = { event => this.setState(byPropKey('cardGame', event.target.value)) } onBlur = { this.handleBlur('cardGame') }>
              <option value='-1' disabled>Choose a Card Game</option>
              { Object.keys(cardGames.CARD_GAMES).map((name,index) => <option key={index} value={cardGames.CARD_GAMES[index]}>{cardGames.CARD_GAMES[index]}</option>) }
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

          <label><b>Date of Game</b></label>
          <input className={["addgame-input", ...Array.from(shouldMarkError('date') && ["error"])
              ].join(" ")} style={{ backgroundColor: '#ccc'}}
            value = { date }
            onChange = { event => this.setState(byPropKey('date', event.target.value))}
            onBlur = { this.handleBlur('date') }
            type = "text"
            placeholder = "Format: MMDDYYYY"
          />

          <label><b>Player One</b></label>
          <input className={["addgame-input", ...Array.from(shouldMarkError('playerOne') && ["error"])
              ].join(" ")} style={{ backgroundColor: '#ffc5bf'}}
            value = { playerOne }
            onChange = { event => this.setState(byPropKey('playerOne', event.target.value))}
            onBlur = { this.handleBlur('playerOne') }
            type = "text"
            placeholder = "Enter Full Name"
          />

          <label><b>Player Two</b></label>
          <input className={["addgame-input", ...Array.from(shouldMarkError('playerTwo') && ["error"])
              ].join(" ")} style={{ backgroundColor: '#b8d1f9'}}
            value = { playerTwo }
            onChange = { event => this.setState(byPropKey('playerTwo', event.target.value))}
            onBlur = { this.handleBlur('playerTwo') }
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
            <select className={["addgame-select", ...Array.from(shouldMarkError('winningPlayer') && ["error"])
          ].join(" ")} defaultValue={-1} onChange = { event => this.setState(byPropKey('winningPlayer', event.target.value)) } onBlur = { this.handleBlur('winningPlayer') }>
              <option value='-1' disabled>Select the Winner</option>
              <option hidden = { this.state.playerOne === ""  } value= { playerOne }>{ playerOne }</option>
              <option hidden = { this.state.playerTwo === ""  } value= { playerTwo }>{ playerTwo }</option>
              <option hidden = { !this.state.battleRoyale || this.state.playerThree === ""  } value= { playerThree }>{ playerThree }</option>
              <option hidden = { !this.state.battleRoyale || this.state.playerFour === "" } value= { playerFour }>{ playerFour }</option>
            </select>
          </div>

          <label><b>Winning Deck Name</b></label>
          <input className={["addgame-input", ...Array.from(shouldMarkError('winningDeckOrCharacterName') && ["error"])
              ].join(" ")} style={{ backgroundColor: '#ccc'}}
            value = { winningDeckOrCharacterName }
            onChange = { event => this.setState(byPropKey('winningDeckOrCharacterName', event.target.value))}
            onBlur = { this.handleBlur('winningDeckOrCharacterName') }
            type = "text"
            placeholder = "Enter Deck Name"
          />

          <div hidden = { this.state.cardGame !== cardGames.FE_CIPHER } className="select-container">
            <label><b>Winning Deck Color</b></label>
            <select className={["addgame-select", ...Array.from(shouldMarkError('winningColor') && ["error"])
          ].join(" ")} defaultValue={-1} onChange = { event => this.setState(byPropKey('winningColor', event.target.value)) } onBlur = { this.handleBlur('winningColor') }>
              <option value='-1' disabled>Choose a Fire Emblem Cipher Color</option>
              { Object.keys(feCipherColors.CIPHER_COLORS).map((name,index) => <option key={index} value={feCipherColors.CIPHER_COLORS[index]}>{feCipherColors.CIPHER_COLORS[index]}</option>) }
            </select>
          </div>

          <div hidden = { this.state.battleRoyale } className="select-container">
            <label><b>Losing Player</b></label>
            <select className={["addgame-select", ...Array.from(shouldMarkError('losingPlayers') && ["error"])
          ].join(" ")} defaultValue={-1} onChange = { event => this.setState(byPropKey('losingPlayers', event.target.value)) } onBlur = { this.handleBlur('losingPlayers') }>
              <option value='-1' disabled>Select the Loser</option>
              <option hidden = { this.state.playerOne === "" || this.state.winningPlayer === playerOne } value= { playerOne }>{ playerOne }</option>
              <option hidden = { this.state.playerTwo === "" || this.state.winningPlayer === playerTwo } value= { playerTwo }>{ playerTwo }</option>
              <option hidden = { !this.state.battleRoyale || this.state.playerThree === "" || this.state.winningPlayer === playerThree } value= { playerThree }>{ playerThree }</option>
              <option hidden = { !this.state.battleRoyale || this.state.playerFour === "" || this.state.winningPlayer === playerFour } value= { playerFour }>{ playerFour }</option>
            </select>
          </div>

          <div hidden = { !this.state.battleRoyale } className="select-container">
            <label><b>Losing Players</b></label>
            <input className={["addgame-input", ...Array.from(shouldMarkError('losingPlayers') && ["error"])
                ].join(" ")} style={{ backgroundColor: '#ccc'}}
              value = { losingPlayers }
              onChange = { event => this.setState(byPropKey('losingPlayers', event.target.value))}
              onBlur = { this.handleBlur('losingPlayers') }
              type = "text"
              placeholder = "Enter Full Names Seperated By a Comma"
            />
          </div>

          <label hidden = { this.state.battleRoyale }><b>Losing Deck Name</b></label>
          <label hidden = { !this.state.battleRoyale }><b>Losing Deck Names</b></label>
          <input className={["addgame-input", ...Array.from(shouldMarkError('losingDecksOrCharacterNames') && ["error"])
              ].join(" ")} style={{ backgroundColor: '#ccc'}}
            value = { losingDecksOrCharacterNames }
            onChange = { event => this.setState(byPropKey('losingDecksOrCharacterNames', event.target.value))}
            onBlur = { this.handleBlur('losingDecksOrCharacterNames') }
            type = "text"
            placeholder = "Enter Deck Names Seperated By a Comma"
          />

          <div hidden = { this.state.battleRoyale || this.state.cardGame !== cardGames.FE_CIPHER } className="select-container">
            <label><b>Losing Deck Color</b></label>
            <select className={["addgame-select", ...Array.from(shouldMarkError('losingColors') && ["error"])
          ].join(" ")} defaultValue={-1} onChange = { event => this.setState(byPropKey('losingColors', event.target.value)) } onBlur = { this.handleBlur('losingColors') }>
              <option value='-1' disabled>Choose a Fire Emblem Cipher Color</option>
              { Object.keys(feCipherColors.CIPHER_COLORS).map((name,index) => <option key={index} value={feCipherColors.CIPHER_COLORS[index]}>{feCipherColors.CIPHER_COLORS[index]}</option>) }
            </select>
          </div>

          <div hidden = { !this.state.battleRoyale || this.state.cardGame !== cardGames.FE_CIPHER }>
            <label><b>Losing Deck Colors</b></label>
            <input className={["addgame-input", ...Array.from(shouldMarkError('losingColors') && ["error"])
                ].join(" ")} style={{ backgroundColor: '#ccc'}}
              value = { losingColors }
              onChange = { event => this.setState(byPropKey('losingColors', event.target.value))}
              onBlur = { this.handleBlur('losingColors') }
              type = "text"
              placeholder = "Enter Deck Colors Seperated By a Comma"
            />
          </div>

          <button disabled = { isInvalid } type = "submit">
            Submit Card Game
          </button>
          <div className="default-validation-message" hidden = { !isInvalid }>
            Fill out all form fields to submit
          </div>

        </div>

        { error && <p className="error-text">{ error.message }</p> }
      </form>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AddCardGamePage);
