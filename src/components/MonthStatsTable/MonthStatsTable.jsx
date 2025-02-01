import React from 'react';
import css from './MonthStatsTable.module.css';

const MonthStatsTable = () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleDateString('en-GB', {
    month: 'long',
  });
  const year = currentDate.getFullYear();

  return (
    <div>
      <ul className={css.calendarHeader}>
        <li className={css.headerItem}>
          <h3 className={css.title}>Month</h3>
        </li>
        <li className={css.headerItem}>
          <button className={css.button} type="button">
            <svg className={css.icon} width="20" height="20">
              <use href="/public/images/icons.svg#arrow-calendar-icon"></use>
            </svg>
          </button>
          <div className={css.dateTitle}>
            {month}, {year}
          </div>
          <button className={css.button} type="button">
            <svg className={css.icon} width="20" height="20">
              <use href="/public/images/icons.svg#arrow-calendar-icon"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MonthStatsTable;
