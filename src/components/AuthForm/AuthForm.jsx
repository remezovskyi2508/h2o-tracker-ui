import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '../../redux/auth/operations.js';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import css from './AuthForm.module.css';
import { useState } from 'react';

const AuthSchema = isSignup =>
  Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be maximum of 64 characters')
      .required('Password is required'),
    ...(isSignup && {
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    }),
  });

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === '/signup';
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const initialValues = isSignup
    ? { email: '', password: '', repeatPassword: '' }
    : { email: '', password: '' };

  const handleSubmit = async (values, actions) => {
    try {
      const { repeatPassword, ...formData } = values;
      void repeatPassword;
      if (isSignup) {
        await dispatch(register(formData)).unwrap();
        navigate('/signin');
      } else {
        await dispatch(login(formData)).unwrap();
      }

      actions.resetForm();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema(isSignup)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.form}>
            <h2 className={css.formTitle}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </h2>

            <label className={css.label}>
              <span> Enter your email:</span>
              <Field
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ''
                }`}
                type="text"
                name="email"
                placeholder="E-mail"
              />
              <ErrorMessage
                className={css.errorMessage}
                name="email"
                component="span"
              />
            </label>

            <label className={css.label}>
              <span>Enter your password:</span>
              <div className={css.passwordContainer}>
                <Field
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ''
                  }`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEye size={16} color="var(--prim-color-blue)" />
                  ) : (
                    <FiEyeOff size={16} color="var(--prim-color-blue)" />
                  )}
                </button>
              </div>
              <ErrorMessage
                className={css.errorMessage}
                name="password"
                component="span"
              />
            </label>

            {isSignup && (
              <label className={css.label}>
                <span>Repeat Password:</span>
                <div className={css.passwordContainer}>
                  <Field
                    className={`${css.input} ${
                      errors.password && touched.password ? css.inputError : ''
                    }`}
                    type={showRepeatPassword ? 'text' : 'password'}
                    name="repeatPassword"
                    placeholder="Repeat Password"
                  />
                  <button
                    type="button"
                    className={css.iconButton}
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  >
                    {showRepeatPassword ? (
                      <FiEye size={16} color="var(--prim-color-blue)" />
                    ) : (
                      <FiEyeOff  size={16} color="var(--prim-color-blue)" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className={css.errorMessage}
                  name="repeatPassword"
                  component="span"
                />
              </label>
            )}

            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>

            <p className={css.signupText}>
              <NavLink
                to={isSignup ? '/signin' : '/signup'}
                className={css.navLink}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </NavLink>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
