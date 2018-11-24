import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import * as cardGames from '../constants/cardGames';
import './Rankings.css';

/* Wrapped in higher order component wtih defined authorization for this component. */
class RankingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardGameFilter: cardGames.FE_CIPHER,
      textSearch: '',
    };
  }

  /* Handler for inital field validation when onBlur occurs */
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {
    const { cardGameFilter, textSearch } = this.state;

    return (
      <div>
        <div className="rankings-page-title"><h1>USER RANKINGS</h1></div>
        <hr/>

        <div className = "rankings-toolbar">

          <div className="rankings-select-container">
            <select className="rankings-game-select"
          defaultValue={-1} onChange = { event => this.setState(byPropKey('cardGameFilter', event.target.value)) } onBlur = { this.handleBlur('cardGame') }>
              <option value='1' disabled>Choose Card Game:</option>
              { Object.keys(cardGames.CARD_GAMES).map((name,index) => <option key={index} value={cardGames.CARD_GAMES[index]}>{cardGames.CARD_GAMES[index]}</option>) }
            </select>
          </div>

        </div>
        <h2>{ cardGameFilter }</h2>
        <RankingsUserList cardGameFilter = { cardGameFilter }/>
      </div>
    );
  }
}

/* The key value is used as a dynamic key
   to allocate the actual value in the local state object. */
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class RankingsUserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      cardGameFilter: props.cardGameFilter,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  render() {
    const { cardGameFilter } = this.props;
    const { users } = this.state;

    return (
      <div>
        <div className = "rankings-row rankings-header"><b>
          <span className = "rankings-ranking">RANK</span>
          <span className = "rankings-user">USER</span>
          <span className = "rankings-wins">WINS</span>
          <span className = "rankings-losses">LOSSES</span>
          <span className = "rankings-total">TOTAL GAMES</span>
          <span className = "rankings-winrate">WINRATE</span></b>
        </div>
        <div hidden = { cardGameFilter !== cardGames.FE_CIPHER }>{ !!users && <FireEmblemCipherUserRanks users = {users}/> }</div>
        <div hidden = { cardGameFilter !== cardGames.MAGIC }>{ !!users && <MagicTheGatheringUserRanks users = {users}/> }</div>
        <div hidden = { cardGameFilter !== cardGames.POKEMON }>{ !!users && <PokemonUserRanks users = {users}/> }</div>
        <div hidden = { cardGameFilter !== cardGames.YUGIOH }>{ !!users && <YuGiOhUserRanks users = {users}/> }</div>
      </div>
    );
  }
}

/* Since returned users are objects, not a list, the users
   must be mapped over the keys in order to display them. */
const FireEmblemCipherUserRanks = ({ users }) =>
  <div>
    { Object.keys(users).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (users[key].playerStats.fireEmblemCipher.totalWins * users[key].playerStats.fireEmblemCipher.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ users[key].username }</span>
        <span className = "rankings-wins">{ users[key].playerStats.fireEmblemCipher.totalWins }</span>
        <span className = "rankings-losses">{ users[key].playerStats.fireEmblemCipher.totalLosses }</span>
        <span className = "rankings-total">{ users[key].playerStats.fireEmblemCipher.totalGames }</span>
        <span className = "rankings-winrate">{ users[key].playerStats.fireEmblemCipher.overallWinRate.toFixed(3) * 100 }%</span>
      </div>
    )}
  </div>

const MagicTheGatheringUserRanks = ({ users }) =>
  <div>
    { Object.keys(users).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (users[key].playerStats.magicTheGathering.totalWins * users[key].playerStats.magicTheGathering.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ users[key].username }</span>
        <span className = "rankings-wins">{ users[key].playerStats.magicTheGathering.totalWins }</span>
        <span className = "rankings-losses">{ users[key].playerStats.magicTheGathering.totalLosses }</span>
        <span className = "rankings-total">{ users[key].playerStats.magicTheGathering.totalGames }</span>
        <span className = "rankings-winrate">{ users[key].playerStats.magicTheGathering.overallWinRate.toFixed(3) * 100 }%</span>
      </div>
    )}
  </div>

const PokemonUserRanks = ({ users }) =>
  <div>
    { Object.keys(users).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (users[key].playerStats.pokemon.totalWins * users[key].playerStats.pokemon.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ users[key].username }</span>
        <span className = "rankings-wins">{ users[key].playerStats.pokemon.totalWins }</span>
        <span className = "rankings-losses">{ users[key].playerStats.pokemon.totalLosses }</span>
        <span className = "rankings-total">{ users[key].playerStats.pokemon.totalGames }</span>
        <span className = "rankings-winrate">{ users[key].playerStats.pokemon.overallWinRate.toFixed(3) * 100 }%</span>
      </div>
    )}
  </div>

const YuGiOhUserRanks = ({ users }) =>
  <div>
    { Object.keys(users).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (users[key].playerStats.yugioh.totalWins * users[key].playerStats.yugioh.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ users[key].username }</span>
        <span className = "rankings-wins">{ users[key].playerStats.yugioh.totalWins }</span>
        <span className = "rankings-losses">{ users[key].playerStats.yugioh.totalLosses }</span>
        <span className = "rankings-total">{ users[key].playerStats.yugioh.totalGames }</span>
        <span className = "rankings-winrate">{ users[key].playerStats.yugioh.overallWinRate.toFixed(3) * 100 }%</span>
      </div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(RankingsPage);
