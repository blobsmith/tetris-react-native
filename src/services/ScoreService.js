import { AsyncStorage } from 'react-native';

/**
 * Manage scores list.
 */
class ScoreService {

  /**
   * Number of scores to store in the device
   *
   * @type {number}
   */
  maxStoredScores = 10;

  /**
   * UUID of device. (changed for each game removal and re-installation)
   *
   * @type {string}
   */
  deviceId = null;

  /**
   * Generate an UUID
   *
   * @returns {string}
   */
  generateUUID = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  /**
   * Sort the score list.
   *
   * @param scores
   *    Array of score
   */
  sortScores = (scores) => {
    let scorelist = scores.slice();
    scorelist.sort((a,b) => {
      if (a.points < b.points)
        return 1;
      if (a.points > b.points)
        return -1;
      return 0;
    });

    let position = 1;
    scorelist = scorelist.map((x) => {
      x.position = position;
      position++;
      return x;
    });
    return scorelist;
  };

  /**
   * Creating a score object.
   *
   * @param name
   *    Name of the player.
   * @param points
   *    Points wins
   * @param level
   *    Level number at the end of game.
   * @returns {{uuid, deviceId: string, name: string, points: (*|styles.points|{fontWeight}|{position, right, fontSize, color, fontWeight}|Array), level: (*|LogLevel|string), sent: boolean}}
   */
  createScore = (name, points, level) => {
    const score = {
      uuid: this.generateUUID(),
      deviceId: this.deviceId,
      name: name,
      points: points,
      level: level,
      sent: false,
      globalPosition: false
    };
    return score;
  };

  canPutToScoreList = (scoreList, points) => {
    let canBeInserted = false;
    if (scoreList.length < this.maxStoredScores) {
      canBeInserted = true;
    }
    else {
      scoreList.forEach(function(element) {
        if (points > element.points) {
          canBeInserted = true;
        }
      }, this);
    }
    return canBeInserted;
  };

  addToScoreList = (scoreList, scoreObject) => {
    let newScoreList = scoreList.map((x) => {
      return Object.assign({}, x);
    });
    if (this.canPutToScoreList(scoreList, scoreObject.points)) {
      // Add new score
      newScoreList.push(scoreObject);

      // Remove the lower score.
      if (newScoreList.length > this.maxStoredScores) {
        let lowerPoints = false;
        let indexOfLowerScore = false;
        newScoreList.forEach(function(element, index) {
          if (lowerPoints === false || element.points < lowerPoints) {
            lowerPoints = element.points;
            indexOfLowerScore = index;
          }
        });
        if (indexOfLowerScore !== false) {
          newScoreList.splice(indexOfLowerScore, 1);
        }
      }
    }
    return newScoreList;
  };

  loadBestScoresFromDisk (callback) {
    try {
      AsyncStorage.getItem('tetris:ScoreList').then((data) => {
        if (data !== null) {
          callback(JSON.parse(data));
          console.log(JSON.parse(data));
        }
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async saveBestScoresToDisk(scoreList) {
    try {
      AsyncStorage.setItem('tetris:ScoreList', JSON.stringify(scoreList));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  loadDeviceIdFromDisk (callback) {
    let self = this;
    try {
      AsyncStorage.getItem('tetris:deviceId').then((data) => {
        if (data !== null) {
          self.deviceId = data;
          callback(data);
        }
        else {
          const uuid = this.generateUUID();
          self.deviceId = uuid;
          AsyncStorage.setItem('tetris:deviceId', uuid);
          callback(uuid);
        }
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const scoreService = new ScoreService();
export default scoreService;

