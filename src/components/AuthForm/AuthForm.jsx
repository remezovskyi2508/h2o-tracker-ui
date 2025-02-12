import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '../../redux/auth/operations.js';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import css from './AuthForm.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';


const AuthSchema = (isSignup) =>
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


const ToastErrors = () => {
  const { errors, submitCount } = useFormikContext();

  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((message) => {
        toast.error(message);
      });
    }
  }, [errors, submitCount]);

  return null;
};

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
      if (isSignup) {
        await dispatch(register(formData)).unwrap();
        toast.success('User is successfully registered');
        navigate('/signin');
      } else {
        await dispatch(login(formData)).unwrap();
        toast.success('User is successfully logged in');
      }
      actions.resetForm(); 
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        actions.setStatus({ serverError: error.response.data.message });
      } else {
        actions.setFieldError('password', 'Password is wrong');
      }
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema(isSignup)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className={css.form}>
       
            <ToastErrors />
            <h2 className={css.formTitle}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </h2>

            <label className={css.label}>
              <span>Enter your email:</span>
              <Field
                autoComplete="off"
                className={css.input}
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
                  autoComplete="off"
                  className={css.input}
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
                    <FiEye size={16} />
                  ) : (
                    <FiEyeOff size={16} />
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
                    autoComplete="off"
                    className={css.input}
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
                      <FiEye size={16} />
                    ) : (
                      <FiEyeOff size={16} />
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

            <button className={css.button} type="submit" disabled={isSubmitting}>
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