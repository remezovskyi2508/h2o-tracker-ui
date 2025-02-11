import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import css from './HomePage.module.css';
import { selectToken } from '../../redux/auth/selectors.js';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const token = useSelector(selectToken);
  console.log("Home Page Token: ", token);

  return (
    
    <div className={css.background}>
      <div className={css.wrapper}>
        <div className={css.leftSide}>
          <DailyNorma />
          <WaterRatioPanel />
        </div>
        <div className={css.rightSide}>
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
