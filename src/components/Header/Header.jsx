import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { UserLogo } from '../UserLogo/UserLogo.jsx';
import style from './Header.module.css';
import SettingModal from '../SettingModal/SettingModal.jsx';
import { Logo } from '../Logo/Logo.jsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const userData = useSelector(state => state.auth.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/api/user')
      .then(response => setUser(response.data))
      .catch(error => console.error('User not found', error));
  }, []);

  return (
    <header className={style.header}>
      {isLoggedIn ? (
        <>
          <NavLink to="/home" className={style.waterTracker}>
            <Logo className={style.logo} />
            <div className={style.logoText}>Tracker of water</div>
          </NavLink>
          <div className={style.userProfile}>
            <div>
              <span className={style.userName}>{user?.name}</span>
              {user?.photo ? (
                <img src={user.photo} alt="Avatar" width="28" height="28" />
              ) : (
                <div className={style.placeholder}>
                  {user?.name ? user.name[0] : ''}
                  <svg className={style.iconUser} width="28" height="28">
                    <use href="/public/images/icons.svg#icon-outline"></use>
                  </svg>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setSettingsOpen(true)}
                type="button"
                className={style.svgBtn}
              >
                <svg className={style.icon} width="16" height="16">
                  <use href="/public/images/icons.svg#icon-vector"></use>
                </svg>
              </button>
            </div>
            <SettingModal
              isOpen={isSettingsOpen}
              onClose={() => setSettingsOpen(false)}
              userData={userData}
            />
          </div>
        </>
      ) : (
        <>
          <NavLink to="/welcome" className={style.waterTracker}>
            <Logo />
            Tracker of water
          </NavLink>
          <NavLink to="/signin" className={style.singIn}>
            Sign in
            <svg className={style.iconUser} width="28" height="28">
              <use href="/public/images/icons.svg#icon-outline"></use>
            </svg>
          </NavLink>
        </>
      )}
    </header>
  );
};

export default Header;
