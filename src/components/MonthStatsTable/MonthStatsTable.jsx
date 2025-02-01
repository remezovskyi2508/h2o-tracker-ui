import React from 'react';
import css from './MonthStatsTable.module.css';
import { useState } from 'react';
import getMonthName from '../../js/getMonthName.js';

const MonthStatsTable = () => {
  const currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  // const day = currentDate.getDate();
  const percent = '60 %';
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(month, year); // Отримуємо кількість днів
  const monthName = getMonthName(year, month);

  const handleMonthChange = direction => {
    if (direction === 'prev') {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  return (
    <div className={css.calendarWrapper}>
      <ul className={css.calendarHeader}>
        <li className={css.headerItem}>
          <h3 className={css.title}>Month</h3>
        </li>
        <li className={css.headerItem}>
          <button className={css.button} type="button" onClick={()=> handleMonthChange('prev')}>
            <svg className={css.icon} width="20" height="20">
              <use href="/public/images/icons.svg#arrow-calendar-icon"></use>
            </svg>
          </button>
          <div className={css.dateTitle}>
            {monthName}, {year}
          </div>
          <button className={css.button} type="button" onClick={()=> handleMonthChange('next')}>
            <svg className={css.icon} width="20" height="20">
              <use href="/public/images/icons.svg#arrow-calendar-icon"></use>
            </svg>
          </button>
        </li>
      </ul>
      <ul className={css.calendarDays}>
        {Array.from({ length: daysInMonth }, (_, index) => (
          <li key={index} className={css.calendarDay}>
            <div className={css.calendarCircle}>{index + 1}</div>
            <div className={css.waterAim}>{percent}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
