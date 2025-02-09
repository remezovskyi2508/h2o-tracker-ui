import css from './WelcomePage.module.css';
import TrackerCard from './TrackerCard/TrackerCard.jsx';
import BenefitsCard from './BenefitsCard/BenefitsCard.jsx';

const WelcomePage = () => {
  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.wrapper}>
          <TrackerCard />
          <BenefitsCard />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
