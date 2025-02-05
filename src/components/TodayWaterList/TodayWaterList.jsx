import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '../DeleteModal/DeleteModal';

const TodayWaterList = ({ id }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onDeletePortion = useCallback(() => {
    dispatch(deletePortion(id));
    onCloseModal();
  }, [dispatch, id]);

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>

      <DeleteModal
        open={open}
        onClose={onCloseModal}
        onConfirm={onDeletePortion}
      ></DeleteModal>
    </div>
  );
};

export default TodayWaterList;
