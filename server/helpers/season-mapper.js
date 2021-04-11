const object = {
  RIDER: [],
  HOMETOWN: [],
  "AVG START": [],
  POS: [],
  "AVG FINISH": [],
  "SEASON POINTS": [],
  "SEASON HOLESHOTS": [],
  "AVG QUAL": [],
  "SEASON LAPS LEAD": [],
  "SEASON WINS": [],
};

const parseName = (nameString) => {
  const split = nameString.split(" ");
  return split.splice(0, 2).join(" ");
};

const parseSeasonStats = (stringContainingStats, index) => {
  return stringContainingStats.split(" ").splice(index, 1).join("");
};

// TODO - Season Averages
const splitRiderStats = (riderStats, position) => {
  return {
    name: parseName(riderStats[1]),
    number: riderStats[0],
    seasonHoleshots: parseSeasonStats(riderStats[1], 2),
    lapsLed: parseSeasonStats(riderStats[1], 3),
    wins: parseSeasonStats(riderStats[1], 4),
    points: riderStats[2].trim(),
    position,
  };
};

const identifyRiderStatistics = (resultString) => {
  let currentRider = [];
  let riderResults = [];
  resultString.map((c, i, a) => {
    if (currentRider.length == 4) {
      riderResults.push(splitRiderStats(currentRider, i / 4));
      currentRider = [];
    }
    currentRider.push(c);
  });
  return riderResults;
};

module.exports = (resultString) => {
  return identifyRiderStatistics(resultString);
};
