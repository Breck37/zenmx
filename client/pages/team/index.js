import React from "react";
import axios from "axios";
import { useCurrentMode } from "../../hooks/darkMode";
import { TeamStyled } from "../../styles";

const Team = () => {
  const { currentMode } = useCurrentMode();

  const getEntryList = () => {
    axios.get("/api/check-entry-list?week=six").then((res) => console.log(res));
  };
  return (
    <TeamStyled currentMode={currentMode}>
      <button onClick={getEntryList}>Check Provisional Entry List</button>
    </TeamStyled>
  );
};

export default Team;
