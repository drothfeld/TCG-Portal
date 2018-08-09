import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

/* Main sign up content display. */
const SignUpPage = ({ history }) =>
  <div>
    <h1>Sign Up Page</h1>
    <SignUpForm history = { history }/>
  </div>

/* Initialize state of component. */
const INITAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  error: null,
};

/* The key value is used as a dynamic key
   to allocate the actual value in the local state object. */
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

/* Sign up form class declaration.
   This is the only React ES6 class
   component in SignUp.js in order
   to manage the form state in React's
   local state. */
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    /* Setting field values to INITAL_STATE values. */
    this.state = { ...INITAL_STATE };
  }

  onSubmit = (event) => {
    /* Values to pass to firebase API. */
    const {
      username,
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    /* Attempt to create new user in Firebase. */
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {

        /* Create new user in the realtime Firebase database. */
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...INITAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

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
      username,
      email,
      password,
      passwordConfirmation,
      error,
    } = this.state;

    /* Defining validation for submit button. */
    const isInvalid =
      password !== passwordConfirmation ||
      password === '' ||
      email === '' ||
      username === '';

    /* Each input field gets a value from local state
       and updates the value in local state with OnChange handler. */
    return (
      <form onSubmit = { this.onSubmit }>
        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordConfirmation}
          onChange={event => this.setState(byPropKey('passwordConfirmation', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled= {isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

/* Link to sign up a new account. */
const SignUpLink = () =>
  <p>
    Dont have an account?
    {' '}
    <Link to = { routes.SIGN_UP }>Sign Up</Link>
  </p>

/* Passing component to withRouter allows
   us to redirect the user. */
export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
