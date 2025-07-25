import React from 'react'
import InboxOverview from './InboxOverview';
import JobTrackerOverview from './JobTrackerOverview';
import AnalyticsDashboardOverview from './AnalyticsDashboardOverview';

const DashboardPage = () => {
  return (
    <div>
      <InboxOverview />
      <JobTrackerOverview />
      <AnalyticsDashboardOverview />
    </div>
  );
};

export default DashboardPage