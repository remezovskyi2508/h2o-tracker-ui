import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './Header.module.css';
import { Logo } from '../Logo/Logo.jsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { UserLogo } from '../UserLogo/UserLogo.jsx';
import UserLogoModal from '../UserLogoModal/UserLogoModal.jsx';
import UserAuth from '../UserAuth/UserAuth.jsx';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isLoggedIn = true;
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const userData = useSelector(state => state.auth.user);

  return (
    <header className={style.header}>
      {isLoggedIn ? (
        <>
          <NavLink to="/home" className={style.waterTracker}>
            <Logo className={style.logo} />
            <div className={style.logoText}>Tracker of water</div>
          </NavLink>
          <div className={style.userProfile}>
            <UserLogo userName={userData?.name} />
            <div>
              <button
                onClick={() => setUserModalOpen(true)}
                type="button"
                className={style.svgBtn}
              >
                <svg className={style.icon} width="12" height="7">
                  <use href="/public/images/icons.svg#icon-vector"></use>
                </svg>
              </button>
            </div>
            <div className={style.wrapper}>
              <UserLogoModal
                className={style.userModal}
                isOpen={isUserModalOpen}
                onClose={() => setUserModalOpen(false)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <NavLink to="/welcome" className={style.waterTracker}>
            <Logo />
            Tracker of water
          </NavLink>
          <UserAuth />
        </>
      )}
    </header>
  );
};

export default Header;
