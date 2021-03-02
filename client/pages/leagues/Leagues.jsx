import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { LeagueStyled } from "../../styles";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { CircularProgress } from "@material-ui/core";

const Leagues = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <CircularProgress />;
  }

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
