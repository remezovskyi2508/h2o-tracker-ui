/* import axios from 'axios';
import { useEffect } from 'react'; */
import { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { IoIosRemove } from 'react-icons/io';

import css from './WaterRatioPanel.module.css';

const WaterRatioPanel = () => {
  const [waterData, setWaterData] = useState({
    norma: 1500,
    actual: 400,
  });
  /* const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 */
  const [isModalOpen, setIsModalOpen] = useState(false);
  /* const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  ); */

  const date = new Date().toISOString().slice(0, 16);
  console.log(date);
  /*  useEffect(() => {
    axios
      .get(`http://localhost:3000/water-intake?date=${selectedDate}`);
      .then(response => {
        setWaterData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError('Помилка завантаження даних');
        setLoading(false);
      });
  }, [selectedDate]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>; */

  const percentage = Math.round((waterData.actual / waterData.norma) * 100);

  return (
    <div className={css.section}>
      <div className={css.radio}>
        <h3 className={css.title}>Today</h3>
        <p className={css.percentage}> {percentage}%</p>
        <div className={css.dial}>
          <div
            className={css.factpercent}
            style={{ width: `${percentage}%` }}
          />

          <div className={css.point} style={{ left: `${percentage}%` }} />
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
        {isModalOpen && <></>}
      </div>
    </div>
  );
};

export default WaterRatioPanel;
