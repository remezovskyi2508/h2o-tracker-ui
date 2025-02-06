import { useState } from 'react';
import css from './DailyNorma.module.css';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';
import Button from './button/Button.jsx';

const DailyNorma = () => {
  // const user = useSelector(selectUser);

  const user = { dailyNorm: 2000 };

  const [dailyNorm, setDailyNorm] = useState(user?.dailyNorm / 1000 || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>My daily norma</h2>
      <div className={css.value}>
        <span className={css.norma}>
          {dailyNorm > 0 ? `${dailyNorm} L` : 'No data available'}
        </span>
        <Button
          types={'text'}
          className={css.editButton}
          onClick={handleEditClick}
        >
          Edit
        </Button>
      </div>
      {isModalOpen && (
        <DailyNormaModal
          setDailyNorm={setDailyNorm}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DailyNorma;
