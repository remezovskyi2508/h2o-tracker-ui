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

  const updateDailyNorm = async newNorm => {
    try {
      const response = await fetch('/api/update-daily-norm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dailyNorm: newNorm * 1000 }),
      });

      if (!response.ok) {
        throw new Error('Failed to update daily norm');
      }

      console.log('Daily norm updated successfully');
    } catch (error) {
      console.error('Error updating daily norm:', error);
    }
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
          setDailyNorm={newNorm => {
            setDailyNorm(newNorm);
            updateDailyNorm(newNorm);
          }}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DailyNorma;
