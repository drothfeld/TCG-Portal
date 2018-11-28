import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import AdminPage from './Admin';
import AddCardGamePage from './AddCardGame';
import RankingsPage from './Rankings';
import StatsPage from './Stats';
import CipherStatsPage from './CipherStats';
import MagicStatsPage from './MagicStats';
import PokemonStatsPage from './PokemonStats';
import YugiohStatsPage from './YugiohStats';

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication';

const App = () =>
  <Router>
    <div>
      <Navigation />
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.ADMIN} component={() => <AdminPage />} />
      <Route exact path={routes.ADD_CARD_GAME} component={() => <AddCardGamePage />} />
      <Route exact path={routes.RANKINGS} component={() => <RankingsPage />} />
      <Route exact path={routes.STATS} component={() => <StatsPage />} />
      <Route exact path={routes.STATS + routes.CIPHER} component={() => <CipherStatsPage />} />
      <Route exact path={routes.STATS + routes.MAGIC} component={() => <MagicStatsPage />} />
      <Route exact path={routes.STATS + routes.POKEMON} component={() => <PokemonStatsPage />} />
      <Route exact path={routes.STATS + routes.YUGIOH} component={() => <YugiohStatsPage />} />
    </div>
  </Router>

/* Wrapping App component up in a session handling higher order component. */
export default withAuthentication(App);
