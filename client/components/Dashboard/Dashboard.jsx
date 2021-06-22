import React from 'react';
import DashboardStyled from './styles';

const Dashboard = () => {
  return (
    <DashboardStyled>
      <h4>Dashboard</h4>
      <section>
        <div className="row main">Previous Weeks User Results</div>
        <div className="row secondary">
          <div className="top">League Podium</div>
          <div className="bottom">Previous Week Rider Results</div>
        </div>
      </section>
    </DashboardStyled>
  );
};

export default Dashboard;
