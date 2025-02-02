import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch} from 'react-redux';
import {NavLink } from 'react-router-dom';
import { login } from '../../redux/auth/operations.js';

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
    .max(64, "Password lenght must be maximum of 64 characters")
    .required("Password is required")
});

const AuthForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
 

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  
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
                <Field className = {css.input_field}
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
                <Field className = {css.input_field}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                   placeholder="Password"
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
                    Sign Up
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
