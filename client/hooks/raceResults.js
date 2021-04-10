import { useContext, createContext } from "react";
import currentRound from "../constants/currentRound";

const RaceResultsContext = createContext(null);

export const useRaceResults = () => {
  let raceResults = useContext(RaceResultsContext);

  if (raceResults) {
    raceResults = { ...raceResults, week: currentRound.week };
  } else if (!raceResults) {
    raceResults = { message: "Results still in progress" };
  }

  return raceResults;
};

export default function RaceResultsContextProvider({ children, raceResults }) {
  return (
    <RaceResultsContext.Provider value={raceResults}>
      {children}
    </RaceResultsContext.Provider>
  );
}
