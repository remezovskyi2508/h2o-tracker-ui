import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import css from "./SigninPage.module.css";

const SigninPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [error, setError] = useState(null);

  const handleSignin = async (userData) => {
    try {
      console.log("Signing in with:", userData);
     
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3 className = {css.title}>Sign In</h3>
      <p>isLoggedIn: {String(isLoggedIn)}</p>

      {!isLoggedIn && (
        <>
          {error && <p className={css.error}>{error}</p>}
          <AuthForm onSubmit={handleSignin} buttonText="Sign in" />
          <p>
            Do you have an account? <NavLink className={css.navlink} to="/signup">Sign in</NavLink>
          </p>
        </>
      )}
    </div>
  );
};

export default SigninPage;
