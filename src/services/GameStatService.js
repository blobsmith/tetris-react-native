/**
 * Manage Game statistics.
 */
class GameStatService {

  constructor() {
    this.setPointsDefinition();
    this.resetStats();
  }

  /**
   * Set the points definition. (it could be define for each level)
   *
   * @param pointByLine
   *    Number of points by line removed
   * @param pointByAdjacent
   *    Number of points by consecutive line removed.
   * @param bonusFourLines
   *    Number of points in case of 4 lines removed in the same time.
   */
  setPointsDefinition = (pointByLine = 20, pointByAdjacent = 10, bonusFourLines = 40) => {
    this.pointByLine = pointByLine;
    this.pointByAdjacents = pointByAdjacent;
    this.bonusFourLines = bonusFourLines;
  };

  /**
   * Reset statistics (basically between two removing lines process)
   */
  resetStats = () => {
    this.linesRemoved = [];
    this.countRemoved = 0;
    this.adjacents = 0;
    this.performedStats = false;
  };

  /**
   * Figure out whether statistics has been performed.
   *
   * @returns {boolean}
   *    true if statistics has been performed.
   */
  hasPerformedStats = () => {
    return this.performedStats;
  };

  /**
   * Set the line number removed from the game area.
   *
   * @param lineNumber
   *    Line number.
   */
  setLineRemoved = (lineNumber) => {
    this.linesRemoved.push(lineNumber);
  };

  /**
   * Calculate statistics on removed lines.
   */
  performStats = () => {
    let lastNumber;
    let countAdjacent = 0;

    this.countRemoved = this.linesRemoved.length;
    for (const key in this.linesRemoved) {
      let number = this.linesRemoved[key];
      if (lastNumber && parseInt(lastNumber + 1, 10) === number) {
        countAdjacent++;
        if (countAdjacent > this.adjacents) {
          this.adjacents = countAdjacent;
        }
      }
      else {
        countAdjacent = 0;
      }
      lastNumber = number;
    }

    if (this.adjacents > 0) {
      this.adjacents++;
    }
    this.performedStats = true;
  };

  /**
   * Calculate user points from statistics performed.
   *
   * @returns {number|*}
   *    User points.
   */
  getPoints = () => {
    let points;

    points = this.pointByLine * this.countRemoved;
    points += this.pointByAdjacents * this.adjacents;
    if (this.adjacents > 4) {
      points += this.bonusFourLines;
    }
    return points;
  };

}

const gameStatService = new GameStatService();

export default gameStatService;

