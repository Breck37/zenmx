import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useCurrentMode } from "../../hooks/darkMode";
import { TeamStyled } from "../../styles";
import { Button, WeeklyPicks } from "../../components";

const Team = () => {
  const { currentMode } = useCurrentMode();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRiders, setSelectedRiders] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (entries.length) return;

    axios.get("/api/check-entry-list?week=eight").then((res) => {
      setLoading(false);
      setEntries(res.data.data);
    });
  });

  const selectedRidersWithErrors = useMemo(() => {
    const riderNames = [];
    return selectedRiders.map((rider) => {
      const indexOfRiderName = riderNames.indexOf(rider.riderName);
      console.log(indexOfRiderName);
      if (rider.position === 100 || indexOfRiderName === -1) {
        riderNames.push(rider.riderName);
        return { ...rider, error: "" };
      }
      return {
        ...rider,
        error: `Please change pick #${indexOfRiderName + 1}`,
      };
    });
  }).sort((a, b) => a.position - b.position);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TeamStyled currentMode={currentMode}>
      <WeeklyPicks
        riders={entries}
        selectedRiders={selectedRidersWithErrors}
        setSelectedRiders={setSelectedRiders}
      />
      <Button label="Save Team" onClick={() => null} />
    </TeamStyled>
  );
};

export default Team;
