module.exports = (array, index) => {
  const raceResults = array.splice(index);
  console.log(raceResults, array, index)
  const indexToCut = raceResults.indexOf("SEASON STATISTICS");
  return raceResults.splice(0, indexToCut);
};
