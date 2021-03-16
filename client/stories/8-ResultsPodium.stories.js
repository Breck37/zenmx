import React from "react";
import styled from "styled-components";
import { ResultsPodium } from "../components";

export default {
  title: "ResultsPodium",
  component: ResultsPodium,
};

const mockResultsPodium = [
  {
    name: "Bruce Pizza",
    number: 22,
    position: 1,
  },
  {
    name: "Brent Eckert",
    number: 37,
    position: 4,
  },
  {
    name: "Ken Roczen",
    number: 94,
    position: 5,
  },
  {
    name: "Eli Tomac",
    number: 1,
    position: 3,
  },
  {
    name: "Justin Barcia",
    number: 51,
    position: 2,
  },
  {
    name: "Bruce Pizza",
    number: 22,
    position: 100,
  },
  {
    name: "Pablo Taco",
    number: "69",
    position: 10,
  },
];

export const DesktopResultsPodium = () => {
  console.log(ResultsPodium);
  return <ResultsPodium riders={mockResultsPodium} />;
};

const MobileContainer = styled.div`
  width: 350px;
`;

export const MobileResultsPodium = () => {
  return (
    <MobileContainer>
      <ResultsPodium riders={mockResultsPodium} />
    </MobileContainer>
  );
};
