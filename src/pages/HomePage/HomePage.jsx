import React from 'react';

import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';

const HomePage = () => {
  return (
    <div>
      <div>HomePage</div>
      <MonthStatsTable />
      <TodayWaterList />
    </div>
  );
};

export default HomePage;
