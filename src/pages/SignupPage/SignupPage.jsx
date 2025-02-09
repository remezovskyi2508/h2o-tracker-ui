// import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import css from './SignupPage.module.css';

const SignupPage = () => {
  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.desk_placement}>
          <Formik
            initialValues={{
              'e-mail': '',
              password: '',
              'repeat-password': '',
            }}
            validationSchema={Yup.object({
              'e-mail': Yup.string().required('This field is required'),
              password: Yup.string().required('Password is required'),
              'repeat-password': Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Repeat password is required'),
            })}
            onSubmit={values => {
              console.log(values);
            }}
          >
            <div>
              <h1 className={css.title}>Sign Up</h1>

              <Form className={css.form}>
                <div className={css.input_cont}>
                  <label className={css.lable} htmlFor="e-mail">
                    Enter your email
                  </label>
                  <Field
                    className={css.input}
                    type="text"
                    name="e-mail"
                    placeholder="E-mail"
                  />
                </div>

                <div className={css.input_cont}>
                  <label className={css.lable} htmlFor="password">
                    Enter your password
                  </label>
                  <div className={css.input_icon_container}>
                    <Field
                      className={css.input}
                      type="text"
                      name="password"
                      placeholder="Password"
                    />
                    <button className={css.eye_close}>
                      <svg height="24" width="24">
                        <use href="/images/symbol-defs.svg#icon-eye-off"></use>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={css.input_cont}>
                  <label className={css.lable} htmlFor="repeat-password">
                    Repeat password
                  </label>
                  <div className={css.input_icon_container}>
                    <Field
                      className={css.input}
                      type="text"
                      name="repeat-password"
                      placeholder="Repeat password"
                    />
                    <button className={css.eye_close}>
                      <svg height="24" width="24">
                        <use href="/images/symbol-defs.svg#icon-eye-off"></use>
                      </svg>
                    </button>
                  </div>
                </div>

                <button className={css.signup_btn} type="submit">
                  Sign Up
                </button>
              </Form>
              <a className={css.signin_link} href="/signin">
                Sign in
              </a>
            </div>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
