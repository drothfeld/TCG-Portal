import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

/* Wrapped in higher order component wtih defined authorization for this component. */
class HomePage extends Component {
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
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users = {users}/> }
      </div>
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

export default withAuthorization(authCondition)(HomePage);
