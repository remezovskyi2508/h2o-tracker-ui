import { useEffect, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import css from './TodayListModal.module.css';
import closeIcon from './icon-close.svg';
import glassIcon from './icon-glass.svg';
// import minusIcon from './icon-minus.svg';
// import plusIcon from './icon-plus.svg';
import { fakeData } from './fakeData.js';
import TodayListModalForm from '../TodayListModalForm/TodayListModalForm.jsx';
// import { useDispatch } from 'react-redux';
// import { addWater, updateWater } from './operations.js';

const TodayListModal = ({
  isOpen,
  onClose,
  // data,
  operationType,
}) => {
  const data = fakeData;

  const [initialState, setInitialState] = useState({
    time: '',
    count: data ? data.volume : 50,
  });

  // const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;

      setInitialState(prevState => ({
        ...prevState,
        time: currentTime,
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

  // const waterFormValidationSchema = Yup.object().shape({
  //   count: Yup.number()
  //     .required('Water amount is required')
  //     .min(1, 'Minimum value is 1 ml')
  //     .max(5000, 'Maximum value is 5000 ml'),
  //   time: Yup.string()
  //     .required('Recording time is required')
  //     .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  // });

  const handleSubmit = values => {
    if (values.count <= 0) {
      return;
    }

    const updatedData = {
      volume: values.count,
      time: `2025-02-01T${values.time}:00`,
    };

    switch (operationType) {
      case 'add': {
        // const result = dispatch(addWater(updatedData));
        const result = updatedData;
        if (!result.error) {
          console.log(result);
          alert(JSON.stringify(result, null, 2));
          onClose();
        }
        break;
      }
      case 'edit': {
        // const result = dispatch(updateWater({ ...data, ...updatedData }));
        const result = { ...data, ...updatedData };
        if (!result.error) {
          console.log(result);
          alert(JSON.stringify(result, null, 2));
          onClose();
        }
        break;
      }
      default:
        break;
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
                    <p className={css.modalOldAmountVolume}>{data.volume} ml</p>
                    <p className={css.modalOldAmountTime}>
                      {new Date(data.time)
                        .getUTCHours()
                        .toString()
                        .padStart(2, '0')}
                      :
                      {new Date(data.time)
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, '0')}
                    </p>
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

              {/* <Formik
                initialValues={initialState}
                enableReinitialize={true}
                validationSchema={waterFormValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values }) => {
                  return (
                    <>
                      <Form>
                        <p className={css.modalText}>Amount of water:</p>
                        <div className={css.modalAmountBox}>
                          <button
                            className={css.modalAmountBoxBtn}
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                'count',
                                Math.max(values.count - 50)
                              )
                            }
                            disabled={values.count <= 1}
                          >
                            <img src={minusIcon} alt="Minus icon" />
                          </button>
                          <p className={css.modalAmountBoxText}>
                            {values.count} ml
                          </p>
                          <button
                            className={css.modalAmountBoxBtn}
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                'count',
                                Math.min(values.count + 50)
                              )
                            }
                            disabled={values.count >= 5000}
                          >
                            <img src={plusIcon} alt="Plus icon" />
                          </button>
                        </div>
                        <p className={css.modalText}>Recording time:</p>
                        <Field
                          className={css.modalInput}
                          type="time"
                          name="time"
                        />
                        <ErrorMessage
                          name="time"
                          component="div"
                          className={css.error}
                        />
                        <h3 className={css.modalTitleCorrect}>
                          Enter the value of the water used:
                        </h3>
                        <Field
                          className={css.modalInput}
                          type="number"
                          name="count"
                          onChange={event => {
                            let value = Number(event.target.value);
                            if (!isNaN(value) && value >= 0 && value <= 99999) {
                              setFieldValue('count', value);
                            }
                          }}
                          onClick={event => event.stopPropagation()}
                        />
                        <ErrorMessage
                          name="count"
                          component="div"
                          className={css.error}
                        />
                        <div className={css.modalSaveBox}>
                          <p className={css.modalSaveBoxCount}>
                            {values.count} ml
                          </p>
                          <button type="submit" className={css.modalSaveBtn}>
                            Save
                          </button>
                        </div>
                      </Form>
                    </>
                  );
                }}
              </Formik> */}
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
