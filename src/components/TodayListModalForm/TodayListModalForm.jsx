import { useState, useEffect, useRef, useCallback } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import minusIcon from '/images/icon-minus.svg?url';
import plusIcon from '/images/icon-plus.svg?url';

import css from './TodayListModalForm.module.css';

const TodayListModalForm = ({
  initialState,
  handleSubmit,
  operationType,
  oldDataDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const waterFormValidationSchema = Yup.object().shape({
    waterVolume: Yup.number()
      .required('Water amount is required')
      .min(1, 'Minimum value is 1 ml')
      .max(5000, 'Maximum value is 5000 ml'),
    date: Yup.string()
      .required('Recording date is required')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid date format'),
  });

  const generateTimeOptions = () => {
    const options = [];
    let currentTime = new Date();
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);
    currentTime.setHours(currentTime.getHours() - 12);

    for (let i = 0; i < 24 * 12; i++) {
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');
      options.push(`${hours}:${minutes}`);
      currentTime.setMinutes(currentTime.getMinutes() + 5);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const getCurrentTime = () => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatOldDataDate = oldDataDate => {
    const date = new Date(oldDataDate);
    // Извлекаем часы и минуты из строки ISO без изменения часового пояса
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (operationType === 'edit' && oldDataDate) {
      setSelectedTime(formatOldDataDate(oldDataDate)); // Преобразуем старое время в нужный формат без сдвига по времени
    } else {
      setSelectedTime(getCurrentTime()); // В другом случае устанавливаем текущее время
    }

    const handleClickOutside = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [operationType, oldDataDate]);

  const scrollToTime = useCallback(() => {
    if (dropdownRef.current && selectedTime) {
      const timeItems = dropdownRef.current.querySelectorAll('li');
      const selectedItem = Array.from(timeItems).find(
        item => item.textContent === selectedTime
      );
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [selectedTime]);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectTime = (time, setFieldValue) => {
    setSelectedTime(time);
    setFieldValue('date', time);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToTime();
      }, 50);
    }
  }, [isOpen, scrollToTime]);

  return (
    <Formik
      initialValues={initialState}
      enableReinitialize={true}
      validationSchema={waterFormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <p className={css.modalText}>Amount of water:</p>
          <div className={css.modalAmountBox}>
            <button
              className={css.modalAmountBoxBtn}
              type="button"
              onClick={() =>
                setFieldValue(
                  'waterVolume',
                  Math.max(Number(values.waterVolume) - 50, 1)
                )
              }
              disabled={values.waterVolume <= 1}
            >
              <img src={minusIcon} alt="Minus icon" />
            </button>
            <p className={css.modalAmountBoxText}>
              {values.waterVolume || 0} ml
            </p>
            <button
              className={css.modalAmountBoxBtn}
              type="button"
              onClick={() =>
                setFieldValue(
                  'waterVolume',
                  Math.min(Number(values.waterVolume) + 50, 5000)
                )
              }
              disabled={values.waterVolume >= 5000}
            >
              <img src={plusIcon} alt="Plus icon" />
            </button>
          </div>

          <p className={css.modalText}>Recording time:</p>

          <div className={css.modalTimeInputWrapper}>
            <button
              ref={buttonRef}
              type="button"
              className={css.modalTimeInput}
              onClick={handleOpenDropdown}
            >
              {selectedTime}
            </button>
            {isOpen && (
              <ul ref={dropdownRef} className={css.modalTimeInputList}>
                {timeOptions.map(time => (
                  <li
                    key={time}
                    className={css.modalTimeInputItem}
                    onClick={() => handleSelectTime(time, setFieldValue)}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ErrorMessage name="date" component="div" className={css.error} />

          <h3 className={css.modalTitleCorrect}>
            Enter the value of the water used:
          </h3>
          <Field
            className={css.modalInput}
            type="number"
            name="waterVolume"
            placeholder="0"
            onChange={event => {
              let value = event.target.value;
              if (value.startsWith('0') && value.length > 1) {
                value = value.substring(1);
              }
              if (!isNaN(value) && value <= 99999) {
                setFieldValue('waterVolume', value);
              }
            }}
          />
          <ErrorMessage
            name="waterVolume"
            component="div"
            className={css.error}
          />
          <div className={css.modalSaveBox}>
            <p className={css.modalSaveBoxCount}>
              {values.waterVolume || 0} ml
            </p>
            <button type="submit" className={css.modalSaveBtn}>
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TodayListModalForm;
