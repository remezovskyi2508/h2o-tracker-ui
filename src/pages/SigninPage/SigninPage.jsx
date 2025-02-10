import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import AuthForm from '../../components/AuthForm/AuthForm.jsx';
import css from '../SignupPage/SignupPage.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SigninPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [error, setError] = useState(null);

  const handleSignin = async userData => {
    try {
      console.log('Signing in with:', userData);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className={css.sPageContainer}>
      <Toaster /> 
      <div className={css.formSection}>
        {!isLoggedIn && (
          <>
            
           
            <AuthForm onSubmit={handleSignin} buttonText="Sign in" />
          </>
        )}
       
      </div>
    </div>
  );
};

export default SigninPage;gi