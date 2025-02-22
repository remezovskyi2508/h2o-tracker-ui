import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import AuthForm from '../../components/AuthForm/AuthForm.jsx';
import css from '../SignupPage/SignupPage.module.css';

const SigninPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [error, setError] = useState(null);

  const handleSignin = () => {
    try {
      null
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={css.sPageContainer}>
      <div className={css.formSection}>
        {!isLoggedIn && (
          <>
            {error && <p className={css.error}>{error}</p>}
            <AuthForm onSubmit={handleSignin} buttonText="Sign in" />
          </>
        )}
      </div>
    </div>
  );
};

export default SigninPage;