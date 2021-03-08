module.exports = (raceResults) => {
  if (!raceResults || !raceResults.length) return [];

  return raceResults
    .sort((a, b) => {
      if (a.bestLap.includes(":") && b.bestLap.includes(":")) {
        return (
          parseFloat(a.bestLap.split(":")[1]) -
          parseFloat(b.bestLap.split(":")[1])
        );
      }

      if (a === b) {
        return 0;
      }
      const aArr = a.bestLap.split("."),
        bArr = b.bestLap.split(".");
      for (let i = 0; i < Math.min(aArr.length, bArr.length); i++) {
        if (parseFloat(aArr[i]) < parseFloat(bArr[i])) {
          return -1;
        }
        if (parseFloat(aArr[i]) > parseFloat(bArr[i])) {
          return 1;
        }
      }
      if (aArr.length < bArr.length) {
        return -1;
      }
      if (aArr.length > bArr.length) {
        return 1;
      }
      return 0;
    })
    .filter((result) => result.bestLap !== "0.000")
    .reduce((a, c) => {
      a.push({
        rider: c.riderName.trim(),
        lap: c.bestLap,
        bike: c.bike.split(" ")[0],
      });
      return a;
    }, []);
};
