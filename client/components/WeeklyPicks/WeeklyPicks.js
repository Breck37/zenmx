import React, { useMemo } from "react";
import PicksStyled from "./PicksStyled";
import RiderSelect from "../RiderSelect/RiderSelect";

const WeeklyPicks = ({
  riders,
  selectedRiders,
  setSelectedRiders,
  picksUnavailable,
}) => {
  const riderPositions = useMemo(() => {
    return {
      first: selectedRiders.find((rider) => rider.position === 1),
      second: selectedRiders.find((rider) => rider.position === 2),
      third: selectedRiders.find((rider) => rider.position === 3),
      fourth: selectedRiders.find((rider) => rider.position === 4),
      fifth: selectedRiders.find((rider) => rider.position === 5),
      tenth: selectedRiders.find((rider) => rider.position === 10),
      fast: selectedRiders.find((rider) => rider.position === 100),
    };
  }, [selectedRiders]);

  const cleanseSelectedRiders = (riderName, position) => {
    const alreadySelectedRiderIndex = selectedRiders.find(
      (rider) => rider.riderName === riderName
    );
    const selectedCopy = [...selectedRiders];
    if (!riderName) {
      return {
        selected: selectedCopy
          .filter((rider) => rider.position !== position)
          .sort((a, b) => a.position - b.position),
        sanitizedRider: null,
      };
    }

    return {
      selected: selectedCopy.filter((rider) => rider.position !== position),
      sanitizedRider: { riderName, position, points: 0 },
    };
  };

  const handleRiderSelection = (rider, position) => {
    const { selected, sanitizedRider } = cleanseSelectedRiders(rider, position);

    if (!sanitizedRider) {
      setSelectedRiders(selected);
      return;
    }
    const sortedSelectedRiders = [...selected, sanitizedRider];
    setSelectedRiders(sortedSelectedRiders);
  };

  if (picksUnavailable) {
    return (
      <PicksStyled>
        <div className="unavailable">Window to make picks has closed</div>
      </PicksStyled>
    );
  }

  return (
    <PicksStyled>
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="1st place"
        riderPosition={1}
        value={riderPositions.first}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="2nd place"
        riderPosition={2}
        value={riderPositions.second}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="3rd place"
        riderPosition={3}
        value={riderPositions.third}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="4th place"
        riderPosition={4}
        value={riderPositions.fourth}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="5th place"
        riderPosition={5}
        value={riderPositions.fifth}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="10th place"
        riderPosition={10}
        value={riderPositions.tenth}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="Fastest lap"
        riderPosition={100}
        value={riderPositions.fast}
      />
    </PicksStyled>
  );
};

export default WeeklyPicks;
