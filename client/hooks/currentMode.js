import { createContext, useContext } from "react";

const CurrentModeContext = createContext(true);

export const useCurrentMode = () => {
  const currentMode = useContext(CurrentModeContext);
  return { currentMode };
};

export default CurrentModeContext;
