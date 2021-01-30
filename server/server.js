const express = require("express");
const port = 3700;
const cors = require("cors");
const crawler = require("crawler-request");
const bodyParser = require("body-parser");
const {
  mapper,
  seasonMapper,
  spliceResults,
  spliceSeasonResults,
  resultsMapper,
} = require("./helpers");
const app = express();
const pickRouter = require("./routes/pick-router");

const db = require("./db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/get-live-results", (req, res) => {
  crawler("https://live.amasupercross.com/xml/sx/RaceResults.json")
    .then((response) => {
      if (response && !response.error) {
        const formattedResponse = JSON.parse(response.text);
        const raceResults = resultsMapper(formattedResponse.B);

        res.status(200).send({
          raceResults,
          session: formattedResponse.S,
          round: formattedResponse.T,
          fastLapLeader: {
            riderNumber: formattedResponse.MBY,
            lapTime: formattedResponse.MLT,
          },
        });
      }
    })
    .catch((e) => console.error(e));
});

////////// PDF Results UNFINISHED /////
app.get("/pdf-results/:season/:race/:bikeClass", (req, res) => {
  const { season, bikeClass = 1, race } = req.params;
  try {
    crawler(
      `https://archives.amasupercross.com/xml/SX/events/S${season}${race}/S${bikeClass}F1PRESS.pdf`
    ).then((response) => {
      if (response && !response.error) {
        const formattedResponse = response.text.split("\n");
        const raceResults = mapper(spliceResults([...formattedResponse], 14));
        const seasonResults = seasonMapper(
          spliceSeasonResults(formattedResponse)
        );
        res.status(200).send({ raceResults, seasonResults });
      }
    });
  } catch (error) {}
});

app.get("/current-status", (req, res) => {
  try {
    crawler("https://live.amasupercross.com/xml/sx/RaceData.json").then(
      (response) => {
        if (response && !response.error) {
          const formattedResponse = JSON.parse(response.text);
          res.status(200).send(formattedResponse);
        }
      }
    );
  } catch (error) {
    res.status(420).send({ message: "Error getting status", error });
  }
});

app.use("/api/picks", pickRouter);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(port, () => console.log(`We be jammin on ${port}`));
