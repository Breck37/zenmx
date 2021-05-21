import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import currentRound from "../constants/currentRound";

const CurrentUserContext = createContext({});

export const useCurrentUser = (user) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser && user) {
      axios
        .get(`/api/get-user/${user}?week=${currentRound.week}`)
        .then(({ data }) => {
          if (data.success) {
            setCurrentUser(data.user);
          }
        })
        .catch((err) => console.log({ err }));
    }
  });

  return { currentUser };
};

const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
