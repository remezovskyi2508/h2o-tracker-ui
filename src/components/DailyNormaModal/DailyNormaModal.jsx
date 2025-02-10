import { useState } from 'react';
import css from './DailyNormaModal.module.css';

import toast from 'react-hot-toast';
import Modal from './Modal/Modal.jsx';
import RadioButton from './radio-button/RadioButton.jsx';
import Button from '../DailyNorma/button/Button.jsx';
import { dailyNormUpd } from '../../redux/water/operations.js';
import { useDispatch } from 'react-redux';

const DAILY_NORMA = 15000;

const DailyNormaModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [gender, setGender] = useState('woman');

  const [m, setM] = useState(0);
  const [t, setT] = useState(0);

  const amountWaterPerDay =
    gender === 'woman' ? m * 0.03 + t * 0.4 : m * 0.04 + t * 0.6;
  const [customNorm, setCustomNorm] = useState('');

  const handleSave = async () => {
    const normToSave = Number(customNorm)
      ? Number(customNorm) / 1000
      : amountWaterPerDay;

    if (normToSave > 0 && normToSave <= DAILY_NORMA) {
      // Замість виклику dispatch, просто виводимо результат
      await dispatch(dailyNormUpd({ dailyNorm: normToSave * 1000 }));
      toast.success('New daily norma added');
      alert(`New daily water norma: ${normToSave.toFixed(2)} liters`);
      onClose(); // Закриваємо модальне вікно
    } else {
      toast.error('Wrong data');
      return;
    }
  };

  return (
    <Modal title="My daily norma" classNameModal={css.modal} onClose={onClose}>
      <ul className={css.formulas}>
        <li className={css.formulasItem}>
          <span>For girl:</span>
          <span className={css.formula}> V=(M*0,03) + (T*0,4)</span>
        </li>
        <li className={css.formulasItem}>
          <span>For man:</span>
          <span className={css.formula}> V=(M*0,04) + (T*0,6)</span>
        </li>
      </ul>
      <div className={css.desc}>
        <span>*</span> V is the volume of the water norm in liters per day, M is
        your body weight, T is the time of active sports, or another type of
        activity commensurate in terms of loads (in the absence of these, you
        must set 0)
      </div>
      <div>
        <h3 className={css.subtitle}>Calculate your rate:</h3>
        <div className={css.radioGroup}>
          <RadioButton
            label="For woman"
            value="woman"
            onChange={e => setGender(e.target.value)}
            selectedValue={gender}
          />
          <RadioButton
            label="For man"
            value="man"
            onChange={e => setGender(e.target.value)}
            selectedValue={gender}
          />
        </div>
      </div>
      <div>
        <div className={css.inputWithLabel}>
          <label htmlFor={'weight'} className={css.inputLabel}>
            Your weight in kilograms:
          </label>
          <input
            id="weight"
            type="text"
            placeholder="Enter weight"
            className={css.inputField}
            onChange={e => setM(Number(e.target.value))}
          />
        </div>
        <div className={css.inputWithLabel}>
          <label htmlFor={'hours'} className={css.inputLabel}>
            The time of active participation in sports or other activities with
            a high physical. load in hours:
          </label>
          <input
            id="hours"
            type="text"
            placeholder="Enter hours"
            className={css.inputField}
            onChange={e => setT(Number(e.target.value))}
          />
        </div>
        <div className={css.textAmount}>
          <p> The required amount of water in liters per day:</p>
          <span>{m ? amountWaterPerDay.toFixed(1) : 0} L</span>
        </div>
      </div>
      <div className={css.inputWithLabel}>
        <label htmlFor={'waterAmount'} className={css.labelAmount}>
          Write down how much water you will drink:
        </label>
        <input
          id="waterAmount"
          type="text"
          placeholder="Enter amount (ml)"
          className={css.inputField}
          onChange={e => setCustomNorm(e.target.value)}
        />
      </div>
      <Button className={css.btnSave} onClick={handleSave}>
        Save
      </Button>
    </Modal>
  );
};
export default DailyNormaModal;
