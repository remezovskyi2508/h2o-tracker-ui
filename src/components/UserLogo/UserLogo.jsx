import { useEffect, useState } from 'react';
import style from './UserLogo.module.css';
import axios from 'axios';

export const UserLogo = ({ userName, userEmail }) => {
  const [user, setUser] = useState(null);

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
    <div className={style.user}>
      <span className={style.userName}>{user?.name}</span>
      {user?.photo ? (
        <img src={user.photo} alt="Avatar" width="28" height="28" />
      ) : (
        <div className={style.placeholder}>
          {user?.name ? user.name[0] : 'User'}
          <div className={style.avatar}>{firstLetter}</div>
        </div>
      )}
    </div>
  );
};

export default UserLogo;
