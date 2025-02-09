import { useState } from 'react';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import css from './UserLogoModal.module.css';
import SettingModal from '../SettingModal/SettingModal';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
import { useEffect } from 'react';

const UserLogoModal = ({ isOpen, onClose }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const closeAllModals = () => {
    setIsSettingModalOpen(false);
    setIsLogoutModalOpen(false);
    onClose();
  };

  useEffect(() => {
    const onKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeAllModals();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.modal} onClick={onBackdropClick}>
      <div className={css.modal_content}>
        <button className={css.btn} onClick={() => setIsSettingModalOpen(true)}>
          <HiOutlineCog6Tooth className={css.icon} />
          Settings
        </button>
        <button className={css.btn} onClick={() => setIsLogoutModalOpen(true)}>
          <HiArrowRightOnRectangle className={css.icon} />
          Log out
        </button>

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
    </div>
  );
};

export default UserLogoModal;
