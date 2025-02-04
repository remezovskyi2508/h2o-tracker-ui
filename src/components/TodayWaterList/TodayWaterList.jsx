import { useState, useEffect } from 'react'
import styles from "./TodayWaterList.module.css"
import axios from 'axios'
import TodayWaterListElement from '../TodayWaterListElement/TodayWaterListElement'
import TodayListModal from '../TodayListModal/TodayListModal'

const TodayWaterList = () => {
  const [loading, setLoading] = useState(true);
  const [waterData, setWaterData] = useState([]);
  const [isOpenAddWaterModal, setIsOpenAddWaterModal] = useState(false);

  const operationType = 'add';

  const fetchWaterData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/water-intake');
      setWaterData(response.data);
    } catch (err) {
      console.error('Помилка отримання даних:', err);      
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaterData();
  }, []);

  const closeModalAndUpdate = (setModalState) => {
    setModalState(false);
    fetchWaterData();
  };

  return (
    <div className={styles.todayWaterListBox}>
      <h3 className={styles.waterListToday}>Today</h3>
      <ul className={styles.waterListBox}>
        {loading ? (
          <p>Loading...</p>
        ):(
          waterData.map(({id, amount, time}) => (
            <li key={id} className={styles.waterElement}>
              <TodayWaterListElement id={id} amount={amount} time={time} closeModalAndUpdate={closeModalAndUpdate}/>
            </li>
          ))
          
        )}
      </ul>
        <div>
          <button onClick={() => setIsOpenAddWaterModal(true)} className={styles.AddWaterModalBtn}>
            <svg className={styles.plusSvg} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4V12M12 8H4" stroke="#407BFF" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h5 className={styles.AddWaterBtnText}>Add water</h5>
          </button>
          {isOpenAddWaterModal && <TodayListModal onClose={() => closeModalAndUpdate(setIsOpenAddWaterModal)} operationType={operationType} isOpen={isOpenAddWaterModal}/>}
        </div>
    </div>
  )
}

export default TodayWaterList
