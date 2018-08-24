import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';
import '../main.css';

/* Main add card game content display. */
const AddCardGamePage = ({ history }) =>
  <div>
  </div>

/* Initialize state of form component. */
const INITIAL_STATE = {
  error: null,
};

/* The key value is used as a dynamic key
   to allocate the actual value in the local state object. */
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


/* Add card game form class declaration. */
class AddCardGameForm extends Component {
  constructor(props) {
    super(props);

    /* Setting field values to INITAL_STATE values. */
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    /* Prevents reload of the browser. */
    event.preventDefault();
  }

  render() {
    /* Values to capture state. */
    const {
      error,
    } = this.state;

    /* Each input field gets a value from local state
       and updates the value in local state with OnChange handler. */
    return (
      <form onSubmit = { this.onSubmit }>
        { error && <p className="error-text">{ error.message }</p> }
      </form>
    );
  }
}

/* Passing component to withRouter allows
   us to redirect the user. */
export default withRouter(AddCardGamePage);

export {
  AddCardGameForm,
};
