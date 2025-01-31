import React from 'react';
import { Tooltip } from 'react-tooltip';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import clsx from 'clsx';
import css from './MonthStatsTable.module.css';
import 'react-tooltip/dist/react-tooltip.css';

const MonthStatsTable = () => {
  return (
    <div>
      <div data-tooltip-id="stats-tooltip" className={clsx(css.trigger)}>
        Hover me
      </div>
      <Tooltip
        id="stats-tooltip"
        place="top-end"
        style={{
          backgroundColor: '#FFFFFF',
          padding: 0,
        }}
        className={clsx(css.tooltip)}
      >
        <DaysGeneralStats
          date="5 квітня"
          dailyNorm="1.8"
          consumedPercentage="60"
          portions="6"
        />
      </Tooltip>
    </div>
  );
};

export default MonthStatsTable;
