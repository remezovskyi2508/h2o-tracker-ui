import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/user/selectors.js';
import { selectUserId } from '../../redux/auth/selectors.js';
import { fetchUserInfo } from '../../redux/user/operations.js';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import SettingModal from '../SettingModal/SettingModal';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
import style from './UserLogo.module.css';

export const UserLogo = () => {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (userId && !userData) {
      dispatch(fetchUserInfo(userId));
    }
  }, [userId, userData, dispatch]);

  const handleButtonClick = () => {
    setUserModalOpen(!isUserModalOpen);
  };

  const openSettingModal = () => {
    setIsSettingModalOpen(true);
    setUserModalOpen(false);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setUserModalOpen(false);
  };

  const closeAllModals = () => {
    setUserModalOpen(false);
    setIsSettingModalOpen(false);
    setIsLogoutModalOpen(false);
  };

  return (
    <div className={style.container} style={{ position: 'relative' }}>
      <button
        type="button"
        className={style.svgBtn}
        onClick={handleButtonClick}
      >
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
          <svg
            className={`${style.icon} ${
              isUserModalOpen ? style.iconRotated : ''
            }`}
            width="11"
            height="6"
          >
            <use href="/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </button>

      {isUserModalOpen && (
        <div style={{ position: 'relative' }}>
          <UserLogoModal
            isOpen={isUserModalOpen}
            onClose={closeAllModals}
            onOpenSetting={openSettingModal}
            onOpenLogout={openLogoutModal}
          />
        </div>
      )}

      {isSettingModalOpen && (
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={() => setIsSettingModalOpen(false)}
        />
      )}

      {isLogoutModalOpen && (
        <UserLogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserLogo;
