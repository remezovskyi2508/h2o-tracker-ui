import { useEffect, useState } from 'react';
import style from './UserLogo.module.css';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/user/selectors.js';
import { selectUserId } from '../../redux/auth/selectors.js';
import { fetchUserInfo } from '../../redux/user/operations.js';

export const UserLogo = () => {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const toggleModal = () => {
    setUserModalOpen(prev => !prev);
  };
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);
  useEffect(() => {
    if (userId) {
      if (userData) {
        dispatch(fetchUserInfo(userId));
      }
    }
  },[]);

  return (
    <>
      <button onClick={toggleModal} type="button" className={style.svgBtn}>
        <div className={style.user}>
          <span className={style.userName}>
            {userData?.name || userData?.email?.split('@')[0] || 'User'}
          </span>
          <div>
            {userData?.avatar ? (
              <img
                src={userData?.avatar?.url}
                alt="User"
                className={style.avatar}
              />
            ) : (
              <div className={style.initials}>
                {userData?.name?.[0]?.toUpperCase() ||
                  userData?.email?.split('@')[0]?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <svg className={style.icon} width="12" height="7">
              <use href="/images/icons.svg#icon-vector"></use>
            </svg>
          </div>
        </div>
      </button>

      <div className={`${style.wrapper} ${isUserModalOpen ? style.show : ''}`}>
        <UserLogoModal isOpen={isUserModalOpen} onClose={toggleModal} />
      </div>
    </>
  );
};

export default UserLogo;
