import crawler from "crawler-request";
import { resultsMapper, lapsMapper } from "../../../helpers";

export default (req, res) => {
  crawler("https://live.amasupercross.com/xml/sx/RaceResults.json")
    .then((response) => {
      if (response && !response.error) {
        const formattedResponse = JSON.parse(response.text);
        const raceResults = resultsMapper(formattedResponse.B);

        const fastestLaps = lapsMapper([...raceResults]);

        if (!res.status) {
          return {
            raceResults,
            fastestLaps,
            session: formattedResponse.S,
            round: formattedResponse.T,
            fastLapLeader: fastestLaps ? fastestLaps[0] : null,
          };
        }

        res.status(200).send({
          raceResults,
          fastestLaps,
          session: formattedResponse.S,
          round: formattedResponse.T,
          fastLapLeader: fastestLaps ? fastestLaps[0] : null,
        });
      }
    })
    .catch((e) => console.error("/get-live-results", e));
};
