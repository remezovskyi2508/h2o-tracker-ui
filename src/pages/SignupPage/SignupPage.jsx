import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/operations.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import AuthForm from '../../components/AuthForm/AuthForm.jsx';
import css from './SignupPage.module.css';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [error, setError] = useState(null);

  const handleSignup = async userData => {
    try {
      const response = await dispatch(register(userData)).unwrap();
      console.log(response);
      if (response.user) {
        navigate('/signin');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoggedIn) {
    navigate('/home');
    return null;
  }

  return (
    <div className={css.signupPageContainer}>
      <div className={css.formSection}>
        {error && <p className={css.error}>{error}</p>}

        <AuthForm onSubmit={handleSignup} buttonText="Sign Up" />
      </div>
      <div className={css.background}></div>
    </div>
  );
};

export default SignupPage;
