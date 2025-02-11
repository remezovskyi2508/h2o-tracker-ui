import { Link } from 'react-router-dom';
import style from './UserAuth.module.css';
const UserAuth = () => {
  return (
    <div>
      <Link to="/signin" className={style.singIn}>
        Sign in
        <svg className={style.iconUser} width="28" height="28">
          <use href="/images/icons.svg#icon-outline"></use>
        </svg>
      </Link>
    </div>
  );
};

export default UserAuth;
