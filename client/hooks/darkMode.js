import { createContext, useContext } from "react";

const CurrentModeContext = createContext("light");

export const useCurrentMode = () => {
  const currentMode = useContext(CurrentModeContext);
  return currentMode;
};

export default CurrentModeContext;
