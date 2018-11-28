import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

import '../../main.css';
import './Landing.css';

const LandingPage = () =>
  <div className="landing-container">
    <div className="title-container">
      <h1 className="title-header">TCG - Portal</h1>
      <SignInButton/>
    </div>
  </div>

class SignInButton extends Component {
  /* Take the user to the login page. */
  navigateToLogin = (event) => {
    window.location = '/signin';

    event.preventDefault();
  }

  render() {
    return (
      <button onClick = { this.navigateToLogin }>
        Welcome
      </button>
    );
  }
}

export default withRouter(LandingPage);

export {
  SignInButton,
}
