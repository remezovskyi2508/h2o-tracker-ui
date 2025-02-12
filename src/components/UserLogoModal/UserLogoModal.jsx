import { useState, useEffect, useRef } from 'react';
import { HiOutlineCog6Tooth, HiArrowRightOnRectangle } from 'react-icons/hi2';
import css from './UserLogoModal.module.css';
import SettingModal from '../SettingModal/SettingModal';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';

const UserLogoModal = ({ isOpen, onClose }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.modal} ref={modalRef} onClick={onClose}>
      <div className={css.modalContent} onClick={e => e.stopPropagation()}>
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
