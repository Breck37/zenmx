import React, { createContext, useContext } from 'react';
import { scheduledData, currentRound } from '../constants';

const CurrentRoundContext = createContext({ currentRound: null });

export const useCurrentRound = () => {
  const round = useContext(CurrentRoundContext);
  const activeRound = scheduledData[round];

  return { ...currentRound, ...activeRound };
};

export default function CurrentRoundContextProvider({
  children,
  currentRound,
}) {
  return (
    <CurrentRoundContext.Provider value={currentRound.round}>
      {children}
    </CurrentRoundContext.Provider>
  );
}
