import { NavLink } from 'react-router-dom';
import style from './UserAuth.module.css';
const UserAuth = () => {
  return (
    <div>
      <NavLink to="/signin" className={style.singIn}>
        Sign in
        <svg className={style.iconUser} width="28" height="28">
          <use href="/public/images/icons.svg#icon-outline"></use>
        </svg>
      </NavLink>
    </div>
  );
};

export default UserAuth;
