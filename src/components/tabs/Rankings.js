import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withAuthorization from '../auth/withAuthorization';
import { db } from '../../firebase';
import * as cardGames from '../../constants/cardGames';
import * as routes from '../../constants/routes';
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

  getCardGameImageLogoPath(cardGameFilter) {
    if (cardGameFilter === cardGames.FE_CIPHER) {
      return '/assets/images/fireEmblemCipher_logo.png';
    } else if (cardGameFilter === cardGames.MAGIC) {
      return '/assets/images/magicTheGathering_logo.png';
    } else if (cardGameFilter === cardGames.POKEMON) {
      return '/assets/images/pokemon_logo.png';
    } else if (cardGameFilter === cardGames.YUGIOH) {
      return '/assets/images/yugioh_logo.png';
    }
  }

  render() {
    const { cardGameFilter, textSearch } = this.state;
    let props = {
      cardGameFilter,
      textSearch
    }
    let img_logo_path = this.getCardGameImageLogoPath(cardGameFilter);

    return (
      <div>
        <div className="logo-image-container"><img className="card-game-logo-image" src={window.location.origin + img_logo_path} alt="LOGO_IMG"></img></div>

        <div className = "rankings-toolbar">

          <div className = "rankings-text-search-container">
            <input className = "rankings-text-search"
              style={{ backgroundColor: 'white'}}
              value = { textSearch }
              onChange = { event => this.setState(byPropKey('textSearch', event.target.value))}
              onBlur = { this.handleBlur('textSearch') }
              type = "text"
              placeholder = "Search for Player:"
            />
          </div>

          <div className="rankings-select-container">
            <select className="rankings-game-select"
          defaultValue={-1} onChange = { event => this.setState(byPropKey('cardGameFilter', event.target.value)) } onBlur = { this.handleBlur('cardGame') }>
              <option value='1' disabled>Choose Card Game:</option>
              { Object.keys(cardGames.CARD_GAMES).map((name,index) => <option key={index} value={cardGames.CARD_GAMES[index]}>{cardGames.CARD_GAMES[index]}</option>) }
            </select>
          </div>

          <div className="rankings-select-container">
            <div hidden={ cardGameFilter !== cardGames.FE_CIPHER } className="rankings-stat-link"><Link className="stat-link-text" to={(routes.STATS + routes.CIPHER)}>Game Statistics</Link></div>
            <div hidden={ cardGameFilter !== cardGames.MAGIC } className="rankings-stat-link"><Link className="stat-link-text" to={(routes.STATS + routes.MAGIC)}>Game Statistics</Link></div>
            <div hidden={ cardGameFilter !== cardGames.POKEMON } className="rankings-stat-link"><Link className="stat-link-text" to={(routes.STATS + routes.POKEMON)}>Game Statistics</Link></div>
            <div hidden={ cardGameFilter !== cardGames.YUGIOH } className="rankings-stat-link"><Link className="stat-link-text" to={(routes.STATS + routes.YUGIOH)}>Game Statistics</Link></div>
          </div>

        </div>
        <RankingsUserList { ...props }/>
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
      textSearch: props.textSearch,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  filterUsers(users, textFilter) {
    var filteredUsersList = [];
    for (var key in users) {
      var obj = users[key];
      if (obj.username.toLowerCase().includes(textFilter.toLowerCase())) {
        filteredUsersList.push(obj);
      }
    }
    return filteredUsersList;
  }

  sortByRank(users, cardGameFilter) {
    if (cardGameFilter === cardGames.FE_CIPHER) {
      return users.sort((a,b) =>
      ((a.playerStats.fireEmblemCipher.totalWins * a.playerStats.fireEmblemCipher.overallWinRate * 100) < (b.playerStats.fireEmblemCipher.totalWins * b.playerStats.fireEmblemCipher.overallWinRate * 100)) ? 1 :
      (((b.playerStats.fireEmblemCipher.totalWins * b.playerStats.fireEmblemCipher.overallWinRate * 100) < (a.playerStats.fireEmblemCipher.totalWins * a.playerStats.fireEmblemCipher.overallWinRate * 100)) ? -1 : 0));
    }
    if (cardGameFilter === cardGames.MAGIC) {
      return users.sort((a,b) =>
      ((a.playerStats.magicTheGathering.totalWins * a.playerStats.magicTheGathering.overallWinRate * 100) < (b.playerStats.magicTheGathering.totalWins * b.playerStats.magicTheGathering.overallWinRate * 100)) ? 1 :
      (((b.playerStats.magicTheGathering.totalWins * b.playerStats.magicTheGathering.overallWinRate * 100) < (a.playerStats.magicTheGathering.totalWins * a.playerStats.magicTheGathering.overallWinRate * 100)) ? -1 : 0));
    }
    if (cardGameFilter === cardGames.POKEMON) {
      return users.sort((a,b) =>
      ((a.playerStats.pokemon.totalWins * a.playerStats.pokemon.overallWinRate * 100) < (b.playerStats.pokemon.totalWins * b.playerStats.pokemon.overallWinRate * 100)) ? 1 :
      (((b.playerStats.pokemon.totalWins * b.playerStats.pokemon.overallWinRate * 100) < (a.playerStats.pokemon.totalWins * a.playerStats.pokemon.overallWinRate * 100)) ? -1 : 0));
    }
    if (cardGameFilter === cardGames.YUGIOH) {
      return users.sort((a,b) =>
      ((a.playerStats.yugioh.totalWins * a.playerStats.yugioh.overallWinRate * 100) < (b.playerStats.yugioh.totalWins * b.playerStats.yugioh.overallWinRate * 100)) ? 1 :
      (((b.playerStats.yugioh.totalWins * b.playerStats.yugioh.overallWinRate * 100) < (a.playerStats.yugioh.totalWins * a.playerStats.yugioh.overallWinRate * 100)) ? -1 : 0));
    }
  }

  render() {
    let cardGameFilter = this.props.cardGameFilter;
    let textSearch = this.props.textSearch;
    const { users } = this.state;
    const filteredUsers = this.sortByRank(this.filterUsers(users, textSearch), cardGameFilter);

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
        <div hidden = { cardGameFilter !== cardGames.FE_CIPHER }>{ !!filteredUsers && <FireEmblemCipherUserRanks filteredUsers = {filteredUsers}/> }</div>
        <div hidden = { cardGameFilter !== cardGames.MAGIC }>{ !!filteredUsers && <MagicTheGatheringUserRanks filteredUsers = {filteredUsers}/> }</div>
        <div hidden = { cardGameFilter !== cardGames.POKEMON }>{ !!filteredUsers && <PokemonUserRanks filteredUsers = {filteredUsers}/> }</div>
        <div hidden = { cardGameFilter !== cardGames.YUGIOH }>{ !!filteredUsers && <YuGiOhUserRanks filteredUsers = {filteredUsers}/> }</div>
      </div>
    );
  }
}

