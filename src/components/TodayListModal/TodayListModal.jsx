import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addWater,
  fetchWaterToday,
  fetchWaterMonth,
  updateWater,
} from '../../redux/water/operations.js';
import TodayListModalForm from '../TodayListModalForm/TodayListModalForm.jsx';
import closeIcon from '/images/icon-close.svg?url';
import glassIcon from '/images/icon-glass.svg?url';
import css from './TodayListModal.module.css';

const TodayListModal = ({ isOpen, onClose, data, operationType }) => {
  const dispatch = useDispatch();

  const [initialState, setInitialState] = useState({
    date: '',
    waterVolume: data ? data.waterVolume : 0,
  });
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const oldDate = data
    ? `${new Date(data.date)
        .getUTCHours()
        .toString()
        .padStart(2, '0')}:${new Date(data.date)
        .getUTCMinutes()
        .toString()
        .padStart(2, '0')}`
    : '';

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const currentDate = `${hours}:${minutes}`;

      setInitialState(prevState => ({
        ...prevState,
        date: currentDate,
      }));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onWrapperClick = event => {
    if (event.target.classList.contains(css.modalWrapper)) onClose();
  };

  const handleSubmit = async values => {
    if (values.waterVolume <= 0) {
      return;
    }

    const convertDate = dateBefore => {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const dateTimeStr = `${date}T${dateBefore}:00.000Z`;
      return dateTimeStr;
    };

    const time = values.date;
    const timeToSend = convertDate(time);

    const waterData = {
      waterVolume: values.waterVolume,
      date: timeToSend,
    };

    try {
      let result;

      switch (operationType) {
        case 'add': {
          result = await dispatch(addWater(waterData));
          if (!result.error) {
            dispatch(fetchWaterToday());
            dispatch(fetchWaterMonth({ year, month }));
            onClose();
          }
          break;
        }
        case 'edit': {
          result = await dispatch(
            updateWater({
              id: data._id,
              waterVolume: waterData.waterVolume,
              date: waterData.date,
            })
          );
          if (!result.error) {
            dispatch(fetchWaterToday());
            dispatch(fetchWaterMonth({ year, month }));
            onClose();
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      null
    }
  };

  return (
    <>
      {isOpen && (
        <div className={css.modal}>
          <div className={css.modalWrapper} onClick={onWrapperClick}>
            <div className={css.modalContent}>
              <button
                type="button"
                className={css.modalCloseButton}
                onClick={() => onClose()}
              >
                <img src={closeIcon} alt="Close icon" />
              </button>
              {operationType === 'edit' && (
                <div>
                  <h2 className={css.modalTitle}>
                    Edit the entered amount of water
                  </h2>
                  <div className={css.modalOldAmount}>
                    <p>
                      <img src={glassIcon} alt="Glass of water icon" />
                    </p>
                    <p className={css.modalOldAmountVolume}>
                      {data.waterVolume} ml
                    </p>
                    <p className={css.modalOldAmountTime}>{oldDate}</p>
                  </div>
                  <h3 className={css.modalTitleNew}>Correct entered data:</h3>
                </div>
              )}
              {operationType === 'add' && (
                <div>
                  <h2 className={css.modalTitle}>Add water</h2>
                  <h3 className={css.modalTitleNew}>Choose a value:</h3>
                </div>
              )}

              <TodayListModalForm
                initialState={initialState}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodayListModal;
