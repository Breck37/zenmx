import { useCurrentMode } from "./darkMode";
import { createContext, useContext, useEffect } from "react";

const CurrentUserContext = createContext({});

export const useCurrentUser = () => {
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    if (!user) {
    }
  }, [input]);
  return [user];
};

export default CurrentUserContext;
