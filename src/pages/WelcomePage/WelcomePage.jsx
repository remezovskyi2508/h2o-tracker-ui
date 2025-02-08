import css from './WelcomePage.module.css';
import WaterСonsumptionTracker from '../../components/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx';
import WhyDrinkWater from '../../components/WhyDrinkWater/WhyDrinkWater.jsx';

const WelcomePage = () => {
  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.wrapper}>
          <WaterСonsumptionTracker />
          <WhyDrinkWater />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
