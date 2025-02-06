import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Logo } from './Logo.jsx';
import { AvatarIsLogout, AvatarIsLogin } from './Avatar.jsx';
import { ArrayBtn } from './ArrayBtn.jsx';
import style from './Header.module.css';

const Header = () => {
  const isLoggedIn = true;

  return (
    <header className={style.header}>
      {isLoggedIn ? (
        <>
          <NavLink to="/home" className={style.waterTracker}>
            <Logo />
            Tracker of water
          </NavLink>
          <div className={style.arrayBtn}>
            <AvatarIsLogin />
            <button type="button">
              <ArrayBtn />
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink to="/welcome" className={style.waterTracker}>
            <Logo />
            Tracker of water
          </NavLink>
          <NavLink to="/singin" className={style.singIn}>
            Sing in
            <AvatarIsLogout />
          </NavLink>
        </>
      )}
    </header>
  );
};

export default Header;
