import { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { IoIosRemove } from 'react-icons/io';
import ResizableSlider from '../ResizableSlider/ResizableSlider';

import css from './WaterRatioPanel.module.css';
import TodayListModal from '../TodayListModal/TodayListModal';

const WaterRatioPanel = () => {
  const [waterData, setWaterData] = useState({
    norma: '1.5L',
    percentage: '40%',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const norma = parseFloat(waterData.norma) * 1000;
  const percentage = Number(parseFloat(waterData.percentage).toFixed(1)) || 0;

  const step = (250 * 100) / norma;

  const onChange = value => {
    const roundedValue = Number(value.toFixed(1));
    setWaterData({
      ...waterData,
      percentage: `${roundedValue}%`,
    });
    /* savePercentageToDB(roundedValue); */ // Збереження у БД
  };

  return (
    <div className={css.section}>
      <div className={css.radio}>
        <h3 className={css.title}>Today</h3>
        <ResizableSlider
          percentage={percentage}
          onChange={onChange}
          step={step}
        />

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
