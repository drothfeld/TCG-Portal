import React from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

/* Implementing framework around the higher order component. */
const withAuthentication = (Component) => {
  class withAuthentication extends React.Component {

    /* Constructor */
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    /* Helper firebase function that gets a function
    as input and this function has access to the authenticated
    user object. This passed function is called every time something
    changes for the authenticated user: Sign Up, Sign In, Sign Out. */
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    /* Renderer */
    render() {
      const { authUser } = this.state;
      return (
        /* Mechanism to pass down the authenticated user object
        to the other components. */
        <AuthUserContext.Provider value = { authUser }>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return withAuthentication;
}

export default withAuthentication;
