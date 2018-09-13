import React, { Component } from 'react';

import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

/* Wrapped in higher order component wtih defined authorization for this component. */
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordedGames: null,
    };
  }

  componentDidMount() {
    db.onceGetRecordedGames().then(snapshot =>
      this.setState({ recordedGames: snapshot.val() })
    );
  }

  render() {
    const { recordedGames } = this.state

    return (
      <div>
        { <AuthUserInfo />}
        <h1>YOUR RECENT GAMES</h1>
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

const AuthUserInfo = () =>
  <AuthUserContext.Consumer>
    { authUser =>
      <div>
        <h2><div>{ authUser.email }</div></h2>
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
