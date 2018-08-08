import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

/* Page for user to manage their account.
Wrapped in higher order component wtih defined authorization for this component. */
const AccountPage = () =>
  <AuthUserContext.Consumer>
    { authUser =>
      <div>
        <h1>Account: { authUser.email }</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
