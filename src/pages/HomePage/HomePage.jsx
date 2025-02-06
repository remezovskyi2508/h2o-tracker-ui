import React from 'react';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';


import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.leftSide}>
        <DailyNorma />
      </div>
      <div className={css.rightSide}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </div>
  );
};

export default HomePage;
