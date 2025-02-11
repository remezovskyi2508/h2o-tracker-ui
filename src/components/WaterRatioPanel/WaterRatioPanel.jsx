import { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { IoIosRemove } from 'react-icons/io';

import css from './WaterRatioPanel.module.css';
import TodayListModal from '../TodayListModal/TodayListModal';
import { useSelector } from 'react-redux';
import { selectWaterToday } from '../../redux/water/selectors';
import { selectUserInfo } from '../../redux/user/selectors.js';

const WaterRatioPanel = () => {

  const waterData = useSelector(selectWaterToday); 
  const userData = useSelector(selectUserInfo);
  const dailyNorm = userData.dailyNorm;
  
  // const [waterData, setWaterData] = useState({
  //   percentage: '70%',
  // });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalWater = waterData.records?.reduce((total, record) => total + record.waterVolume, 0) || 0;
  const percentage = Math.min((totalWater / dailyNorm) * 100).toFixed(0);
  const limitedPercentage = Math.min(percentage, 100);

  return (
    <div className={css.section}>
      <div className={css.radio}>
        <h3 className={css.title}>Today</h3>
        <div className={css.dial}>
          <p className={css.percentage} style={{ left: `${limitedPercentage}%` }}>
           {percentage}%
          </p>
          <div
            className={css.factpercent}
            style={{ width: `${limitedPercentage}%` }}
          />

          <div
            className={css.point}
            style={{ left: `calc(${limitedPercentage}% - 7px)` }} // Центруємо точку
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
            data={waterData.records?.[waterData.records.length - 1]}
          />
        )}
      </div>
    </div>
  );
};

export default WaterRatioPanel;
