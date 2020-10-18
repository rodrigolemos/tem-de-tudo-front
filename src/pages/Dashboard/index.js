import React from 'react';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import UserDashboard from '../../components/UserDashboard';

const Dashboard = () => (
  <div className="global-container">
    <SidePanel>
      <UserPanel />
    </SidePanel>
    <Main>
      <UserDashboard />
    </Main>
  </div>
);

export default Dashboard;