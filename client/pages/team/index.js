import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useCurrentMode } from "../../hooks/darkMode";
import { TeamStyled } from "../../styles";
import { Button, WeeklyPicks } from "../../components";

const CURRENT_ROUND = 1;

const Team = () => {
  const { currentMode } = useCurrentMode();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [selectedRiders, setSelectedRiders] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (entries.length) return;

    axios
      .get("/api/check-entry-list?week=eight")
      .then((res) => {
        setLoading(false);
        setEntries(res.data.data);
      })
      .catch((err) => console.err(err));
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

  const hasPickErrors = useMemo(() => {
    if (selectedRidersWithErrors.length !== 7) return true;
    return selectedRidersWithErrors.reduce(
      (result, currentRider) => (currentRider.error ? true : false),
      false
    );
  });

  if (loading) {
    return <CircularProgress />;
  }

  const removeErrors = (riders) => {
    return riders.map(({ error, ...rest }) => ({ ...rest }));
  };

  const saveUserPicks = () => {
    const cleanseSelectedRiders = removeErrors(selectedRiders);

    const params = JSON.stringify({
      email: "tdmonk1@asu.edu",
      // email: user.email,
      bigBikePicks: cleanseSelectedRiders,
      week: CURRENT_ROUND,
      totalPoints: 0,
    });

    axios
      .post("/api/save-picks", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSuccess("Saved picks successfully!");
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };
  console.log(user);

  return (
    <TeamStyled currentMode={currentMode}>
      <WeeklyPicks
        riders={entries}
        selectedRiders={selectedRidersWithErrors}
        setSelectedRiders={setSelectedRiders}
      />
      {success && (
        <div style={{ height: 24, fontSize: 18, color: "green" }}>
          {success}
        </div>
      )}
      <Button
        label="Save Team"
        onClick={saveUserPicks}
        disabled={hasPickErrors}
      />
    </TeamStyled>
  );
};

export default Team;
