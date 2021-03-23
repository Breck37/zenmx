import { createContext, useContext } from "react";
import { scheduledData } from "../constants";

const CurrentRoundContext = createContext(null);

export const useCurrentRound = (currentRound) => {
  const activeRound = scheduledData[currentRound];

  return { activeRound };
};

export default CurrentRoundContext;
