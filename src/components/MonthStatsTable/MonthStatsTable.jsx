import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import css from './MonthStatsTable.module.css';
import * as calendar from '../../js/calendar.js';
import clsx from 'clsx';
import { useMemo } from 'react';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';

import { fetchWaterMonth } from '../../redux/water/operations.js';
import { selectWaterMonth } from '../../redux/water/selectors.js';

const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const days = useSelector(selectWaterMonth);
  const currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth()); // Отримаємо стейт місяць поточний
  const [year, setYear] = useState(currentDate.getFullYear()); // Отримаємо стейт рік поточний

  // Отримуємо кількість днів маючи місяць і рік
  const daysInMonth = useMemo(
    () => calendar.getDaysInMonth(month, year),
    [month, year]
  );

  // Трансформуємо число в назву місяця
  const monthName = useMemo(
    () => calendar.getMonthName(year, month),
    [year, month]
  );

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

  // Константа для отримування сьогоднішного місяця і року і використання його для кнопки далі.
  const isNextHidden =
    month === currentDate.getMonth() && year === currentDate.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchWaterMonth({ year, month: month + 1 }));
    };
    fetchData();
  }, [dispatch, month, year]);

  const daysMap = useMemo(() => {
    return days.reduce((acc, day) => {
      const [dayStr, monthStrData] = day.date.split(', ');
      acc[`${dayStr}-${monthStrData}`] = day;
      return acc;
    }, {});
  }, [days]);

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
              <use href="/images/icons.svg#arrow-calendar-icon"></use>
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
              <use href="/images/icons.svg#arrow-calendar-icon"></use>
            </svg>
          </button>
        </li>
      </ul>
      <ul className={css.calendarDays}>
        {Array.from({ length: daysInMonth }, (_, index) => {
          const dayInCalendar = index + 1;
          const dayKey = `${dayInCalendar}-${monthName}`;
          const dayData = daysMap[dayKey];
          const tooltipId = `stats-tooltip-${dayInCalendar}`;

          const percent = dayData
            ? parseInt(dayData.percentage.replace('%', ''))
            : 0;

          return (
            <li
              data-tooltip-id={tooltipId}
              key={index}
              className={css.calendarDay}
            >
              <div
                className={clsx(css.calendarCircle, {
                  [css.calendarCircleEmpty]: percent === 0,
                  [css.calendarCircleFull]: percent >= 100,
                })}
              >
                {dayInCalendar}
              </div>
              <div className={css.waterAim}>{percent} %</div>
              <Tooltip
                id={tooltipId}
                place="top-end"
                style={{
                  backgroundColor: 'var(--prim-color-white)',
                  padding: 0,
                }}
                className={clsx(css.tooltip)}
                // openOnClick="true"
                noArrow="true"
                delayHide={0}
                float="true"
                offset={10}
              >
                {dayData && (
                  <DaysGeneralStats
                    date={dayData.date}
                    dailyNorm={dayData.dailyGoal}
                    percentage={dayData.percentage}
                    consumptionCount={dayData.entries}
                  />
                )}
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
