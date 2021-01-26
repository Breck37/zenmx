// Header Component

// Attributes
// Gradient
// Abstract lines
// Mobile Icon
// Tabs with animations

import React from "react";
import HeaderStyled from "./styles";

const Header = ({ tabs = [] }) => {
  return (
    <HeaderStyled>
      <div className="logo-container">
        <div className="logo-wrap">
          <span>ModernMoto</span>
        </div>
      </div>
      <div className="tabs">{tabs.map((tab) => {
        return <div className="tab"></div>
      })}</div>
    </HeaderStyled>
  );
};

export default Header;
