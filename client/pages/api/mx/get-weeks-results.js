import crawler from "crawler-request";
import { currentRound, scheduledData } from "../../../constants";
import {
  mapper,
  seasonMapper,
  spliceResults,
  spliceSeasonResults,
  resultsMapper,
  lapsMapper,
} from "../../../helpers";

export const getLiveResults = async () => {
  return crawler("https://live.amasupercross.com/xml/sx/RaceResults.json")
    .then((response) => {
      if (response && !response.error) {
        const formattedResponse = JSON.parse(response.html);
        const raceResults = resultsMapper(formattedResponse.B);

        const fastestLaps = lapsMapper([...raceResults]);

        return {
          raceResults,
          fastestLaps,
          session: formattedResponse.S,
          round: formattedResponse.T,
          fastLapLeader: fastestLaps ? fastestLaps[0] : null,
        };
      }
    })
    .catch((e) => console.error("/get-live-results", e));
};

const getResultDetails = (results) => {
  const session = results[3].split(" - ")[1];
  const round = results[11];

  return { session, round, fastLapLeader: "" };
};

export default async (req, res) => {
  const url = scheduledData[currentRound.round]?.officialResults;

  const liveResults = await getLiveResults();
  crawler(
    "http://americanmotocrossresults.com/xml/MX/events/M2005/M1F2PRESS.pdf"
  )
    .then((response) => {
      console.log({ MX: response });
      if (response.error) {
        res.status(200).send({
          ...liveResults,
          liveResults,
        });
      }
      if (response && !response.error) {
        const formattedResponse = response.text.split("\n");
        const raceResults = mapper(spliceResults([...formattedResponse], 14));
        const seasonResults = seasonMapper(
          spliceSeasonResults(formattedResponse)
        );
        console.log({
          formattedResponse,
        });
        // console.log({
        //   raceResults, seasonResults, formattedResponse
        // })
        res.status(200).send({
          raceResults,
          seasonResults,
          session: liveResults.session,
          round: liveResults.round,
          liveResults,
        });
      }
    })
    .catch((e) => console.error("/get-live-results", e));
};
