// Header Component

// Attributes
// Gradient
// Abstract lines
// Mobile Icon
// Tabs with animations

import React from "react";
import HeaderStyled from "./styles";
import { Tab } from "../";
import Router from "next/router";

const Header = ({ tabs = [] }) => {
  const handleTabClick = (tabRoute) => {
    Router.push(tabRoute);
  };

  return (
    <HeaderStyled>
      <div className="logo-container">
        <div className="logo-wrap" onClick={() => Router.push("/")}>
          <span>ModernMoto</span>
        </div>
      </div>
      <div className="tabs">
        {tabs.map((tab) => (
          <Tab
            key={tab.route}
            title={tab.title}
            onClick={() => handleTabClick(tab.route)}
            className="tab"
          />
        ))}
      </div>
    </HeaderStyled>
  );
};

export default Header;
