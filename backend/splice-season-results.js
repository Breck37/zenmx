const removeLineBreaks = (string) => {
  return string.replace(/\n/gi, "");
};

module.exports = (array) => {
  console.log("array------------", array, typeof array);
  const season = array.indexOf("SEASON STATISTICS");
  return array
    .splice(season + 1)
    .map(removeLineBreaks)
    .filter(Boolean)
    .splice(17);
};
