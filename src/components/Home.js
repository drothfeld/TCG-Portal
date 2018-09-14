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
    const { users } = this.state
    const { recordedGames } = this.state

    return (
      <div>
        { !!users && <AuthUserName users = {users}/> }
        <h1>RECENT GAMES</h1>
        { !!recordedGames && <RecordedGamesList recordedGames = {recordedGames}/> }
      </div>
    );
  }
}

/* Since returned recorded-games are objects, not a list, the recorded-games
   must be mapped over the keys in order to display them. */
const RecordedGamesList = ({ recordedGames }) =>
  <div>
    { Object.keys(recordedGames).map(key =>
      <div key = { key }>{ recordedGames[key].winningColor }</div>
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
