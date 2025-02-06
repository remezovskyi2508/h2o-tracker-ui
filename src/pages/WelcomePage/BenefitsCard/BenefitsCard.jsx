import React from 'react';
import css from './BenefitsCard.module.css';
import BenefitCardItem from '../BenefitCardItem/BenefitCardItem';

const benefitsData = [
  'Supply of nutrients to all organs',
  'Providing oxygen to the lungs',
  'Maintaining the work of the heart',
  'Release of processed substances',
  'Ensuring the stability of the internal environment',
  'Maintaining within the normal temperature',
  'Maintaining an immune system capable of resisting disease',
];

const BenefitsCard = () => {
  return (
    <div className={css.benefits_card}>
      <h3 className={css.titel_benefits_card}>Why drink water</h3>
      <ul className={css.benefits_card_list}>
        {benefitsData.map((text, index) => (
          <BenefitCardItem key={index} text={text} />
        ))}
      </ul>
    </div>
  );
};

export default BenefitsCard;
