// Header Component

// Attributes
// Gradient
// Abstract lines
// Mobile Icon
// Tabs with animations

import React, { useState } from "react";
import Router from "next/router";
import HeaderStyled from "./styles";
import { Tab } from "../";
import Icon from "../../icons/Icon";

const Header = ({ tabs = [], currentMode, setCurrentMode }) => {
  const [mobileTabsVisibility, setMobileTabsVisibility] = useState(false);
  const modeToSet = currentMode ? 0 : 1;
  const handleTabClick = (tabRoute) => {
    Router.push(tabRoute);
  };

  const handleSetVisibility = () => {
    setMobileTabsVisibility(!mobileTabsVisibility);
  };

  return (
    <HeaderStyled
      currentMode={currentMode}
      showMobileTabs={mobileTabsVisibility}
    >
      <div className="mode-container">
        <button onClick={() => setCurrentMode(modeToSet)}>
          Go {currentMode ? "Dark" : "Bright"}
        </button>
      </div>
      <div className="logo-container">
        <div className="logo-wrap">
          <span onClick={() => Router.push("/")}>ModernMoto</span>
          <span className="icon-wrap" onClick={handleSetVisibility}>
            <Icon
              name="menu"
              color="#fff"
              size="32"
              className="menu"
              onClick={handleSetVisibility}
            />
          </span>
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
