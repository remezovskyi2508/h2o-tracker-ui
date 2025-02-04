import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './MonthStatsTable.module.css';
import * as calendar from '../../js/calendar.js';
import clsx from 'clsx';
import { useMemo } from 'react';

import { fetchWaterData } from '../../redux/water/operations.js';
import { selectWater } from '../../redux/water/selectors.js';

const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const days = useSelector(selectWater);
  const currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth()); // Отримаємо стейт місяць поточний
  const [year, setYear] = useState(currentDate.getFullYear()); // Отримаємо стейт рік поточний
  const daysInMonth = useMemo(
    () => calendar.getDaysInMonth(month, year),
    [month, year]
  ); // Отримуємо кількість днів маючи місяць і рік
  const monthName = useMemo(
    () => calendar.getMonthName(year, month),
    [year, month]
  ); // Трансформуємо число в назву місяця

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

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchWaterData());
    };
    fetchData();
  }, [dispatch, month, year]);

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
        {Array.from({ length: daysInMonth }, (_, index) => {
          const dayInCalendar = index + 1;
          const dayData = days?.find(day => {
            // console.log("Calendar: ", dayInCalendar, monthName);

            const [dayStr, monthStrData] = day.date.split(', ');
            const dayIntData = parseInt(dayStr);
            console.log('MonthData:', monthStrData);
            console.log('NrIntData:', dayIntData);
            return dayIntData === dayInCalendar && monthStrData === monthName;
          });

          const percent = dayData
            ? parseInt(dayData.percentage.replace('%', ''))
            : 0;

          return (
            <li key={index} className={css.calendarDay}>
              <div
                className={clsx(css.calendarCircle, {
                  [css.calendarCircleEmpty]: percent === 0,
                  [css.calendarCircleFull]: percent === 100,
                })}
              >
                {dayInCalendar}
              </div>
              <div className={css.waterAim}>{percent} %</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
