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

const manufacturers = [
  "Suzuki",
  "Honda",
  "KTM",
  "Yamaha",
  "Kawasaki",
  "Husqvarna",
  "GASGAS",
];

const parseRiderName = (name) => {
  const splitName = name.split(" ");
  let parsedName;
  splitName.map((nameElement) => {
    manufacturers.map((m) => {
      const reg = new RegExp(m, "gi");
      const replacedBike = nameElement.replace(reg, " ");
      if (nameElement.length > replacedBike.length) {
        parsedName = replacedBike;
      }
    });
  });
  return (splitName[0] += ` ${parsedName}`);
};

const splitRiderResults = (rider, position) => {
  return {
    number: rider[0],
    name: parseRiderName(rider[1]),
    points: rider[2],
    position,
  };
};

const identifyRiderRaceResults = (results) => {
  let currentRider = [];
  let riderResults = [];
  let x = false;
  let currentPosition = 1;
  results
    .filter(
      (r) =>
        r.length === 1 ||
        r.length === 2 ||
        r.length === 3 ||
        !/^\d+$/.test(r.split("X").join(""))
    )
    .map((c, i, arr) => {
      if (x) {
        x = false;
        return;
      }
      if (currentRider.length == 3) {
        riderResults.push(splitRiderResults(currentRider, currentPosition));
        currentRider = [];
        currentPosition += 1;
      } else if (i === arr.length - 1) {
        riderResults.push(
          splitRiderResults([...currentRider, c], currentPosition)
        );
        currentRider = [];
      }
      if (c.length > 3 && c.length < 20) {
        x = true;
        currentRider.push((c += arr[i + 1]));
        return;
      }

      currentRider.push(c);
    });
  return riderResults;
};

module.exports = (resultString) => {
  return identifyRiderRaceResults(resultString);
};
