import Modal from 'react-modal';
import css from './UserLogoutModal.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations.js';
import { persistor } from '../../redux/store.js';

Modal.setAppElement('#root');

const customStyles = width => ({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '32px 24px',
    backgroundColor: '#fff',
    border: '0',
    borderRadius: '10px',
    width: width < 767 ? '280px' : '592px',
    height: width < 767 ? '260px' : '208px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '999',
  },
});

const UserLogoutModal = ({ isOpen, onClose }) => {
  const [modalStyles, setModalStyles] = useState(
    customStyles(window.innerWidth)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => setModalStyles(customStyles(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onLogout = async () => {
    try {
      await dispatch(logout());
      persistor.purge(); // очищення Persist store
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyles}
      onRequestClose={onClose}
      onAfterOpen={() => {
        document.addEventListener('keydown', handleKeyDown);
      }}
      onAfterClose={() => {
        document.removeEventListener('keydown', handleKeyDown);
      }}
    >
      <div className={css.titleWrapper}>
        <h2 className={css.modalTitle}>Log out</h2>
        <div>
          <button className={css.closeModal} onClick={onClose}>
            <svg className={css.svg} width="14" height="14">
              <use href="/images/icons.svg#icon-close-btn"></use>
            </svg>
          </button>
        </div>
      </div>
      <p className={css.modalText}>Do you really want to leave?</p>
      <div className={css.optionBtns}>
        <button className={css.modalCancelBtn} onClick={onClose}>
          Cancel
        </button>
        <button className={css.modalOutBtn} onClick={onLogout}>
          Log out
        </button>
      </div>
    </Modal>
  );

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
};

export default UserLogoutModal;
