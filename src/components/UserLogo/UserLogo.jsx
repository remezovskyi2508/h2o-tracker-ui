import { useEffect, useState } from 'react';
import style from './UserLogo.module.css';
import axios from 'axios';
import UserLogoModal from '../UserLogoModal/UserLogoModal';

export const UserLogo = ({ userName, userEmail }) => {
  const [user, setUser] = useState(null);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const toggleModal = () => {
    setUserModalOpen(prev => !prev);
  };
  useEffect(() => {
    axios
      .get('/api/user')
      .then(response => setUser(response.data))
      .catch(error => console.error('User not found', error));
  }, []);
  const firstLetter =
    userName?.charAt(0).toUpperCase() ||
    userEmail?.charAt(0).toUpperCase() ||
    'U';
  return (
    <>
      <button onClick={toggleModal} type="button" className={style.svgBtn}>
        <div className={style.user}>
          <span className={style.userName}>{user?.name}</span>
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" width="28" height="28" />
          ) : (
            <div className={style.placeholder}>
              {user?.name ? user.name[0] : 'User'}
              <div className={style.avatar}>{firstLetter}</div>
            </div>
          )}
        </div>
        <div>
          <svg className={style.icon} width="12" height="7">
            <use href="/public/images/icons.svg#icon-vector"></use>
          </svg>
        </div>
      </button>

      <div className={`${style.wrapper} ${isUserModalOpen ? style.show : ''}`}>
        <UserLogoModal isOpen={isUserModalOpen} onClose={toggleModal} />
      </div>
    </>
  );
};

export default UserLogo;
