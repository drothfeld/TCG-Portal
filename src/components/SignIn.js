import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

/* Main sign in content display. */
const SignInPage = ({ history }) =>
  <div>
    <h1>Sign In Page</h1>
    <SignInForm history = { history }/>
    {/* Display sign up link to make a new account. */}
    <SignUpLink/>
  </div>

/* Initialize state of component. */
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

/* The key value is used as a dynamic key
   to allocate the actual value in the local state object. */
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


/* Sign in form class declaration. */
class SignInForm extends Component {
  constructor(props) {
    super(props);

    /* Setting field values to INITAL_STATE values. */
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    /* Values to pass to firebase API. */
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    /* Attempt to sign in user through Firebase. */
    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    /* Prevents reload of the browser. */
    event.preventDefault();
  }

  render() {
    /* Values to capture state. */
    const {
      email,
      password,
      error,
    } = this.state;

    /* Defining validation for log in button. */
    const isInvalid =
      password === '' ||
      email === '';

    /* Each input field gets a value from local state
       and updates the value in local state with OnChange handler. */
    return (
      <form onSubmit = { this.onSubmit }>
        <input
          value = { email }
          onChange = { event => this.setState(byPropKey('email', event.target.value))}
          type = "text"
          placeholder = "Email Address"
        />
        <input
          value = { password }
          onChange = { event => this.setState(byPropKey('password', event.target.value))}
          type = "password"
          placeholder = "Password"
        />
        <button disabled = { isInvalid } type = "submit">
          Sign In
        </button>

        { error && <p> { error.message }</p> }
      </form>
    );
  }
}

/* Passing component to withRouter allows
   us to redirect the user. */
export default withRouter(SignInPage);

export {
  SignInForm,
};
