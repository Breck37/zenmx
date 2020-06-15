const express = require("express");
const port = 3700;
const cors = require("cors");
const crawler = require("crawler-request");
const {
  mapper,
  seasonMapper,
  spliceResults,
  spliceSeasonResults,
} = require("./backend");
const app = express();

app.use(cors());

app.get("/get-latest-results", (req, res) => {
  crawler(
    "https://archives.amasupercross.com/xml/SX/events/S2060/S1F1PRESS.pdf"
  )
    .then((response) => {
      if (response) {
        const formattedResponse = response.text.split("\n");

        const raceResults = mapper(spliceResults([...formattedResponse], 14));
        const seasonResults = seasonMapper(
          spliceSeasonResults(formattedResponse)
        );
        res.status(200).send({ raceResults, seasonResults });
      }
    })
    .catch((e) => console.error(e));
});

app.listen(port, () => console.log(`We be jammin on ${port}`));
