import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import '../main.css';
import './PasswordForget.css';

/* Main forgot password content display. */
const PasswordForgetPage = () =>
  <div>
    <h1 className="component-title-text">Forgot Password</h1>
    <PasswordForgetForm />
  </div>

/* The key value is used as a dynamic key
   to allocate the actual value in the local state object. */
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

/* Initialize state of form component. */
const INITIAL_STATE = {
  email: '',
  error: null,
};

/* Setting forgot password form to initial state values. */
class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  /* Calls the forgot password firebase API on form submission
     using email address as only parameter. */
  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    /* Checking for valid email, cannot be blank. */
    const isInvalid = email === '';

    return (
      <form onSubmit = { this.onSubmit }>
        <input
          value = { this.state.email }
          onChange = { event => this.setState(byPropKey('email', event.target.value))}
          type = "text"
          placeholder = "Email Address"
        />
        <button disabled = { isInvalid } type = "submit">
          Reset My Password
        </button>

        { error && <p className="error-text"> { error.message } </p> }
      </form>
    );
  }
}

/* Forgot password link object. */
const PasswordForgetLink = () =>
  <p>
    <Link to = "/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
