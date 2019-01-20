import React, { Component } from 'react';

import withAuthorization from '../../auth/withAuthorization';
import { db } from '../../../firebase';
import * as cardGames from '../../../constants/cardGames';
import './Stats.css';

class CipherStatsPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <div className="logo-image-container"><img className="card-game-logo-image" src='/assets/images/fireEmblemCipher_logo.png' alt="LOGO_IMG"></img></div>
        <CipherGameStatistics/>
      </div>
    );
  }
}

class CipherGameStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: null,
      stats: {
          red: {
            totalWins: 1,
            totalLosses: 1,
            totalGamesPlayed: 1
          }
      }
    };
  }

  componentDidMount() {
    db.onceGetRecordedGames().then(snapshot =>
      this.setState({ games: snapshot.val() })
    );

    db.getCIPHERGameStats().then(snapshot =>
      this.setState({ stats: snapshot.val() })
    );
  }

  updateCipherGameStats(games) {
    var totalGamesPlayed = 0;
    // red, blue, white, black, green, purple, yellow, colorless
    var colorSpecificTotalGamesPlayed = [0, 0, 0, 0, 0, 0, 0, 0]
    var colorSpecificTotalWinsLosses = [ [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0] ]

    for (var key in games) {
      var game = games[key];
      if (game.cardGame === cardGames.FE_CIPHER) {
        // console.log(game);

        // Collect total games played statistics
        totalGamesPlayed++;
        if (game.winningColor === "Sword of Light (Red)") { colorSpecificTotalGamesPlayed[0] ++; colorSpecificTotalWinsLosses[0][0] ++; } if (game.losingColors === "Sword of Light (Red)") { colorSpecificTotalGamesPlayed[0] ++; colorSpecificTotalWinsLosses[0][1] ++; }
        if (game.winningColor === "Mark of Naga (Blue)") { colorSpecificTotalGamesPlayed[1] ++; colorSpecificTotalWinsLosses[1][0] ++; } if (game.losingColors === "Mark of Naga (Blue)") { colorSpecificTotalGamesPlayed[1] ++; colorSpecificTotalWinsLosses[1][1] ++; }
        if (game.winningColor === "Hoshido (White)") { colorSpecificTotalGamesPlayed[2] ++; colorSpecificTotalWinsLosses[2][0] ++; } if (game.losingColors === "Hoshido (White)") { colorSpecificTotalGamesPlayed[2] ++; colorSpecificTotalWinsLosses[2][1] ++; }
        if (game.winningColor === "Nohr (Black)") { colorSpecificTotalGamesPlayed[3] ++; colorSpecificTotalWinsLosses[3][0] ++; } if (game.losingColors === "Nohr (Black)") { colorSpecificTotalGamesPlayed[3] ++; colorSpecificTotalWinsLosses[3][1] ++; }
        if (game.winningColor === "Medallion (Green)") { colorSpecificTotalGamesPlayed[4] ++; colorSpecificTotalWinsLosses[4][0] ++; } if (game.losingColors === "Medallion (Green)") { colorSpecificTotalGamesPlayed[4] ++; colorSpecificTotalWinsLosses[4][1] ++; }
        if (game.winningColor === "Divine Artifacts (Purple)") { colorSpecificTotalGamesPlayed[5] ++; colorSpecificTotalWinsLosses[5][0] ++; } if (game.losingColors === "Divine Artifacts (Purple)") { colorSpecificTotalGamesPlayed[5] ++; colorSpecificTotalWinsLosses[5][1] ++; }
        if (game.winningColor === "Holy War Flag (Yellow)") { colorSpecificTotalGamesPlayed[6] ++; colorSpecificTotalWinsLosses[6][0] ++; } if (game.losingColors === "Holy War Flag (Yellow)") { colorSpecificTotalGamesPlayed[6] ++; colorSpecificTotalWinsLosses[6][1] ++; }
      }

    }
    db.updateGeneralCIPHERGameStats(totalGamesPlayed, "NULL", 0, "NULL", 0, 0, 0.50)
    db.updateCIPHERGameStats("red", colorSpecificTotalGamesPlayed[0], colorSpecificTotalWinsLosses[0][0], colorSpecificTotalWinsLosses[0][1], "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("blue", colorSpecificTotalGamesPlayed[1], colorSpecificTotalWinsLosses[1][0], colorSpecificTotalWinsLosses[1][1], "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("white", colorSpecificTotalGamesPlayed[2], colorSpecificTotalWinsLosses[2][0], colorSpecificTotalWinsLosses[2][1], "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("black", colorSpecificTotalGamesPlayed[3], colorSpecificTotalWinsLosses[3][0], colorSpecificTotalWinsLosses[3][1], "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("green", colorSpecificTotalGamesPlayed[4], colorSpecificTotalWinsLosses[4][0], colorSpecificTotalWinsLosses[4][1], "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("purple", colorSpecificTotalGamesPlayed[5], colorSpecificTotalWinsLosses[5][0], colorSpecificTotalWinsLosses[5][1], "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("yellow", colorSpecificTotalGamesPlayed[6], colorSpecificTotalWinsLosses[6][0], colorSpecificTotalWinsLosses[6][1], "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  render() {
    const { games, stats } = this.state;
    // Need to add a refresh/sync/update button to call: this.updateCipherGameStats(games);
    //this.updateCipherGameStats(games);

    return (
      <div>
        <div>
          <div className = "rankings-row rankings-header"><b>
            <span className = "rankings-ranking">INSIGNIA</span>
            <span className = "rankings-wins">WINS</span>
            <span className = "rankings-losses">LOSSES</span>
            <span className = "rankings-total">TOTAL GAMES</span>
            <span className = "rankings-winrate">WINRATE</span></b>
          </div>
          <div className = "rankings-row rankings-row-odd">
            <span className = "rankings-ranking"><b><div className="insignia-image-container-small"><img className="insignia-logo-image-small" src='/assets/images/Red_(Cipher).png' alt="LOGO_IMG"></img></div></b></span>
            <span className = "rankings-wins">{stats.red.totalWins}</span>
            <span className = "rankings-losses">{stats.red.totalLosses}</span>
            <span className = "rankings-total">{stats.red.totalGamesPlayed}</span>
            <span className = "rankings-winrate">{ (stats.red.totalWins / stats.red.totalGamesPlayed).toFixed(3) * 100 }%</span>
          </div>

        </div>
      </div>
    )
  }

}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(CipherStatsPage);
