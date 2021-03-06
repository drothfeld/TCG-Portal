import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './nav/Navigation';
import LandingPage from './nav/Landing';
import SignUpPage from './auth/SignUp';
import SignInPage from './auth/SignIn';
import PasswordForgetPage from './auth/PasswordForget';
import HomePage from './tabs/Home';
import AccountPage from './auth/Account';
import AdminPage from './auth/Admin';
import AddCardGamePage from './tabs/AddCardGame';
import RankingsPage from './tabs/Rankings';
import StatsPage from './tabs/stats/Stats';
import CipherStatsPage from './tabs/stats/CipherStats';
import MagicStatsPage from './tabs/stats/MagicStats';
import PokemonStatsPage from './tabs/stats/PokemonStats';
import YugiohStatsPage from './tabs/stats/YugiohStats';

import * as routes from '../constants/routes';

import withAuthentication from './auth/withAuthentication';

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
