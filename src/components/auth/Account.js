import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import { DeleteAccountButton } from './DeleteAccount';
import withAuthorization from './withAuthorization';

import '../../main.css';
import './Account.css';

/* Page for user to manage their account.
Wrapped in higher order component wtih defined authorization for this component. */
const AccountPage = () =>
  <AuthUserContext.Consumer>
    { authUser =>
      <div>
        <h1><div className="account-title-text">{ authUser.email }</div></h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
        <div className="delete-account-button"><DeleteAccountButton /></div>
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
