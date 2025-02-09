import { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { IoIosRemove } from 'react-icons/io';

import css from './WaterRatioPanel.module.css';
import TodayListModal from '../TodayListModal/TodayListModal';
import { useSelector } from 'react-redux';
import { selectWaterToday } from '../../redux/water/selectors';

const WaterRatioPanel = () => {
  const waterData = useSelector(selectWaterToday);
  console.log(waterData);

  // const [waterData, setWaterData] = useState({
  //   percentage: '70%',
  // });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const percentage = Number(parseFloat(waterData.percentage).toFixed(1)) || 0;

  return (
    <div className={css.section}>
      <div className={css.radio}>
        <h3 className={css.title}>Today</h3>
        <div className={css.dial}>
          <p className={css.percentage} style={{ left: `${percentage}%` }}>
            {percentage}%
          </p>
          <div
            className={css.factpercent}
            style={{ width: `${percentage}%` }}
          />

          <div
            className={css.point}
            style={{ left: `calc(${percentage}% - 7px)` }} // Центруємо точку
          />
        </div>

        <div className={css.percent}>
          <div className={css.percent_icon}>
            <IoIosRemove className={css.icon} />
            <IoIosRemove className={css.icon} />
            <IoIosRemove className={css.icon} />
          </div>
          <div className={css.percent_number}>
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      <div className={css.btn_section}>
        <button
          className={css.btn}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          <GrAddCircle className={css.icon_btn} />
          <span>Add Water</span>
        </button>
        {isModalOpen && (
          <TodayListModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            operationType="add"
          />
        )}
      </div>
    </div>
  );
};

export default WaterRatioPanel;
