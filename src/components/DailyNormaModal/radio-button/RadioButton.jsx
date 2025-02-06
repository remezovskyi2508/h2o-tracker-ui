import styles from './RadioButton.module.css';

const RadioButton = ({ value, selectedValue, onChange, label }) => {
  return (
    <label className={styles.radioLabel}>
      <input
        type='radio'
        value={value}
        checked={value === selectedValue}
        onChange={onChange}
      />
      <span className={styles.customRadio}></span>
      {label}
    </label>
  );
};

export default RadioButton;
