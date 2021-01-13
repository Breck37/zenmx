module.exports = (array, index) => {
  const raceResults = array.splice(index);
  console.log(raceResults, array, index);
  const indexToCut = raceResults.indexOf("SEASON STATISTICS");
  console.log(indexToCut);
  if (indexToCut !== -1) {
    return raceResults.splice(0, indexToCut);
  } else {
    return raceResults;
  }
};
