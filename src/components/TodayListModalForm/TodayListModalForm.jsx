import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import minusIcon from './icon-minus.svg';
import plusIcon from './icon-plus.svg';

import css from './TodayListModalForm.module.css';

const TodayListModalForm = ({ initialState, handleSubmit }) => {
  const waterFormValidationSchema = Yup.object().shape({
    count: Yup.number()
      .required('Water amount is required')
      .min(1, 'Minimum value is 1 ml')
      .max(5000, 'Maximum value is 5000 ml'),
    time: Yup.string()
      .required('Recording time is required')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
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
                    setFieldValue('count', Math.max(values.count - 50, 1))
                  }
                  disabled={values.count <= 1}
                >
                  <img src={minusIcon} alt="Minus icon" />
                </button>
                <p className={css.modalAmountBoxText}>{values.count} ml</p>
                <button
                  className={css.modalAmountBoxBtn}
                  type="button"
                  onClick={() =>
                    setFieldValue('count', Math.min(values.count + 50, 5000))
                  }
                  disabled={values.count >= 5000}
                >
                  <img src={plusIcon} alt="Plus icon" />
                </button>
              </div>
              <p className={css.modalText}>Recording time:</p>
              <Field className={css.modalInput} type="time" name="time" />
              <ErrorMessage name="time" component="div" className={css.error} />
              <h3 className={css.modalTitleCorrect}>
                Enter the value of the water used:
              </h3>
              <Field
                className={css.modalInput}
                type="number"
                name="count"
                onChange={event => {
                  let value = Number(event.target.value);
                  if (!isNaN(value) && value >= 1 && value <= 99999) {
                    setFieldValue('count', value);
                  }
                }}
              />
              <ErrorMessage
                name="count"
                component="div"
                className={css.error}
              />
              <div className={css.modalSaveBox}>
                <p className={css.modalSaveBoxCount}>{values.count} ml</p>
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
