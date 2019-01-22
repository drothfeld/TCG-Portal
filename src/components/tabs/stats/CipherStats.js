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
            totalGamesPlayed: 1,
            winsAgainstRed: 0, lossesAgainstRed: 1, winsAgainstBlue: 0, lossesAgainstBlue: 1, winsAgainstWhite: 0, lossesAgainstWhite: 1, winsAgainstBlack: 0, lossesAgainstBlack: 1, winsAgainstGreen: 0, lossesAgainstGreen: 1, winsAgainstPurple: 0, lossesAgainstPurple: 1, winsAgainstYellow: 0, lossesAgainstYellow: 1
          },
          blue: {
            totalWins: 1,
            totalLosses: 1,
            totalGamesPlayed: 1,
            winsAgainstRed: 0, lossesAgainstRed: 1, winsAgainstBlue: 0, lossesAgainstBlue: 1, winsAgainstWhite: 0, lossesAgainstWhite: 1, winsAgainstBlack: 0, lossesAgainstBlack: 1, winsAgainstGreen: 0, lossesAgainstGreen: 1, winsAgainstPurple: 0, lossesAgainstPurple: 1, winsAgainstYellow: 0, lossesAgainstYellow: 1
          },
          white: {
            totalWins: 1,
            totalLosses: 1,
            totalGamesPlayed: 1,
            winsAgainstRed: 0, lossesAgainstRed: 1, winsAgainstBlue: 0, lossesAgainstBlue: 1, winsAgainstWhite: 0, lossesAgainstWhite: 1, winsAgainstBlack: 0, lossesAgainstBlack: 1, winsAgainstGreen: 0, lossesAgainstGreen: 1, winsAgainstPurple: 0, lossesAgainstPurple: 1, winsAgainstYellow: 0, lossesAgainstYellow: 1
          },
          black: {
            totalWins: 1,
            totalLosses: 1,
            totalGamesPlayed: 1,
            winsAgainstRed: 0, lossesAgainstRed: 1, winsAgainstBlue: 0, lossesAgainstBlue: 1, winsAgainstWhite: 0, lossesAgainstWhite: 1, winsAgainstBlack: 0, lossesAgainstBlack: 1, winsAgainstGreen: 0, lossesAgainstGreen: 1, winsAgainstPurple: 0, lossesAgainstPurple: 1, winsAgainstYellow: 0, lossesAgainstYellow: 1
          },
          green: {
            totalWins: 1,
            totalLosses: 1,
            totalGamesPlayed: 1,
            winsAgainstRed: 0, lossesAgainstRed: 1, winsAgainstBlue: 0, lossesAgainstBlue: 1, winsAgainstWhite: 0, lossesAgainstWhite: 1, winsAgainstBlack: 0, lossesAgainstBlack: 1, winsAgainstGreen: 0, lossesAgainstGreen: 1, winsAgainstPurple: 0, lossesAgainstPurple: 1, winsAgainstYellow: 0, lossesAgainstYellow: 1
          },
          purple: {
            totalWins: 1,
            totalLosses: 1,
            totalGamesPlayed: 1,
            winsAgainstRed: 0, lossesAgainstRed: 1, winsAgainstBlue: 0, lossesAgainstBlue: 1, winsAgainstWhite: 0, lossesAgainstWhite: 1, winsAgainstBlack: 0, lossesAgainstBlack: 1, winsAgainstGreen: 0, lossesAgainstGreen: 1, winsAgainstPurple: 0, lossesAgainstPurple: 1, winsAgainstYellow: 0, lossesAgainstYellow: 1
          },
          yellow: {
            totalWins: 1,
            totalLosses: 1,
            totalGamesPlayed: 1,
            winsAgainstRed: 0, lossesAgainstRed: 1, winsAgainstBlue: 0, lossesAgainstBlue: 1, winsAgainstWhite: 0, lossesAgainstWhite: 1, winsAgainstBlack: 0, lossesAgainstBlack: 1, winsAgainstGreen: 0, lossesAgainstGreen: 1, winsAgainstPurple: 0, lossesAgainstPurple: 1, winsAgainstYellow: 0, lossesAgainstYellow: 1
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
            <span className = "rankings-winrate">{ (stats.red.totalWins * 100 / stats.red.totalGamesPlayed).toFixed(3) }%</span>
          </div>
          <div className = "rankings-row rankings-row-even">
            <span className = "rankings-ranking"><b><div className="insignia-image-container-small"><img className="insignia-logo-image-small" src='/assets/images/Blue_(Cipher).png' alt="LOGO_IMG"></img></div></b></span>
            <span className = "rankings-wins">{stats.blue.totalWins}</span>
            <span className = "rankings-losses">{stats.blue.totalLosses}</span>
            <span className = "rankings-total">{stats.blue.totalGamesPlayed}</span>
            <span className = "rankings-winrate">{ (stats.blue.totalWins * 100 / stats.blue.totalGamesPlayed).toFixed(3) }%</span>
          </div>
          <div className = "rankings-row rankings-row-odd">
            <span className = "rankings-ranking"><b><div className="insignia-image-container-small"><img className="insignia-logo-image-small" src='/assets/images/White_(Cipher).png' alt="LOGO_IMG"></img></div></b></span>
            <span className = "rankings-wins">{stats.white.totalWins}</span>
            <span className = "rankings-losses">{stats.white.totalLosses}</span>
            <span className = "rankings-total">{stats.white.totalGamesPlayed}</span>
            <span className = "rankings-winrate">{ (stats.white.totalWins * 100 / stats.white.totalGamesPlayed).toFixed(3) }%</span>
          </div>
          <div className = "rankings-row rankings-row-even">
            <span className = "rankings-ranking"><b><div className="insignia-image-container-small"><img className="insignia-logo-image-small" src='/assets/images/Black_(Cipher).png' alt="LOGO_IMG"></img></div></b></span>
            <span className = "rankings-wins">{stats.black.totalWins}</span>
            <span className = "rankings-losses">{stats.black.totalLosses}</span>
            <span className = "rankings-total">{stats.black.totalGamesPlayed}</span>
            <span className = "rankings-winrate">{ (stats.black.totalWins * 100 / stats.black.totalGamesPlayed).toFixed(3) }%</span>
          </div>
          <div className = "rankings-row rankings-row-odd">
            <span className = "rankings-ranking"><b><div className="insignia-image-container-small"><img className="insignia-logo-image-small" src='/assets/images/Green_(Cipher).png' alt="LOGO_IMG"></img></div></b></span>
            <span className = "rankings-wins">{stats.green.totalWins}</span>
            <span className = "rankings-losses">{stats.green.totalLosses}</span>
            <span className = "rankings-total">{stats.green.totalGamesPlayed}</span>
            <span className = "rankings-winrate">{ (stats.green.totalWins * 100 / stats.green.totalGamesPlayed).toFixed(3) }%</span>
          </div>
          <div className = "rankings-row rankings-row-even">
            <span className = "rankings-ranking"><b><div className="insignia-image-container-small"><img className="insignia-logo-image-small" src='/assets/images/Purple_(Cipher).png' alt="LOGO_IMG"></img></div></b></span>
            <span className = "rankings-wins">{stats.purple.totalWins}</span>
            <span className = "rankings-losses">{stats.purple.totalLosses}</span>
            <span className = "rankings-total">{stats.purple.totalGamesPlayed}</span>
            <span className = "rankings-winrate">{ (stats.purple.totalWins * 100 / stats.purple.totalGamesPlayed).toFixed(3) }%</span>
          </div>
          <div className = "rankings-row rankings-row-odd">
            <span className = "rankings-ranking"><b><div className="insignia-image-container-small"><img className="insignia-logo-image-small" src='/assets/images/Yellow_(Cipher).png' alt="LOGO_IMG"></img></div></b></span>
            <span className = "rankings-wins">{stats.yellow.totalWins}</span>
            <span className = "rankings-losses">{stats.yellow.totalLosses}</span>
            <span className = "rankings-total">{stats.yellow.totalGamesPlayed}</span>
            <span className = "rankings-winrate">{ (stats.yellow.totalWins * 100 / stats.yellow.totalGamesPlayed).toFixed(3) }%</span>
          </div>

        </div>
      </div>
    )
  }

}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(CipherStatsPage);
