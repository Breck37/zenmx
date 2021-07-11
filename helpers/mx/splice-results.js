module.exports = (array, index) => {
  let raceResults = array.splice(index);
  let cleanedResults;
  let cutResults;
  const indexToClean = raceResults.findIndex((i) => i.includes('BOX SCORE'));
  let indexToCut = raceResults.indexOf('SEASON STATISTICS');

  if (indexToClean !== -1) {
    cleanedResults = raceResults.splice(indexToClean + 1);
    indexToCut -= indexToClean;
  }

  if (indexToCut !== -1) {
    if (cleanedResults) {
      cutResults = cleanedResults.splice(0, indexToCut);
    } else {
      cutResults = raceResults.splice(0, indexToCut);
    }
  }

  return cutResults;
};
