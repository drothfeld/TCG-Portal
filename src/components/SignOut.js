import React from 'react';

import { auth } from '../firebase';
import './SignOut.css';

const SignOutButton = () =>
  <div className="sign-out-button" type = "button" onClick = { auth.doSignOut }>
    Sign Out
  </div>

export default SignOutButton;
