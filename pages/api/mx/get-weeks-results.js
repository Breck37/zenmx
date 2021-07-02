import crawler from 'crawler-request';
import { parseStringPromise } from 'xml2js';
import currentRound from '../../../constants/currentRound';
import scheduledData from '../../../constants/scheduledData';
import {
  mapper,
  seasonMapper,
  spliceResults,
  spliceSeasonResults,
  resultsMapper,
} from '../../../helpers/mx';
import { lapsMapper } from '../../../helpers/mx';

export const getLiveResults = async () => {
  const result = await crawler(
    `http://americanmotocrosslive.com/xml/mx/RaceResultsWeb.xml?R=${new Date().getTime()}`
  )
    .then(async (response) => {
      if (response && !response.error) {
        const formattedResponse = await parseStringPromise(response.html);
        const raceResults = resultsMapper(formattedResponse.A.B);
        const fastestLaps = lapsMapper([...raceResults]);
        return {
          raceResults,
          fastestLaps,
          session: formattedResponse.A.$.S,
          roundTitle: formattedResponse.A.$.T,
          fastLapLeader: fastestLaps ? fastestLaps[0] : null,
        };
      }
    })
    .catch((e) => console.error('/get-live-results', e));
  return result;
};

// const getResultDetails = (results) => {
//   const session = results[3].split(" - ")[1];
//   const round = results[11];

//   return { session, round, fastLapLeader: "" };
// };

export default async (req, res) => {
  const url = scheduledData[currentRound.round]?.officialResults;

  const liveResults = await getLiveResults();
  crawler(url)
    .then((response) => {
      if (response.error) {
        res.status(200).send({
          ...liveResults,
          liveResults,
        });
        return;
      }
      if (response) {
        const formattedResponse = response.text.split('\n');
        const raceResults = mapper(spliceResults([...formattedResponse], 14));
        const seasonResults = seasonMapper(
          spliceSeasonResults(formattedResponse),
        );

        res.status(200).send({
          pdfResults: {
            ...scheduledData[currentRound.round],
            raceResults,
            seasonResults,
          },
          ...liveResults,
        });
      }
    })
    .catch((e) => console.error('/get-week-results', { e }));
};
