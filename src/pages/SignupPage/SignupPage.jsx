import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import css from "./SignupPage.module.css";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn); 
  const [error, setError] = useState(null);

  const handleSignup = async (userData) => {
    try {
      const response = await dispatch(registerUser(userData)).unwrap();
      if (response.user) {
        navigate("/signin"); 
      }
    } catch (err) {
      setError(err.message); 
    }
  };


  if (isLoggedIn) {
    navigate("/home");
    return null;
  }

  return (
    <div className={css.container}>
      <h3>Sign Up</h3>

      {error && <p className={css.error}>{error}</p>}

      <AuthForm onSubmit={handleSignup} buttonText="Sign Up" />

      <p>
        Already have an account? <NavLink to="/signin">Sign in</NavLink>
      </p>
    </div>
  );
};

export default SignupPage;
