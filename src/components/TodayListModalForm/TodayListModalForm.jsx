import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import minusIcon from '/images/icon-minus.svg?url';
import plusIcon from '/images/icon-plus.svg?url';

import css from './TodayListModalForm.module.css';

const TodayListModalForm = ({ initialState, handleSubmit }) => {
  const waterFormValidationSchema = Yup.object().shape({
    waterVolume: Yup.number()
      .required('Water amount is required')
      .min(1, 'Minimum value is 1 ml')
      .max(5000, 'Maximum value is 5000 ml'),
    date: Yup.string()
      .required('Recording date is required')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid date format'),
  });

  return (
    <Formik
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
              <Field className={css.modalInput} type="time" name="date" />
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
          </>
        );
      }}
    </Formik>
  );
};

export default TodayListModalForm;
