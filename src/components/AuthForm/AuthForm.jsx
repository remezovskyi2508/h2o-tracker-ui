import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate,NavLink } from 'react-router-dom';
import { login } from '../../redux/auth/operations.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import css from './AuthForm.module.css'; 
import { useState } from 'react';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

export const LoginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  
  password: Yup.string()
    .min(8, "Password length must be at least 8 characters")
    .required("Password is required")
});

const AuthForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // If the user is logged in, redirect to /home
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <h2 className={css.formTitle}>Sign In</h2>
            <div className={css.listForm}>
              <label className={css.label}>
                <span>Email:</span>
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="email"
                  component="span"
                />
              </label>
              <label className={errors.password && touched.password ? 'input-with-error' : null}>
                <span>Password:</span>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={css.input}
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="password"
                  component="span"
                />
                <button type="button" onClick={toggleShowPassword}>
                  {showPassword ? <FiEyeOff size={16} color="#407BFF" style={{transform: 'rotate(180deg)'}} /> : <FiEye size={16} color="#407BFF" />}
                </button>
              </label>
              <div>
                <button type="submit" className={css.button}>
                  {'Sign In'}
                </button>
                
                <p className={css.signupText}>
                  {'Already have an account? '}
                  <NavLink to="/signin" className={css.navLink}>
                    Sign In
                  </NavLink>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
