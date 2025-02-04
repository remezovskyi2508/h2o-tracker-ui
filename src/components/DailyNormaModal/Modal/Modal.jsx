import clsx from 'clsx';
import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({
  children,
  title,
  text,
  onClose,
  classNameModal,
  actionBtns,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div onClick={handleBackDropClick} className={css.backdrop}>
      <div className={clsx(css.modal, classNameModal)}>
        <div className={css.modalHeader}>
          <h3 className={css.title}>{title}</h3>
          <button
            aria-label="Close modal button"
            className={css.closeModalBtn}
            onClick={onClose}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L13 1M1 1L13 13"
                stroke="#407BFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {text && <p className={css.text}>{text}</p>}

        {children}

        {actionBtns && <div className={css.actionBtns}>{actionBtns}</div>}
      </div>
    </div>
  );
};

export default Modal;
