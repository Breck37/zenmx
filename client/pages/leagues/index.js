import React from "react";
import Button from "@material-ui/core/Button";
import { LeagueStyled } from "../../styles";

const Leagues = () => {
  return (
    <LeagueStyled>
      <h1 className="title">Leagues</h1>
      <div className="header">
        <Button
          size="large"
          variant="contained"
          color="primary"
          className="create-button"
        >
          Create Team
        </Button>
      </div>
    </LeagueStyled>
  );
};

export default Leagues;
