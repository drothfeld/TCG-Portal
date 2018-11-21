import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import './Rankings.css';

/* Wrapped in higher order component wtih defined authorization for this component. */
class RankingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <div className="rankings-page-title"><h1>USER RANKINGS</h1></div>
        <hr/>
        <h2>FIRE EMBLEM CIPHER</h2>

        { !!users && <UserList users = {users}/> }
      </div>
    );
  }
}

/* Since returned users are objects, not a list, the users
   must be mapped over the keys in order to display them. */
const UserList = ({ users }) =>
  <div>
    <div className = "rankings-row rankings-header"><b>
      <span className = "rankings-ranking">RANK</span>
      <span className = "rankings-user">USER</span>
      <span className = "rankings-wins">WINS</span>
      <span className = "rankings-losses">LOSSES</span>
      <span className = "rankings-total">TOTAL GAMES</span>
      <span className = "rankings-winrate">WINRATE</span></b>
    </div>
    { Object.keys(users).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (users[key].playerStats.fireEmblemCipher.totalWins * users[key].playerStats.fireEmblemCipher.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ users[key].username }</span>
        <span className = "rankings-wins">{ users[key].playerStats.fireEmblemCipher.totalWins }</span>
        <span className = "rankings-losses">{ users[key].playerStats.fireEmblemCipher.totalLosses }</span>
        <span className = "rankings-total">{ users[key].playerStats.fireEmblemCipher.totalGames }</span>
        <span className = "rankings-winrate">{ users[key].playerStats.fireEmblemCipher.overallWinRate.toFixed(3) * 100 }%</span>
      </div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(RankingsPage);
