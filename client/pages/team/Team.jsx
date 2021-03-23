import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, WeeklyPicks } from "../../components";
import { useIsMountedRef } from "../../hooks";
import { useCurrentMode } from "../../hooks/currentMode";
import { useCurrentRound } from "../../hooks/currentRound";
import { currentRound } from "../../constants";
import { TeamStyled } from "../../styles";

// TODO create league select

const Team = () => {
  const router = useRouter();

  // hooks
  const { user, isLoading } = useUser();
  const isMounted = useIsMountedRef();
  const { activeRound } = useCurrentRound();
  const { currentMode } = useCurrentMode();

  // state
  const [league, setLeague] = useState("");
  const [selectedRiders, setSelectedRiders] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  console.log(activeRound, currentRound);

  const picksUnavailable = activeRound.submissionEnd < new Date();

  const picksUnavailable =
    activeRound.submissionEnd < new Date() ||
    activeRound.submissionStart > new Date();

  useEffect(() => {
    if (!isMounted.current) return;
    if (entries && entries.length) return;
    if (!isLoading && !user) {
      router.push("/login");
      return;
    }
    if (picksUnavailable) {
      setLoading(false);
      return;
    }

    if (success) {
      setTimeout(() => setSuccess(""), 1500);
    }

    axios
      .get(`/api/check-entry-list?week=${currentRound}`)
      .then((res) => {
        console.log("RES", res);
        if (isMounted.current) {
          setLoading(false);
          setEntries(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  });

  const selectedRidersWithErrors = useMemo(() => {
    if (!selectedRiders || !selectedRiders?.length) return [];
    const riderNames = [];
    return selectedRiders.map((rider) => {
      const indexOfRiderName = riderNames.indexOf(rider.riderName);
      if (rider.position === 100 || indexOfRiderName === -1) {
        riderNames.push(rider.riderName);
        return { ...rider, error: "" };
      }
      return {
        ...rider,
        error: `Please change pick #${indexOfRiderName + 1}`,
      };
    });
  }, [selectedRiders]).sort((a, b) => a.position - b.position);

  const hasPickErrors = useMemo(() => {
    if (selectedRidersWithErrors.length !== 7) return true;
    return selectedRidersWithErrors.reduce(
      (result, currentRider) => (currentRider.error ? true : false),
      false
    );
  });

  const removeErrors = (riders) => {
    return riders.map(({ error, ...rest }) => ({ ...rest }));
  };

  const saveUserPicks = () => {
    const cleanseSelectedRiders = removeErrors(selectedRiders);

    const params = JSON.stringify({
      email: user.email,
      bigBikePicks: cleanseSelectedRiders,
      week: roundData.currentRound,
      totalPoints: 0,
      league,
    });

    axios
      .post("/api/save-picks", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSuccess("Saved picks successfully!");
        setSelectedRiders([]);
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (picksUnavailable) {
    const beginningText =
      activeRound.submissionStart > new Date()
        ? "Window to make picks is not yet open"
        : null;
    return (
      <TeamStyled currentMode={currentMode}>
        <div className="unavailable">
          {beginningText || "Window to make picks has closed"}
        </div>
      </TeamStyled>
    );
  }

  return (
    <TeamStyled currentMode={currentMode}>
      <WeeklyPicks
        riders={entries}
        selectedRiders={selectedRidersWithErrors}
        setSelectedRiders={setSelectedRiders}
        picksUnavailable={picksUnavailable}
      />
      <div className="team-submit-success">{success}</div>
      {!picksUnavailable && (
        <Button
          label="Save Team"
          onClick={saveUserPicks}
          disabled={hasPickErrors}
          className="team-save-button"
        />
      )}
    </TeamStyled>
  );
};

export default Team;
