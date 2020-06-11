const object = {
  POS: [],
  number: [],
  RIDER: [],
  HOMETOWN: [],
  BIKE: [],
  QUAL: [],
  HOLESHOT: [],
  START: [],
  "LAPS LED": [],
  FINISH: [],
  POINTS: [],
};

module.exports = (resultString) => {
  let currentRider = [];
  let riderResults = [];

  resultString.map((c) => {
    if (currentRider.length == 4) {
      riderResults.push(currentRider);
      currentRider = [];
    }
    currentRider.push(c);
  });
  return riderResults;
};
