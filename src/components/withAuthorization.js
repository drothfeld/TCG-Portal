import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
  class withAuthorization extends React.Component {

    /* Uses the Firebase listener to trigger callback function
    in case authenticated user object changes. */
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    /* Renders either the password component or nothing. */
    render() {
      return (
        <AuthUserContext.Consumer>
          { authUser => authUser ? <Component/> : null }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(withAuthorization);
}

export default withAuthorization;
