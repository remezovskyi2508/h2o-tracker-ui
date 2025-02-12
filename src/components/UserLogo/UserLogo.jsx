import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/user/selectors.js';
import { selectUserId } from '../../redux/auth/selectors.js';
import { fetchUserInfo } from '../../redux/user/operations.js';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import style from './UserLogo.module.css';

export const UserLogo = () => {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (userId && !userData) {
      dispatch(fetchUserInfo(userId));
    }
  }, [userId, userData, dispatch]);

  const toggleModal = () => setUserModalOpen(prev => !prev);

  return (
    <div className={style.container}>
      <button onClick={toggleModal} className={style.svgBtn}>
        <div className={style.user}>
          <span className={style.userName}>
            {userData?.name || userData?.email?.split('@')[0] || 'User'}
          </span>
          {userData?.avatar ? (
            <img
              src={userData.avatar.url}
              alt="User"
              className={style.avatar}
            />
          ) : (
            <div className={style.initials}>
              {userData?.name?.[0]?.toUpperCase() ||
                userData?.email?.[0]?.toUpperCase()}
            </div>
          )}
          <svg className={style.icon} width="11" height="6">
            <use href="/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </button>

      {isUserModalOpen && (
        <UserLogoModal isOpen={isUserModalOpen} onClick={toggleModal} />
      )}
    </div>
  );
};

export default UserLogo;
