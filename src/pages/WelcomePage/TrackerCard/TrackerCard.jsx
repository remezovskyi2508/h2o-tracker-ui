import React from 'react';
import css from './TrackerCard.module.css';
import BenefitItem from '../BenefitItem/BenefitItem';

const TrackerCard = () => {
  return (
    <div className={css.tracker_card}>
      <h1 className={css.titel}>Water consumption tracker</h1>
      <h2 className={css.subheading}>Record daily water intake and track</h2>
      <h3 className={css.titel_block_benefits}>Tracker Benefits</h3>
      <ul className={css.benefits_list}>
        <BenefitItem icon="icon-calendar" text="Habit drive" />
        <BenefitItem icon="icon-statisctic" text="View statistics" />
        <BenefitItem icon="icon-wrench" text="Personal rate setting" />
      </ul>
      <button className={css.signup_btn_tracker}>Try tracker</button>
    </div>
  );
};

export default TrackerCard;
