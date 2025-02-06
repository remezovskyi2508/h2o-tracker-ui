import React from 'react';
import clsx from 'clsx';

import css from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({
  date,
  dailyNorm,
  consumedPercentage,
  portions,
}) => {
  return (
    <div className={clsx(css.hover)}>
      <div className={clsx(css.stats)}>
        <p className={clsx(css.statsData)}>{date}</p>
      </div>

      <div className={clsx(css.stats)}>
        <p>Daily norma:</p>
        <p className={clsx(css.statsData)}>{dailyNorm} л</p>
      </div>

      <div className={clsx(css.stats)}>
        <p>Fulfillment of the daily norm:</p>
        <p className={clsx(css.statsData)}>{consumedPercentage}%</p>
      </div>

      <div className={clsx(css.stats)}>
        <p>How many servings of water:</p>
        <p className={clsx(css.statsData)}>{portions}</p>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
