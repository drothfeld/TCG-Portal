import React, { Component } from 'react';

import AuthUserContext from './AuthUserContext';
import { auth, db } from '../../firebase';

/* Button component to delete a user in the Firebase realtime db. */
class DeleteAccountButton extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  /* Calls the delete user APIs for both auth and db. */
  onDelete = (event) => {
    /* Getting currently logged in user's id. */
    const { id } = event.target;

    db.doDeleteUser(id);
    auth.doDeleteUser()

    event.preventDefault();
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      { authUser =>
        <button style={{ backgroundColor: 'red' }} id = { authUser.uid } onClick = { this.onDelete }>
          Delete Account
        </button>
      }
      </AuthUserContext.Consumer>
    );
  }
}

export default DeleteAccountButton;

export {
  DeleteAccountButton,
};
