import React from 'react';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div>
      <div className={css.baseStyle}></div>
      <h2 className={css.header}>404 Not Found</h2>
    </div>
  );
};

export default NotFoundPage;
