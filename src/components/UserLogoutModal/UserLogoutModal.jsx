import Modal from 'react-modal';

import css from './UserLogoutModal.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations.js';

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

const UserLogoutModal =
  (/*{  modalIsOpen -> isOpen, modalIsClosed -> onClose }*/) => {
    //  const modalIsOpen = () => {
    //    setIsOpen(true);
    //    document.body.style.overflow = 'hidden';
    //  };
    // const modalIsClosed = () => {
    //   setIsOpen(false);
    //   document.body.style.overflow = "";
    // };
    const [modalStyles, setModalStyles] = useState(
      customStyles(window.innerWidth)
    );
    const [isOpen, setIsOpen] =
      useState(
        true
      ); /* Потрібно буде перенести до випадаючої кнопки Log Out у хедері
      з дефолтним значенням false */
    const dispatch = useDispatch();

    useEffect(() => {
      const handleResize = () =>
        setModalStyles(customStyles(window.innerWidth));
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onLogout = () => {
      dispatch(logout());
    };

    const modalIsClosed = () => {
      // onClose()
      setIsOpen(false);
    };

    return (
      isOpen && (
        <Modal
          isOpen={isOpen}
          style={modalStyles}
          onRequestClose={modalIsClosed}
        >
          <div className={css.titleWrapper}>
            <h2 className={css.modalTitle}>Log out</h2>
            <button className={css.closeModal} onClick={modalIsClosed}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.svg}
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="var(--prim-color-blue)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Поки додав СВГ кодом, як з'явиться icons.svg перероблю */}
            </button>
          </div>
          <p className={css.modalText}>Do you really want to leave?</p>
          <div className={css.optionBtns}>
            <button className={css.modalCancelBtn} onClick={modalIsClosed}>
              Cancel
            </button>
            <button className={css.modalOutBtn} onClick={onLogout}>
              Log out
            </button>
          </div>
        </Modal>
      )
    );
  };

export default UserLogoutModal;
