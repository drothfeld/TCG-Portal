import React, { Component } from 'react';

import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

/* Wrapped in higher order component wtih defined authorization for this component. */
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      recordedGames: null,
    };
  }

  componentDidMount() {
    db.onceGetRecordedGames().then(snapshot =>
      this.setState({ recordedGames: snapshot.val() })
    );
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  render() {
    const { users } = this.state;
    const { recordedGames } = this.state;

    return (
      <div>
        { !!users && <AuthUserName users = {users}/> }
        <div className="recent-games-title"><h1>STATS</h1></div>
        TODO: INSERT GAME STATS. NEED APIS TO SAVE GAME STATS IN /user
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

  const AuthUserName = ({ users }) =>
    <AuthUserContext.Consumer>
      { authUser =>
        <div>
          { Object.keys(users).map(key =>
            <div key = { key }>
              <div hidden = { users[key].email !== authUser.email }>
                { users[key].username }
              </div>
            </div>
          )}
        </div>
      }
    </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
