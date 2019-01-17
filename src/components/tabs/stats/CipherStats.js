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
        <h1>FIRE EMBLEM CIPHER STATS</h1>
        <CipherGameStatistics/>
      </div>
    );
  }
}

class CipherGameStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: null
    };
  }

  componentDidMount() {
    db.onceGetRecordedGames().then(snapshot =>
      this.setState({ games: snapshot.val() })
    );
  }

  updateCipherGameStats(games) {
    var totalGamesPlayed = 0;
    // red, blue, white, black, green, purple, yellow, colorless
    var colorSpecificTotalGamesPlayed = [0, 0, 0, 0, 0, 0, 0, 0]

    for (var key in games) {
      var game = games[key];
      if (game.cardGame === cardGames.FE_CIPHER) {
        // console.log(game);

        // Collect total games played statistics
        totalGamesPlayed++;
        if (game.winningColor === "Sword of Light (Red)") { colorSpecificTotalGamesPlayed[0] ++; } if (game.losingColors === "Sword of Light (Red)") { colorSpecificTotalGamesPlayed[0] ++; }
        if (game.winningColor === "Mark of Naga (Blue)") { colorSpecificTotalGamesPlayed[1] ++; } if (game.losingColors === "Mark of Naga (Blue)") { colorSpecificTotalGamesPlayed[1] ++; }
        if (game.winningColor === "Hoshido (White)") { colorSpecificTotalGamesPlayed[2] ++; } if (game.losingColors === "Hoshido (White)") { colorSpecificTotalGamesPlayed[2] ++; }
        if (game.winningColor === "Nohr (Black)") { colorSpecificTotalGamesPlayed[3] ++; } if (game.losingColors === "Nohr (Black)") { colorSpecificTotalGamesPlayed[3] ++; }
        if (game.winningColor === "Medallion (Green)") { colorSpecificTotalGamesPlayed[4] ++; } if (game.losingColors === "Medallion (Green)") { colorSpecificTotalGamesPlayed[4] ++; }
        if (game.winningColor === "Divine Artifacts (Purple)") { colorSpecificTotalGamesPlayed[5] ++; } if (game.losingColors === "Divine Artifacts (Purple)") { colorSpecificTotalGamesPlayed[5] ++; }
        if (game.winningColor === "Holy War Flag (Yellow)") { colorSpecificTotalGamesPlayed[6] ++; } if (game.losingColors === "Holy War Flag (Yellow)") { colorSpecificTotalGamesPlayed[6] ++; }
      }

    }
    db.updateGeneralCIPHERGameStats(totalGamesPlayed, "NULL", 0, "NULL", 0, 0, 0.50)
    db.updateCIPHERGameStats("red", colorSpecificTotalGamesPlayed[0], 0, 0, "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("blue", colorSpecificTotalGamesPlayed[1], 0, 0, "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("white", colorSpecificTotalGamesPlayed[2], 0, 0, "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("black", colorSpecificTotalGamesPlayed[3], 0, 0, "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("green", colorSpecificTotalGamesPlayed[4], 0, 0, "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("purple", colorSpecificTotalGamesPlayed[5], 0, 0, "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    db.updateCIPHERGameStats("yellow", colorSpecificTotalGamesPlayed[6], 0, 0, "NULL", 0, "NULL", 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  render() {
    const { games } = this.state;
    this.updateCipherGameStats(games);

    return (
      <div>
      </div>
    )
  }

}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(CipherStatsPage);
