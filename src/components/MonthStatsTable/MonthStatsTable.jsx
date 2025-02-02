import React from 'react';
import css from './MonthStatsTable.module.css';
import { useState } from 'react';
import * as calendar from '../../js/calendar.js';
import clsx from 'clsx';

const MonthStatsTable = () => {
  const currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth()); // Отримаємо стейт місяць поточний
  const [year, setYear] = useState(currentDate.getFullYear()); // Отримаємо стейт рік поточний
  const percent = '60 %';
  const daysInMonth = calendar.getDaysInMonth(month, year); // Отримуємо кількість днів маючи місяць і рік
  const monthName = calendar.getMonthName(year, month); // Трансформуємо число в назву місяця

  // Формуємо правило для кнопок для реалізації зміни місяця і року.
  const handleMonthChange = direction => {
    if (direction === 'prev') {
      setMonth(prev => (prev === 0 ? 11 : prev - 1));
      if (month === 0) setYear(prev => prev - 1);
      return;
    } else {
      setMonth(prev => (prev === 11 ? 0 : prev + 1));
      if (month === 11) setYear(prev => prev + 1);
    }
  };

  const isNextHidden =
    month === currentDate.getMonth() && year === currentDate.getFullYear(); // Константа для отримування сьогоднішного місяця і року і використання його для кнопки далі.

  return (
    <div className={css.calendarWrapper}>
      <ul className={css.calendarHeader}>
        <li className={css.headerItem}>
          <h3 className={css.title}>Month</h3>
        </li>
        <li className={css.headerItem}>
          <button
            className={css.button}
            type="button"
            onClick={() => handleMonthChange('prev')}
          >
            <svg className={css.icon} width="20" height="20">
              <use href="/public/images/icons.svg#arrow-calendar-icon"></use>
            </svg>
          </button>
          <div className={css.dateTitle}>
            {monthName}, {year}
          </div>
          <button
            className={clsx(css.button, { [css.btnInactive]: isNextHidden })}
            type="button"
            onClick={() => handleMonthChange('next')}
          >
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
