import { createContext, useContext } from "react";

const CurrentModeContext = createContext(1);

export const useCurrentMode = () => {
  const currentMode = useContext(CurrentModeContext);
  return { currentMode };
};

export default CurrentModeContext;
