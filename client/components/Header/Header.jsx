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
import Icon from "../../icons/Icon";

const Header = ({ tabs = [], currentMode, setCurrentMode }) => {
  const modeToSet = currentMode ? 0 : 1;
  const handleTabClick = (tabRoute) => {
    Router.push(tabRoute);
  };

  return (
    <HeaderStyled currentMode={currentMode}>
      <div className="mode-container">
        <button onClick={() => setCurrentMode(modeToSet)}>
          Go {currentMode ? "Dark" : "Bright"}
        </button>
      </div>
      <div className="logo-container">
        <div className="logo-wrap">
          <span onClick={() => Router.push("/")}>ModernMoto</span>
          <Icon name="menu" color="#fff" size="32" />
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
