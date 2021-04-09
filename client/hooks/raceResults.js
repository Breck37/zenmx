import { useContext, createContext } from "react";
import currentRound from "../constants/currentRound";

const RaceResultsContext = createContext(null);

export const useRaceResults = () => {
  const raceResults = useContext(RaceResultsContext);

  return { ...raceResults, week: currentRound.week };
};

export default function RaceResultsContextProvider({ children, raceResults }) {
  return (
    <RaceResultsContext.Provider value={raceResults}>
      {children}
    </RaceResultsContext.Provider>
  );
}
