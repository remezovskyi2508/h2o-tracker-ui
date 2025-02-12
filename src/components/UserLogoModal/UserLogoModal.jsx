import { useEffect, useRef } from 'react';
import { HiOutlineCog6Tooth, HiArrowRightOnRectangle } from 'react-icons/hi2';
import css from './UserLogoModal.module.css';

const UserLogoModal = ({ isOpen, onClose, onOpenSetting, onOpenLogout }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.modal}>
      <div className={css.modalContent} ref={modalRef}>
        <button
          className={css.btn}
          onClick={() => {
            onOpenSetting();
          }}
        >
          <HiOutlineCog6Tooth className={css.icon} />
          Settings
        </button>
        <button
          className={css.btn}
          onClick={() => {
            onOpenLogout();
          }}
        >
          <HiArrowRightOnRectangle className={css.icon} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserLogoModal;
