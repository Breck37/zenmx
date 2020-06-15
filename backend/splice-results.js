module.exports = (array, index) => {
  const raceResults = array.splice(index);
  const indexToCut = raceResults.indexOf("SEASON STATISTICS");
  console.log("indexToCut------------", indexToCut);
  return raceResults.splice(0, indexToCut);
};
