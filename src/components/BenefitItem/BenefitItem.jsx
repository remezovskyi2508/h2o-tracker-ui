import React from 'react';
import css from './BenefitItem.module.css';

const BenefitItem = ({ icon, text }) => {
  return (
    <li className={css.benefits_list_item}>
      <svg className={css.icon_benefits}>
        <use href={`/images/symbol-defs.svg#${icon}`}></use>
      </svg>
      <p>{text}</p>
    </li>
  );
};

export default BenefitItem;
