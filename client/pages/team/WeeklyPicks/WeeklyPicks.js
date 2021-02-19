import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import PicksStyled from "./PicksStyled";

export const WeeklyPicks = () => {
  const [selectedRiders, setSelectedRiders] = useState([]);
  const { user } = useUser();

  const cleanseSelectedRiders = (riderName) => {};

  const handleRiderSelection = (rider, position) => {
    const sanitizedRider = cleanseSelectedRiders(rider);
    console.log("------------", { rider, position });
  };
  return <PicksStyled>Weekly Picks</PicksStyled>;
};
