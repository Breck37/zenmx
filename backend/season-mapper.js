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

const identifyRiderStatistics = () => {
  let currentRider = [];
  let riderResults = [];
  resultString.map((c, i, a) => {
    if (currentRider.length == 4) {
      riderResults.push(currentRider);
      currentRider = [];
    }
    currentRider.push(c);
  });
  return riderResults;
};

module.exports = (resultString) => {
  return;
};
