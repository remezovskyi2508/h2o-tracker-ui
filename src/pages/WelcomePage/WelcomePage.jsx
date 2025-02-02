// import React from 'react';
import css from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.wrapper}>
          <div className={css.tracker_card}>
            <h1 className={css.titel}>Water consumption tracker</h1>
            <h2 className={css.subheading}>
              Record daily water intake and track
            </h2>
            <h3 className={css.titel_block_benefits}>Tracker Benefits</h3>

            <ul className={css.benefits_list}>
              <li className={css.benefits_list_item}>
                <svg className={css.icon_benefits}>
                  <use href="/public/images/symbol-defs.svg#icon-calendar"></use>
                </svg>
                <p>Habit drive</p>
              </li>
              <li className={css.benefits_list_item}>
                {' '}
                <svg className={css.icon_benefits}>
                  <use href="/public/images/symbol-defs.svg#icon-statisctic"></use>
                </svg>
                <p>View statistics</p>
              </li>
              <li className={css.benefits_list_item}>
                {' '}
                <svg className={css.icon_benefits}>
                  <use href="/public/images/symbol-defs.svg#icon-wrench"></use>
                </svg>
                <p>Personal rate setting</p>
              </li>
            </ul>
            <button className={css.signup_btn_tracker}>Try tracker</button>
          </div>

          <div className={css.benefits_card}>
            <h3 className={css.titel_benefits_card}>Why drink water</h3>

            <ul className={css.benefits_card_list}>
              <li className={css.benefits_card_item}>
                <svg height="8" width="8">
                  <use href="/public/images/symbol-defs.svg#icon-point"></use>
                </svg>
                Supply of nutrients to all organs
              </li>
              <li className={css.benefits_card_item}>
                <svg height="8" width="8">
                  <use href="/public/images/symbol-defs.svg#icon-point"></use>
                </svg>
                Providing oxygen to the lungs
              </li>
              <li className={css.benefits_card_item}>
                <svg height="8" width="8">
                  <use href="/public/images/symbol-defs.svg#icon-point"></use>
                </svg>
                Maintaining the work of the heart
              </li>
              <li className={css.benefits_card_item}>
                <svg height="8" width="8">
                  <use href="/public/images/symbol-defs.svg#icon-point"></use>
                </svg>
                Release of processed substances
              </li>
              <li className={css.benefits_card_item}>
                <svg height="8" width="8">
                  <use href="/public/images/symbol-defs.svg#icon-point"></use>
                </svg>
                Ensuring the stability of the internal environment
              </li>
              <li className={css.benefits_card_item}>
                <svg height="8" width="8">
                  <use href="/public/images/symbol-defs.svg#icon-point"></use>
                </svg>
                Maintaining within the normal temperature
              </li>
              <li className={css.benefits_card_item}>
                <svg height="8" width="8">
                  <use href="/public/images/symbol-defs.svg#icon-point"></use>
                </svg>
                Maintaining an immune system capable of resisting disease
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
