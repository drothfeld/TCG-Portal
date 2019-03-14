import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

import '../../main.css';
import './Landing.css';

const LandingPage = () =>
  <div className="landing-container">
    <div className="title-container">
      <h1 className="landing-title-header">TCG - Portal</h1>
      <SignInButton/>
    </div>
  </div>

class SignInButton extends Component {
  /* Take the user to the login page. */
  navigateToLogin = (event) => {
    window.location = '/signin';

    event.preventDefault();
  }

  navigateToSignUp = (event) => {
    window.location = '/signup';

    event.preventDefault();
  }

  render() {
    return (
      <div className="landing-buttons-container">
        <div className="landing-button-container">
          <button className="landing-button" onClick = { this.navigateToLogin }>
            Login
          </button>
        </div>

        <div className="landing-button-container">
          <button className="landing-button" onClick = { this.navigateToSignUp }>
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);

export {
  SignInButton,
}