/* Since returned users are objects, not a list, the users
   must be mapped over the keys in order to display them. */
const FireEmblemCipherUserRanks = ({ filteredUsers }) =>
  <div>
    { Object.keys(filteredUsers).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (filteredUsers[key].playerStats.fireEmblemCipher.totalWins * filteredUsers[key].playerStats.fireEmblemCipher.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ filteredUsers[key].username }</span>
        <span className = "rankings-wins">{ filteredUsers[key].playerStats.fireEmblemCipher.totalWins }</span>
        <span className = "rankings-losses">{ filteredUsers[key].playerStats.fireEmblemCipher.totalLosses }</span>
        <span className = "rankings-total">{ filteredUsers[key].playerStats.fireEmblemCipher.totalGames }</span>
        <span className = "rankings-winrate">{ (filteredUsers[key].playerStats.fireEmblemCipher.overallWinRate * 100).toFixed(3) }%</span>
      </div>
    )}
  </div>

const MagicTheGatheringUserRanks = ({ filteredUsers }) =>
  <div>
    { Object.keys(filteredUsers).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (filteredUsers[key].playerStats.magicTheGathering.totalWins * filteredUsers[key].playerStats.magicTheGathering.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ filteredUsers[key].username }</span>
        <span className = "rankings-wins">{ filteredUsers[key].playerStats.magicTheGathering.totalWins }</span>
        <span className = "rankings-losses">{ filteredUsers[key].playerStats.magicTheGathering.totalLosses }</span>
        <span className = "rankings-total">{ filteredUsers[key].playerStats.magicTheGathering.totalGames }</span>
        <span className = "rankings-winrate">{ (filteredUsers[key].playerStats.magicTheGathering.overallWinRate * 100).toFixed(3) }%</span>
      </div>
    )}
  </div>

const PokemonUserRanks = ({ filteredUsers }) =>
  <div>
    { Object.keys(filteredUsers).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (filteredUsers[key].playerStats.pokemon.totalWins * filteredUsers[key].playerStats.pokemon.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ filteredUsers[key].username }</span>
        <span className = "rankings-wins">{ filteredUsers[key].playerStats.pokemon.totalWins }</span>
        <span className = "rankings-losses">{ filteredUsers[key].playerStats.pokemon.totalLosses }</span>
        <span className = "rankings-total">{ filteredUsers[key].playerStats.pokemon.totalGames }</span>
        <span className = "rankings-winrate">{ (filteredUsers[key].playerStats.pokemon.overallWinRate * 100).toFixed(3) }%</span>
      </div>
    )}
  </div>

const YuGiOhUserRanks = ({ filteredUsers }) =>
  <div>
    { Object.keys(filteredUsers).map(key =>
      <div className = {"rankings-row " + ( (((key + 1) % 2) === 1) ? 'rankings-row-odd' : 'rankings-row-even')} key = { key }>
        <span className = "rankings-ranking"><b>{ (filteredUsers[key].playerStats.yugioh.totalWins * filteredUsers[key].playerStats.yugioh.overallWinRate * 100).toFixed(0) }</b></span>
        <span className = "rankings-user">{ filteredUsers[key].username }</span>
        <span className = "rankings-wins">{ filteredUsers[key].playerStats.yugioh.totalWins }</span>
        <span className = "rankings-losses">{ filteredUsers[key].playerStats.yugioh.totalLosses }</span>
        <span className = "rankings-total">{ filteredUsers[key].playerStats.yugioh.totalGames }</span>
        <span className = "rankings-winrate">{ (filteredUsers[key].playerStats.yugioh.overallWinRate * 100).toFixed(3) }%</span>
      </div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(RankingsPage);
