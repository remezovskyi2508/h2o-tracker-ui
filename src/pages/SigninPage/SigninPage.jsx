import { Link } from 'react-router-dom';
import css from './SigninPage.module.css';
import AuthForm from '../../components/AuthForm/AuthForm.jsx';

const SigninPage = () => {


  return (
    <div className={css.navContainer}>
      <h3>Sign In</h3>
      <AuthForm />
      
      <Link className="auth-link" to="/signup">
        {('signup.title')} 
      </Link>
    </div>
  );
};

export default SigninPage;
