import React, { useContext, createContext } from 'react';
import currentRound from '../constants/currentRound';
import scheduledData from '../constants/scheduledData';
const RaceResultsContext = createContext(null);

export const useRaceResults = () => {
  let raceResults = useContext(RaceResultsContext);

  if (raceResults) {
    raceResults = { ...raceResults, ...currentRound };
  } else if (!raceResults && scheduledData[currentRound?.round]) {
    raceResults = {
      ...scheduledData[currentRound?.round],
      message: 'Results still in progress',
      ...currentRound,
    };
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
