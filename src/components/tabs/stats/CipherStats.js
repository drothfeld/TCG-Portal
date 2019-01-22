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
    var redMatchupWinsLosses = [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]
    var blueMatchupWinsLosses = [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]
    var whiteMatchupWinsLosses = [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]
    var blackMatchupWinsLosses = [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]
    var greenMatchupWinsLosses = [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]
    var purpleMatchupWinsLosses = [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]
    var yellowMatchupWinsLosses = [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]

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

        // Collect red game statistics - 00 and 01
        if (game.winningColor === "Sword of Light (Red)" && game.losingColors === "Mark of Naga (Blue)") { redMatchupWinsLosses[1][0] ++;} if (game.losingColors === "Sword of Light (Red)" && game.winningColor === "Mark of Naga (Blue)") { redMatchupWinsLosses[1][1] ++;}
        if (game.winningColor === "Sword of Light (Red)" && game.losingColors === "Hoshido (White)") { redMatchupWinsLosses[2][0] ++;} if (game.losingColors === "Sword of Light (Red)" && game.winningColor === "Hoshido (White)") { redMatchupWinsLosses[2][1] ++;}
        if (game.winningColor === "Sword of Light (Red)" && game.losingColors === "Nohr (Black)") { redMatchupWinsLosses[3][0] ++;} if (game.losingColors === "Sword of Light (Red)" && game.winningColor === "Nohr (Black)") { redMatchupWinsLosses[3][1] ++;}
        if (game.winningColor === "Sword of Light (Red)" && game.losingColors === "Medallion (Green)") { redMatchupWinsLosses[4][0] ++;} if (game.losingColors === "Sword of Light (Red)" && game.winningColor === "Medallion (Green)") { redMatchupWinsLosses[4][1] ++;}
        if (game.winningColor === "Sword of Light (Red)" && game.losingColors === "Divine Artifacts (Purple)") { redMatchupWinsLosses[5][0] ++;} if (game.losingColors === "Sword of Light (Red)" && game.winningColor === "Divine Artifacts (Purple)") { redMatchupWinsLosses[5][1] ++;}
        if (game.winningColor === "Sword of Light (Red)" && game.losingColors === "Holy War Flag (Yellow)") { redMatchupWinsLosses[6][0] ++;} if (game.losingColors === "Sword of Light (Red)" && game.winningColor === "Holy War Flag (Yellow)") { redMatchupWinsLosses[6][1] ++;}

        // Collect blue game statistics - 10 and 11
        if (game.winningColor === "Mark of Naga (Blue)" && game.losingColors === "Sword of Light (Red)") { blueMatchupWinsLosses[0][0] ++;} if (game.losingColors === "Mark of Naga (Blue)" && game.winningColor === "Sword of Light (Red)") { blueMatchupWinsLosses[0][1] ++;}
        if (game.winningColor === "Mark of Naga (Blue)" && game.losingColors === "Hoshido (White)") { blueMatchupWinsLosses[2][0] ++;} if (game.losingColors === "Mark of Naga (Blue)" && game.winningColor === "Hoshido (White)") { blueMatchupWinsLosses[2][1] ++;}
        if (game.winningColor === "Mark of Naga (Blue)" && game.losingColors === "Nohr (Black)") { blueMatchupWinsLosses[3][0] ++;} if (game.losingColors === "Mark of Naga (Blue)" && game.winningColor === "Nohr (Black)") { blueMatchupWinsLosses[3][1] ++;}
        if (game.winningColor === "Mark of Naga (Blue)" && game.losingColors === "Medallion (Green)") { blueMatchupWinsLosses[4][0] ++;} if (game.losingColors === "Mark of Naga (Blue)" && game.winningColor === "Medallion (Green)") { blueMatchupWinsLosses[4][1] ++;}
        if (game.winningColor === "Mark of Naga (Blue)" && game.losingColors === "Divine Artifacts (Purple)") { blueMatchupWinsLosses[5][0] ++;} if (game.losingColors === "Mark of Naga (Blue)" && game.winningColor === "Divine Artifacts (Purple)") { blueMatchupWinsLosses[5][1] ++;}
        if (game.winningColor === "Mark of Naga (Blue)" && game.losingColors === "Holy War Flag (Yellow)") { blueMatchupWinsLosses[6][0] ++;} if (game.losingColors === "Mark of Naga (Blue)" && game.winningColor === "Holy War Flag (Yellow)") { blueMatchupWinsLosses[6][1] ++;}

        // Collect white game statistics - 20 and 21
        if (game.winningColor === "Hoshido (White)" && game.losingColors === "Sword of Light (Red)") { whiteMatchupWinsLosses[0][0] ++;} if (game.losingColors === "Hoshido (White)" && game.winningColor === "Sword of Light (Red)") { whiteMatchupWinsLosses[0][1] ++;}
        if (game.winningColor === "Hoshido (White)" && game.losingColors === "Mark of Naga (Blue)") { whiteMatchupWinsLosses[1][0] ++;} if (game.losingColors === "Hoshido (White)" && game.winningColor === "Mark of Naga (Blue)") { whiteMatchupWinsLosses[1][1] ++;}
        if (game.winningColor === "Hoshido (White)" && game.losingColors === "Nohr (Black)") { whiteMatchupWinsLosses[3][0] ++;} if (game.losingColors === "Hoshido (White)" && game.winningColor === "Nohr (Black)") { whiteMatchupWinsLosses[3][1] ++;}
        if (game.winningColor === "Hoshido (White)" && game.losingColors === "Medallion (Green)") { whiteMatchupWinsLosses[4][0] ++;} if (game.losingColors === "Hoshido (White)" && game.winningColor === "Medallion (Green)") { whiteMatchupWinsLosses[4][1] ++;}
        if (game.winningColor === "Hoshido (White)" && game.losingColors === "Divine Artifacts (Purple)") { whiteMatchupWinsLosses[5][0] ++;} if (game.losingColors === "Hoshido (White)" && game.winningColor === "Divine Artifacts (Purple)") { whiteMatchupWinsLosses[5][1] ++;}
        if (game.winningColor === "Hoshido (White)" && game.losingColors === "Holy War Flag (Yellow)") { whiteMatchupWinsLosses[6][0] ++;} if (game.losingColors === "Hoshido (White)" && game.winningColor === "Holy War Flag (Yellow)") { whiteMatchupWinsLosses[6][1] ++;}

        // Collect black game statistics - 30 and 31
        if (game.winningColor === "Nohr (Black)" && game.losingColors === "Sword of Light (Red)") { blackMatchupWinsLosses[0][0] ++;} if (game.losingColors === "Nohr (Black)" && game.winningColor === "Sword of Light (Red)") { blackMatchupWinsLosses[0][1] ++;}
        if (game.winningColor === "Nohr (Black)" && game.losingColors === "Mark of Naga (Blue)") { blackMatchupWinsLosses[1][0] ++;} if (game.losingColors === "Nohr (Black)" && game.winningColor === "Mark of Naga (Blue)") { blackMatchupWinsLosses[1][1] ++;}
        if (game.winningColor === "Nohr (Black)" && game.losingColors === "Hoshido (White)") { blackMatchupWinsLosses[2][0] ++;} if (game.losingColors === "Nohr (Black)" && game.winningColor === "Hoshido (White)") { blackMatchupWinsLosses[2][1] ++;}
        if (game.winningColor === "Nohr (Black)" && game.losingColors === "Medallion (Green)") { blackMatchupWinsLosses[4][0] ++;} if (game.losingColors === "Nohr (Black)" && game.winningColor === "Medallion (Green)") { blackMatchupWinsLosses[4][1] ++;}
        if (game.winningColor === "Nohr (Black)" && game.losingColors === "Divine Artifacts (Purple)") { blackMatchupWinsLosses[5][0] ++;} if (game.losingColors === "Nohr (Black)" && game.winningColor === "Divine Artifacts (Purple)") { blackMatchupWinsLosses[5][1] ++;}
        if (game.winningColor === "Nohr (Black)" && game.losingColors === "Holy War Flag (Yellow)") { blackMatchupWinsLosses[6][0] ++;} if (game.losingColors === "Nohr (Black)" && game.winningColor === "Holy War Flag (Yellow)") { blackMatchupWinsLosses[6][1] ++;}

        // Collect green game statistics - 40 and 41
        if (game.winningColor === "Medallion (Green)" && game.losingColors === "Sword of Light (Red)") { greenMatchupWinsLosses[0][0] ++;} if (game.losingColors === "Medallion (Green)" && game.winningColor === "Sword of Light (Red)") { greenMatchupWinsLosses[0][1] ++;}
        if (game.winningColor === "Medallion (Green)" && game.losingColors === "Mark of Naga (Blue)") { greenMatchupWinsLosses[1][0] ++;} if (game.losingColors === "Medallion (Green)" && game.winningColor === "Mark of Naga (Blue)") { greenMatchupWinsLosses[1][1] ++;}
        if (game.winningColor === "Medallion (Green)" && game.losingColors === "Hoshido (White)") { greenMatchupWinsLosses[2][0] ++;} if (game.losingColors === "Medallion (Green)" && game.winningColor === "Hoshido (White)") { greenMatchupWinsLosses[2][1] ++;}
        if (game.winningColor === "Medallion (Green)" && game.losingColors === "Nohr (Black)") { greenMatchupWinsLosses[3][0] ++;} if (game.losingColors === "Medallion (Green)" && game.winningColor === "Nohr (Black)") { greenMatchupWinsLosses[3][1] ++;}
        if (game.winningColor === "Medallion (Green)" && game.losingColors === "Divine Artifacts (Purple)") { greenMatchupWinsLosses[5][0] ++;} if (game.losingColors === "Medallion (Green)" && game.winningColor === "Divine Artifacts (Purple)") { greenMatchupWinsLosses[5][1] ++;}
        if (game.winningColor === "Medallion (Green)" && game.losingColors === "Holy War Flag (Yellow)") { greenMatchupWinsLosses[6][0] ++;} if (game.losingColors === "Medallion (Green)" && game.winningColor === "Holy War Flag (Yellow)") { greenMatchupWinsLosses[6][1] ++;}

        // Collect purple game statistics - 50 and 51
        if (game.winningColor === "Divine Artifacts (Purple)" && game.losingColors === "Sword of Light (Red)") { purpleMatchupWinsLosses[0][0] ++;} if (game.losingColors === "Divine Artifacts (Purple)" && game.winningColor === "Sword of Light (Red)") { purpleMatchupWinsLosses[0][1] ++;}
        if (game.winningColor === "Divine Artifacts (Purple)" && game.losingColors === "Mark of Naga (Blue)") { purpleMatchupWinsLosses[1][0] ++;} if (game.losingColors === "Divine Artifacts (Purple)" && game.winningColor === "Mark of Naga (Blue)") { purpleMatchupWinsLosses[1][1] ++;}
        if (game.winningColor === "Divine Artifacts (Purple)" && game.losingColors === "Hoshido (White)") { purpleMatchupWinsLosses[2][0] ++;} if (game.losingColors === "Divine Artifacts (Purple)" && game.winningColor === "Hoshido (White)") { purpleMatchupWinsLosses[2][1] ++;}
        if (game.winningColor === "Divine Artifacts (Purple)" && game.losingColors === "Nohr (Black)") { purpleMatchupWinsLosses[3][0] ++;} if (game.losingColors === "Divine Artifacts (Purple)" && game.winningColor === "Nohr (Black)") { purpleMatchupWinsLosses[3][1] ++;}
        if (game.winningColor === "Divine Artifacts (Purple)" && game.losingColors === "Medallion (Green)") { purpleMatchupWinsLosses[4][0] ++;} if (game.losingColors === "Divine Artifacts (Purple)" && game.winningColor === "Divine Medallion (Green)") { purpleMatchupWinsLosses[4][1] ++;}
        if (game.winningColor === "Divine Artifacts (Purple)" && game.losingColors === "Holy War Flag (Yellow)") { purpleMatchupWinsLosses[6][0] ++;} if (game.losingColors === "Divine Artifacts (Purple)" && game.winningColor === "Holy War Flag (Yellow)") { purpleMatchupWinsLosses[6][1] ++;}

        // Collect yellow game statistics - 60 and 61
        if (game.winningColor === "Holy War Flag (Yellow)" && game.losingColors === "Sword of Light (Red)") { yellowMatchupWinsLosses[0][0] ++;} if (game.losingColors === "Holy War Flag (Yellow)" && game.winningColor === "Sword of Light (Red)") { yellowMatchupWinsLosses[0][1] ++;}
        if (game.winningColor === "Holy War Flag (Yellow)" && game.losingColors === "Mark of Naga (Blue)") { yellowMatchupWinsLosses[1][0] ++;} if (game.losingColors === "Holy War Flag (Yellow)" && game.winningColor === "Mark of Naga (Blue)") { yellowMatchupWinsLosses[1][1] ++;}
        if (game.winningColor === "Holy War Flag (Yellow)" && game.losingColors === "Hoshido (White)") { yellowMatchupWinsLosses[2][0] ++;} if (game.losingColors === "Holy War Flag (Yellow)" && game.winningColor === "Hoshido (White)") { yellowMatchupWinsLosses[2][1] ++;}
        if (game.winningColor === "Holy War Flag (Yellow)" && game.losingColors === "Nohr (Black)") { yellowMatchupWinsLosses[3][0] ++;} if (game.losingColors === "Holy War Flag (Yellow)" && game.winningColor === "Nohr (Black)") { yellowMatchupWinsLosses[3][1] ++;}
        if (game.winningColor === "Holy War Flag (Yellow)" && game.losingColors === "Medallion (Green)") { yellowMatchupWinsLosses[4][0] ++;} if (game.losingColors === "Holy War Flag (Yellow)" && game.winningColor === "Divine Medallion (Green)") { yellowMatchupWinsLosses[4][1] ++;}
        if (game.winningColor === "Holy War Flag (Yellow)" && game.losingColors === "Divine Artifacts (Purple)") { yellowMatchupWinsLosses[5][0] ++;} if (game.losingColors === "Holy War Flag (Yellow)" && game.winningColor === "Divine Artifacts (Purple)") { yellowMatchupWinsLosses[5][1] ++;}
      }

    }
    db.updateGeneralCIPHERGameStats(totalGamesPlayed, "NULL", 0, "NULL", 0, 0, 0.50)
    db.updateCIPHERGameStats("red", colorSpecificTotalGamesPlayed[0], colorSpecificTotalWinsLosses[0][0], colorSpecificTotalWinsLosses[0][1], "NULL", 0, "NULL", 0, 0, 0,
    redMatchupWinsLosses[0][0], redMatchupWinsLosses[0][1], ( (redMatchupWinsLosses[0][0] / (redMatchupWinsLosses[0][0] + redMatchupWinsLosses[0][1]) ) * 100).toFixed(0),
    redMatchupWinsLosses[1][0], redMatchupWinsLosses[1][1], ( (redMatchupWinsLosses[1][0] / (redMatchupWinsLosses[1][0] + redMatchupWinsLosses[1][1]) ) * 100).toFixed(0),
    redMatchupWinsLosses[2][0], redMatchupWinsLosses[2][1], ( (redMatchupWinsLosses[2][0] / (redMatchupWinsLosses[2][0] + redMatchupWinsLosses[2][1]) ) * 100).toFixed(0),
    redMatchupWinsLosses[3][0], redMatchupWinsLosses[3][1], ( (redMatchupWinsLosses[3][0] / (redMatchupWinsLosses[3][0] + redMatchupWinsLosses[3][1]) ) * 100).toFixed(0),
    redMatchupWinsLosses[4][0], redMatchupWinsLosses[4][1], ( (redMatchupWinsLosses[4][0] / (redMatchupWinsLosses[4][0] + redMatchupWinsLosses[4][1]) ) * 100).toFixed(0),
    redMatchupWinsLosses[5][0], redMatchupWinsLosses[5][1], ( (redMatchupWinsLosses[5][0] / (redMatchupWinsLosses[5][0] + redMatchupWinsLosses[5][1]) ) * 100).toFixed(0),
    redMatchupWinsLosses[6][0], redMatchupWinsLosses[6][1], ( (redMatchupWinsLosses[6][0] / (redMatchupWinsLosses[6][0] + redMatchupWinsLosses[6][1]) ) * 100).toFixed(0),
    redMatchupWinsLosses[7][0], redMatchupWinsLosses[7][1], ( (redMatchupWinsLosses[7][0] / (redMatchupWinsLosses[7][0] + redMatchupWinsLosses[7][1]) ) * 100).toFixed(0),);
    db.updateCIPHERGameStats("blue", colorSpecificTotalGamesPlayed[1], colorSpecificTotalWinsLosses[1][0], colorSpecificTotalWinsLosses[1][1], "NULL", 0, "NULL", 0, 0, 0,
    blueMatchupWinsLosses[0][0], blueMatchupWinsLosses[0][1], ( (blueMatchupWinsLosses[0][0] / (blueMatchupWinsLosses[0][0] + blueMatchupWinsLosses[0][1]) ) * 100).toFixed(0),
    blueMatchupWinsLosses[1][0], blueMatchupWinsLosses[1][1], ( (blueMatchupWinsLosses[1][0] / (blueMatchupWinsLosses[1][0] + blueMatchupWinsLosses[1][1]) ) * 100).toFixed(0),
    blueMatchupWinsLosses[2][0], blueMatchupWinsLosses[2][1], ( (blueMatchupWinsLosses[2][0] / (blueMatchupWinsLosses[2][0] + blueMatchupWinsLosses[2][1]) ) * 100).toFixed(0),
    blueMatchupWinsLosses[3][0], blueMatchupWinsLosses[3][1], ( (blueMatchupWinsLosses[3][0] / (blueMatchupWinsLosses[3][0] + blueMatchupWinsLosses[3][1]) ) * 100).toFixed(0),
    blueMatchupWinsLosses[4][0], blueMatchupWinsLosses[4][1], ( (blueMatchupWinsLosses[4][0] / (blueMatchupWinsLosses[4][0] + blueMatchupWinsLosses[4][1]) ) * 100).toFixed(0),
    blueMatchupWinsLosses[5][0], blueMatchupWinsLosses[5][1], ( (blueMatchupWinsLosses[5][0] / (blueMatchupWinsLosses[5][0] + blueMatchupWinsLosses[5][1]) ) * 100).toFixed(0),
    blueMatchupWinsLosses[6][0], blueMatchupWinsLosses[6][1], ( (blueMatchupWinsLosses[6][0] / (blueMatchupWinsLosses[6][0] + blueMatchupWinsLosses[6][1]) ) * 100).toFixed(0),
    blueMatchupWinsLosses[7][0], blueMatchupWinsLosses[7][1], ( (blueMatchupWinsLosses[7][0] / (blueMatchupWinsLosses[7][0] + blueMatchupWinsLosses[7][1]) ) * 100).toFixed(0),);
    db.updateCIPHERGameStats("white", colorSpecificTotalGamesPlayed[2], colorSpecificTotalWinsLosses[2][0], colorSpecificTotalWinsLosses[2][1], "NULL", 0, "NULL", 0, 0, 0,
    whiteMatchupWinsLosses[0][0], whiteMatchupWinsLosses[0][1], ( (whiteMatchupWinsLosses[0][0] / (whiteMatchupWinsLosses[0][0] + whiteMatchupWinsLosses[0][1]) ) * 100).toFixed(0),
    whiteMatchupWinsLosses[1][0], whiteMatchupWinsLosses[1][1], ( (whiteMatchupWinsLosses[1][0] / (whiteMatchupWinsLosses[1][0] + whiteMatchupWinsLosses[1][1]) ) * 100).toFixed(0),
    whiteMatchupWinsLosses[2][0], whiteMatchupWinsLosses[2][1], ( (whiteMatchupWinsLosses[2][0] / (whiteMatchupWinsLosses[2][0] + whiteMatchupWinsLosses[2][1]) ) * 100).toFixed(0),
    whiteMatchupWinsLosses[3][0], whiteMatchupWinsLosses[3][1], ( (whiteMatchupWinsLosses[3][0] / (whiteMatchupWinsLosses[3][0] + whiteMatchupWinsLosses[3][1]) ) * 100).toFixed(0),
    whiteMatchupWinsLosses[4][0], whiteMatchupWinsLosses[4][1], ( (whiteMatchupWinsLosses[4][0] / (whiteMatchupWinsLosses[4][0] + whiteMatchupWinsLosses[4][1]) ) * 100).toFixed(0),
    whiteMatchupWinsLosses[5][0], whiteMatchupWinsLosses[5][1], ( (whiteMatchupWinsLosses[5][0] / (whiteMatchupWinsLosses[5][0] + whiteMatchupWinsLosses[5][1]) ) * 100).toFixed(0),
    whiteMatchupWinsLosses[6][0], whiteMatchupWinsLosses[6][1], ( (whiteMatchupWinsLosses[6][0] / (whiteMatchupWinsLosses[6][0] + whiteMatchupWinsLosses[6][1]) ) * 100).toFixed(0),
    whiteMatchupWinsLosses[7][0], whiteMatchupWinsLosses[7][1], ( (whiteMatchupWinsLosses[7][0] / (whiteMatchupWinsLosses[7][0] + whiteMatchupWinsLosses[7][1]) ) * 100).toFixed(0),);
    db.updateCIPHERGameStats("black", colorSpecificTotalGamesPlayed[3], colorSpecificTotalWinsLosses[3][0], colorSpecificTotalWinsLosses[3][1], "NULL", 0, "NULL", 0, 0, 0,
    blackMatchupWinsLosses[0][0], blackMatchupWinsLosses[0][1], ( (blackMatchupWinsLosses[0][0] / (blackMatchupWinsLosses[0][0] + blackMatchupWinsLosses[0][1]) ) * 100).toFixed(0),
    blackMatchupWinsLosses[1][0], blackMatchupWinsLosses[1][1], ( (blackMatchupWinsLosses[1][0] / (blackMatchupWinsLosses[1][0] + blackMatchupWinsLosses[1][1]) ) * 100).toFixed(0),
    blackMatchupWinsLosses[2][0], blackMatchupWinsLosses[2][1], ( (blackMatchupWinsLosses[2][0] / (blackMatchupWinsLosses[2][0] + blackMatchupWinsLosses[2][1]) ) * 100).toFixed(0),
    blackMatchupWinsLosses[3][0], blackMatchupWinsLosses[3][1], ( (blackMatchupWinsLosses[3][0] / (blackMatchupWinsLosses[3][0] + blackMatchupWinsLosses[3][1]) ) * 100).toFixed(0),
    blackMatchupWinsLosses[4][0], blackMatchupWinsLosses[4][1], ( (blackMatchupWinsLosses[4][0] / (blackMatchupWinsLosses[4][0] + blackMatchupWinsLosses[4][1]) ) * 100).toFixed(0),
    blackMatchupWinsLosses[5][0], blackMatchupWinsLosses[5][1], ( (blackMatchupWinsLosses[5][0] / (blackMatchupWinsLosses[5][0] + blackMatchupWinsLosses[5][1]) ) * 100).toFixed(0),
    blackMatchupWinsLosses[6][0], blackMatchupWinsLosses[6][1], ( (blackMatchupWinsLosses[6][0] / (blackMatchupWinsLosses[6][0] + blackMatchupWinsLosses[6][1]) ) * 100).toFixed(0),
    blackMatchupWinsLosses[7][0], blackMatchupWinsLosses[7][1], ( (blackMatchupWinsLosses[7][0] / (blackMatchupWinsLosses[7][0] + blackMatchupWinsLosses[7][1]) ) * 100).toFixed(0),);
    db.updateCIPHERGameStats("green", colorSpecificTotalGamesPlayed[4], colorSpecificTotalWinsLosses[4][0], colorSpecificTotalWinsLosses[4][1], "NULL", 0, "NULL", 0, 0, 0,
    greenMatchupWinsLosses[0][0], greenMatchupWinsLosses[0][1], ( (greenMatchupWinsLosses[0][0] / (greenMatchupWinsLosses[0][0] + greenMatchupWinsLosses[0][1]) ) * 100).toFixed(0),
    greenMatchupWinsLosses[1][0], greenMatchupWinsLosses[1][1], ( (greenMatchupWinsLosses[1][0] / (greenMatchupWinsLosses[1][0] + greenMatchupWinsLosses[1][1]) ) * 100).toFixed(0),
    greenMatchupWinsLosses[2][0], greenMatchupWinsLosses[2][1], ( (greenMatchupWinsLosses[2][0] / (greenMatchupWinsLosses[2][0] + greenMatchupWinsLosses[2][1]) ) * 100).toFixed(0),
    greenMatchupWinsLosses[3][0], greenMatchupWinsLosses[3][1], ( (greenMatchupWinsLosses[3][0] / (greenMatchupWinsLosses[3][0] + greenMatchupWinsLosses[3][1]) ) * 100).toFixed(0),
    greenMatchupWinsLosses[4][0], greenMatchupWinsLosses[4][1], ( (greenMatchupWinsLosses[4][0] / (greenMatchupWinsLosses[4][0] + greenMatchupWinsLosses[4][1]) ) * 100).toFixed(0),
    greenMatchupWinsLosses[5][0], greenMatchupWinsLosses[5][1], ( (greenMatchupWinsLosses[5][0] / (greenMatchupWinsLosses[5][0] + greenMatchupWinsLosses[5][1]) ) * 100).toFixed(0),
    greenMatchupWinsLosses[6][0], greenMatchupWinsLosses[6][1], ( (greenMatchupWinsLosses[6][0] / (greenMatchupWinsLosses[6][0] + greenMatchupWinsLosses[6][1]) ) * 100).toFixed(0),
    greenMatchupWinsLosses[7][0], greenMatchupWinsLosses[7][1], ( (greenMatchupWinsLosses[7][0] / (greenMatchupWinsLosses[7][0] + greenMatchupWinsLosses[7][1]) ) * 100).toFixed(0),);
    db.updateCIPHERGameStats("purple", colorSpecificTotalGamesPlayed[5], colorSpecificTotalWinsLosses[5][0], colorSpecificTotalWinsLosses[5][1], "NULL", 0, "NULL", 0, 0, 0,
    purpleMatchupWinsLosses[0][0], purpleMatchupWinsLosses[0][1], ( (purpleMatchupWinsLosses[0][0] / (purpleMatchupWinsLosses[0][0] + purpleMatchupWinsLosses[0][1]) ) * 100).toFixed(0),
    purpleMatchupWinsLosses[1][0], purpleMatchupWinsLosses[1][1], ( (purpleMatchupWinsLosses[1][0] / (purpleMatchupWinsLosses[1][0] + purpleMatchupWinsLosses[1][1]) ) * 100).toFixed(0),
    purpleMatchupWinsLosses[2][0], purpleMatchupWinsLosses[2][1], ( (purpleMatchupWinsLosses[2][0] / (purpleMatchupWinsLosses[2][0] + purpleMatchupWinsLosses[2][1]) ) * 100).toFixed(0),
    purpleMatchupWinsLosses[3][0], purpleMatchupWinsLosses[3][1], ( (purpleMatchupWinsLosses[3][0] / (purpleMatchupWinsLosses[3][0] + purpleMatchupWinsLosses[3][1]) ) * 100).toFixed(0),
    purpleMatchupWinsLosses[4][0], purpleMatchupWinsLosses[4][1], ( (purpleMatchupWinsLosses[4][0] / (purpleMatchupWinsLosses[4][0] + purpleMatchupWinsLosses[4][1]) ) * 100).toFixed(0),
    purpleMatchupWinsLosses[5][0], purpleMatchupWinsLosses[5][1], ( (purpleMatchupWinsLosses[5][0] / (purpleMatchupWinsLosses[5][0] + purpleMatchupWinsLosses[5][1]) ) * 100).toFixed(0),
    purpleMatchupWinsLosses[6][0], purpleMatchupWinsLosses[6][1], ( (purpleMatchupWinsLosses[6][0] / (purpleMatchupWinsLosses[6][0] + purpleMatchupWinsLosses[6][1]) ) * 100).toFixed(0),
    purpleMatchupWinsLosses[7][0], purpleMatchupWinsLosses[7][1], ( (purpleMatchupWinsLosses[7][0] / (purpleMatchupWinsLosses[7][0] + purpleMatchupWinsLosses[7][1]) ) * 100).toFixed(0),);
    db.updateCIPHERGameStats("yellow", colorSpecificTotalGamesPlayed[6], colorSpecificTotalWinsLosses[6][0], colorSpecificTotalWinsLosses[6][1], "NULL", 0, "NULL", 0, 0, 0,
    yellowMatchupWinsLosses[0][0], yellowMatchupWinsLosses[0][1], ( (yellowMatchupWinsLosses[0][0] / (yellowMatchupWinsLosses[0][0] + yellowMatchupWinsLosses[0][1]) ) * 100).toFixed(0),
    yellowMatchupWinsLosses[1][0], yellowMatchupWinsLosses[1][1], ( (yellowMatchupWinsLosses[1][0] / (yellowMatchupWinsLosses[1][0] + yellowMatchupWinsLosses[1][1]) ) * 100).toFixed(0),
    yellowMatchupWinsLosses[2][0], yellowMatchupWinsLosses[2][1], ( (yellowMatchupWinsLosses[2][0] / (yellowMatchupWinsLosses[2][0] + yellowMatchupWinsLosses[2][1]) ) * 100).toFixed(0),
    yellowMatchupWinsLosses[3][0], yellowMatchupWinsLosses[3][1], ( (yellowMatchupWinsLosses[3][0] / (yellowMatchupWinsLosses[3][0] + yellowMatchupWinsLosses[3][1]) ) * 100).toFixed(0),
    yellowMatchupWinsLosses[4][0], yellowMatchupWinsLosses[4][1], ( (yellowMatchupWinsLosses[4][0] / (yellowMatchupWinsLosses[4][0] + yellowMatchupWinsLosses[4][1]) ) * 100).toFixed(0),
    yellowMatchupWinsLosses[5][0], yellowMatchupWinsLosses[5][1], ( (yellowMatchupWinsLosses[5][0] / (yellowMatchupWinsLosses[5][0] + yellowMatchupWinsLosses[5][1]) ) * 100).toFixed(0),
    yellowMatchupWinsLosses[6][0], yellowMatchupWinsLosses[6][1], ( (yellowMatchupWinsLosses[6][0] / (yellowMatchupWinsLosses[6][0] + yellowMatchupWinsLosses[6][1]) ) * 100).toFixed(0),
    yellowMatchupWinsLosses[7][0], yellowMatchupWinsLosses[7][1], ( (yellowMatchupWinsLosses[7][0] / (yellowMatchupWinsLosses[7][0] + yellowMatchupWinsLosses[7][1]) ) * 100).toFixed(0),);
  }

  render() {
    const { games, stats } = this.state;
    // Need to add a refresh/sync/update button to call: this.updateCipherGameStats(games);
    // this.updateCipherGameStats(games);

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
