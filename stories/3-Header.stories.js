import React from "react";
import { action } from "@storybook/addon-actions";
import { Header } from "../components";

export default {
  title: "Header",
  component: Header,
};

const tabs = [
  {
    title: 'Picks'
  },
  {
    title: 'Results'
  },
  {
    title: 'Leagues'
  },
  {
    title: 'Contact'
  },
];

export const Main = () => <Header tabs={tabs} />;
