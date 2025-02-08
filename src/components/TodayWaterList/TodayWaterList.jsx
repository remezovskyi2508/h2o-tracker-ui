import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./TodayWaterList.module.css"
import TodayWaterListElement from '../TodayWaterListElement/TodayWaterListElement.jsx';
import TodayListModal from '../TodayListModal/TodayListModal.jsx'
import { selectWaterToday, selectWaterLoading } from '../../redux/water/selectors.js';
import { fetchWaterToday, deleteWater } from '../../redux/water/operations.js';

const TodayWaterList =() => {
  const [isOpenAddWaterModal, setIsOpenAddWaterModal] = useState(false);
  const todayWaterData = useSelector(selectWaterToday);
  const loading = useSelector(selectWaterLoading);
  const dispatch = useDispatch();

  const closeModal = () => setIsOpenAddWaterModal(false);
  const operationType = 'add';

  useEffect(() => {
    dispatch(fetchWaterToday());
  }, [dispatch]);
  
  const handleDelete = useCallback(async (itemId) => {
    await dispatch(deleteWater(itemId));
    dispatch(fetchWaterToday());
  }, [dispatch]);

  const isArray = Array.isArray(todayWaterData);

  return (
    <div className={styles.todayWaterListBox}>
      <h3 className={styles.waterListToday}>Today</h3>
      <ul className={styles.waterListBox}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          isArray && todayWaterData.length > 0 ? (
            todayWaterData.map((item) => (
              <li key={item._id} className={styles.todayWaterElement}>
                <TodayWaterListElement item={item} handleDelete={handleDelete}/>
              </li>
            ))
          ) : (
            <p>No water data available</p> 
          )
        )}
      </ul>
      <div>
        <button onClick={() => setIsOpenAddWaterModal(true)} className={styles.AddWaterModalBtn}>
          <svg className={styles.plusSvg} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4V12M12 8H4" stroke="#407BFF" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h5 className={styles.AddWaterBtnText}>Add water</h5>
        </button>
        {isOpenAddWaterModal && <TodayListModal onClose={() => closeModal()} operationType={operationType} isOpen={isOpenAddWaterModal}/>}
      </div>
    </div>
  )
}

export default TodayWaterList
