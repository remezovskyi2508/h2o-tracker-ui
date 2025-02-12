import css from './BenefitCardItem.module.css';

const BenefitCardItem = ({ text }) => {
  return (
    <li className={css.benefits_card_item}>
      <svg height="8" width="8">
        <use href="/images/icons.svg#icon-point"></use>
      </svg>
      {text}
    </li>
  );
};

export default BenefitCardItem;
