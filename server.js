const express = require("express");
const port = 3700;
const cors = require("cors");
const crawler = require("crawler-request");
const {
  mapper,
  seasonMapper,
  spliceResults,
  spliceSeasonResults,
  resultsMapper,
} = require("./helpers");
const app = express();

app.use(cors());

app.get("/get-latest-results", (req, res) => {
  crawler("https://live.amasupercross.com/xml/sx/RaceResults.json")
    .then((response) => {
      if (response) {
        const formattedResponse = JSON.parse(response.text);
        const raceResults = resultsMapper(formattedResponse.B);

        res.status(200).send({ raceResults });
      }
    })
    .catch((e) => console.error(e));
});

////////// PDF Results UNFINISHED /////
app.get("/pdf-results/:season/:race/:bikeClass", (req, res) => {
  const { season, bikeClass = 1, race } = req.params;

  crawler(
    `https://archives.amasupercross.com/xml/SX/events/S${season}${race}/S${bikeClass}F1PRESS.pdf`
  ).then((response) => {
    if (response) {
      const formattedResponse = response.text.split("\n");
      const raceResults = mapper(spliceResults([...formattedResponse], 14));
      const seasonResults = seasonMapper(
        spliceSeasonResults(formattedResponse)
      );
      res.status(200).send({ raceResults, seasonResults });
    }
  });
});

app.listen(port, () => console.log(`We be jammin on ${port}`));
