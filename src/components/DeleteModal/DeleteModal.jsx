import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import clsx from 'clsx';
import css from './DeleteModal.module.css';

const DeleteModal = ({ open, onClose, onConfirm }) => {
  const closeIcon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L13 1M1 1L13 13"
        stroke="var(--prim-color-blue)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      showCloseIcon={false}
      classNames={{
        overlay: css.customOverlay,
        modal: css.customModal,
      }}
    >
      <div className={clsx(css.modalWrapper)}>
        <div className={clsx(css.headerAndBtnWrapper)}>
          <p className={clsx(css.textHeader)}>Delete entry</p>
          <button
            onClick={onClose}
            type="button"
            className={clsx(css.closeBtn)}
          >
            {closeIcon}
          </button>
        </div>
        <div className={clsx(css.modalContent)}>
          Are you sure you want to delete the entry?
        </div>
        <div className={clsx(css.btnWrapper)}>
          <button
            className={clsx(css.btn, css.redBtn)}
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className={clsx(css.btn, css.blueBtn)}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
