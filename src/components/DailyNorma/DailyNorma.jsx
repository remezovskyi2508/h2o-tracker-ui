import { useEffect, useState } from 'react';
import css from './DailyNorma.module.css';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';
import Button from './button/Button.jsx';
import { selectUserInfo } from '../../redux/user/selectors.js';
import { selectUserId } from '../../redux/auth/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../redux/user/operations.js';

const DailyNorma = () => {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (userData) {
      dispatch(fetchUserInfo(userId));
    }
  }, [dispatch, userId]);

  const [dailyNorm, setDailyNorm] = useState(userData?.dailyNorm / 1000 || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userData?.dailyNorm) {
      setDailyNorm(userData.dailyNorm / 1000);
    }
  }, [userData]);

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
