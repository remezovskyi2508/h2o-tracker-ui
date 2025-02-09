// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './Header.module.css';
import { Logo } from '../Logo/Logo.jsx';
// import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { UserLogo } from '../UserLogo/UserLogo.jsx';
import UserAuth from '../UserAuth/UserAuth.jsx';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const userData = useSelector(state => state.auth.user);

  return (
    <header className={style.header}>
      {isLoggedIn ? (
        <>
          <Link to="/home" className={style.waterTracker}>
            <Logo className={style.logo} />
            <div className={style.logoText}>Tracker of water</div>
          </Link>
          <div className={style.userProfile}>
            <UserLogo userName={userData?.name} />
          </div>
        </>
      ) : (
        <>
          <Link to="/welcome" className={style.waterTracker}>
            <Logo className={style.logo} />
            <div className={style.logoText}>Tracker of water</div>
          </Link>
          <UserAuth />
        </>
      )}
    </header>
  );
};

export default Header;
