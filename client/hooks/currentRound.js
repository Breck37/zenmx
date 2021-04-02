import { createContext, useContext } from "react";
import { scheduledData } from "../constants";

const CurrentRoundContext = createContext({ currentRound: null });

export const useCurrentRound = () => {
  const currentRound = useContext(CurrentRoundContext);
  const activeRound = scheduledData[currentRound];

  return { activeRound };
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
