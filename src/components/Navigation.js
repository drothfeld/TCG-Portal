import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import '../main.css';
import './Navigation.css';

/* Determine if user is logged in and assign navigation to show. */
const Navigation = () =>
  /* Using 'Render Props' pattern to gain access to the value which
  was passed before to the Provider pattern. */
  <AuthUserContext.Consumer>
    { authUser => authUser
      ? <NavigationAuth/>
      : <NavigationNonAuth/>
    }
  </AuthUserContext.Consumer>

/* Navigation to show if user is logged in. */
const NavigationAuth = () =>
  <ul>
    <li><Link style={{ textDecoration: 'none', color: 'white', padding: 10, fontSize: 15 }} to={routes.HOME}>Home</Link></li>
    <li><Link style={{ textDecoration: 'none', color: 'white', padding: 10, fontSize: 15 }} to={routes.ACCOUNT}>Account</Link></li>
    <li><Link style={{ textDecoration: 'none', color: 'white', padding: 10, fontSize: 15 }} to={routes.ADD_CARD_GAME}>Add</Link></li>
    <li><Link style={{ textDecoration: 'none', color: 'white', padding: 10, fontSize: 15 }} to={routes.RANKINGS}>Ranks</Link></li>
    <li style={{ float: 'right' }}><SignOutButton/></li>
  </ul>

/* Navigation to show if user is not logged in. */
const NavigationNonAuth = () =>
  <div className="banner-container">
  </div>

export default Navigation;
