import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

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
        <h1>USER RANKINGS</h1>

        { !!users && <UserList users = {users}/> }
      </div>
    );
  }
}

/* Since returned users are objects, not a list, the users
   must be mapped over the keys in order to display them. */
const UserList = ({ users }) =>
  <div>
    { Object.keys(users).map(key =>
      <div key = { key }>
        { users[key].username }
        { users[key].playerStats.fireEmblemCipher.overallWinRate }
      </div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(RankingsPage);
