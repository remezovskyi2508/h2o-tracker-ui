import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './SettingModal.module.css';
// import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const SettingModal = ({ isOpen, onClose }) => {
  // const dispatch = useDispatch();
  // const userData = useSelector(selectUser);
  const [userData, setUserData] = useState({
    photo:
      'https://aperepelitsa.com.ua/assets/image/portfolio/woman/DSC08276.jpg',
    name: 'Anna',
    email: 'example@mail.com',
    _id: '111',
  });
  const SettingSchema = Yup.object().shape({
    name: Yup.string().max(32, 'Name must be no more than 32 characters'),
    email: Yup.string().email('Invalid email address'),
    oldPassword: Yup.string()
      .min(8, 'Password should be at least 8 characters')
      .max(64, 'Password must be no more than 64 characters'),
    newPassword: Yup.string()
      .min(8, 'Password should be at least 8 characters')
      .max(64, 'Password must be no more than 64 characters'),
    confirmPassword: Yup.string()
      .min(8, 'Password should be at least 8 characters')
      .max(64, 'Password must be no more than 64 characters')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });
  const initialValues = {
    id: userData._id,
    photo: userData.photo || null,
    gender: userData.gender || 'woman',
    name: userData.name || '',
    email: userData.email || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleSubmit = async (values, actions) => {
    try {
      // await dispatch(updateUser(values));
      console.log(values);
      setUserData(values);
      actions.resetForm({ values });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.log(error);
      toast.error(
        error.message || 'An error occurred while updating the data.'
      );
    }
  };

  const PasswordToggleButton = ({ isVisible, onClick }) => (
    <button className={css.btnShowPassword} type="button" onClick={onClick}>
      {isVisible ? (
        <svg
          className={css.iconEye}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.03613 12.322C1.96712 12.1146 1.96712 11.8904 2.03613 11.683C3.42313 7.51 7.36013 4.5 12.0001 4.5C16.6381 4.5 20.5731 7.507 21.9631 11.678C22.0331 11.885 22.0331 12.109 21.9631 12.317C20.5771 16.49 16.6401 19.5 12.0001 19.5C7.36213 19.5 3.42613 16.493 2.03613 12.322Z" />
          <path d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12Z" />
        </svg>
      ) : (
        <svg
          className={css.iconEye}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.98008 8.223C3.04454 9.32718 2.3479 10.6132 1.93408 12C3.22608 16.338 7.24408 19.5 12.0001 19.5C12.9931 19.5 13.9531 19.362 14.8631 19.105M6.22808 6.228C7.9407 5.09781 9.94816 4.49682 12.0001 4.5C16.7561 4.5 20.7731 7.662 22.0651 11.998C21.357 14.3673 19.8371 16.4115 17.7721 17.772M6.22808 6.228L3.00008 3M6.22808 6.228L9.87808 9.878M17.7721 17.772L21.0001 21M17.7721 17.772L14.1221 14.122C14.4007 13.8434 14.6217 13.5127 14.7725 13.1486C14.9232 12.7846 15.0008 12.3945 15.0008 12.0005C15.0008 11.6065 14.9232 11.2164 14.7725 10.8524C14.6217 10.4883 14.4007 10.1576 14.1221 9.879C13.8435 9.6004 13.5127 9.3794 13.1487 9.22863C12.7847 9.07785 12.3946 9.00025 12.0006 9.00025C11.6066 9.00025 11.2164 9.07785 10.8524 9.22863C10.4884 9.3794 10.1577 9.6004 9.87908 9.879M14.1211 14.121L9.88008 9.88" />
        </svg>
      )}
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      contentLabel="User Settings Modal"
      bodyOpenClassName="no-scroll"
      overlayClassName={css.modalBackdrop}
    >
      <div className={css.closeBtnWrapper}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg
            className={css.closeBtnIcon}
            width="12"
            height="12"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 13L13 1M1 1L13 13" />
          </svg>
        </button>
      </div>

      <h2 className={css.title}>Setting</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SettingSchema}
      >
        {({ setFieldValue, values, errors }) => (
          <Form className={css.form}>
            <div className={css.formGroupPhoto}>
              <label className={css.label}>Your photo</label>
              <div className={css.uploadPhotoWrapper}>
                <button
                  type="button"
                  className={css.uploadButton}
                  onClick={() => document.getElementById('photo').click()}
                >
                  <svg
                    className={css.uploadButtonIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 16.5V18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75V16.5M7.5 7.5L12 3M12 3L16.5 7.5M12 3V16.5" />
                  </svg>
                  Upload a photo
                </button>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className={css.photo}
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    setFieldValue('photo', file);
                  }}
                  style={{ display: 'none' }}
                />

                {values.photo ? (
                  <img
                    src={
                      typeof values.photo === 'string'
                        ? values.photo
                        : URL.createObjectURL(values.photo)
                    }
                    alt="User"
                    className={css.photoPreview}
                  />
                ) : (
                  <div className={css.initials}>
                    {values?.photo ||
                      values?.name?.[0]?.toUpperCase() ||
                      values?.email?.split('@')[0]?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <div className={css.formGroupUserSetting}>
              <div className={css.formGroupUserInfo}>
                <div className={css.formGroupIdentity}>
                  <label htmlFor="gender" className={css.label}>
                    Your gender identity
                    <div className={css.radioWrapper}>
                      <label className={css.radio}>
                        <Field type="radio" name="gender" value="woman" /> Woman
                      </label>
                      <label className={css.radio}>
                        <Field type="radio" name="gender" value="man" /> Man
                      </label>
                    </div>
                  </label>
                </div>
                <div className={css.formGroupName}>
                  <label htmlFor="name" className={css.label}>
                    Your name
                    <Field
                      type="text"
                      name="name"
                      className={`${css.input} ${
                        errors.name ? css.invalid : ''
                      }`}
                      placeholder="Your Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className={css.errorMessage}
                    />
                  </label>
                </div>
                <div className={css.formGroupEmail}>
                  <label htmlFor="email" className={css.label}>
                    E-mail
                    <Field
                      type="email"
                      name="email"
                      className={css.input}
                      placeholder="Your Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className={css.errorMessage}
                    />
                  </label>
                </div>
              </div>

              <div className={css.formGroupUserPasswords}>
                <h3 className={css.NameGroupPasswords}>Password </h3>
                <label htmlFor="oldPassword" className={css.labelPassword}>
                  Outdated password:
                  <div className={css.inputWrapper}>
                    <Field
                      type={showPassword.oldPassword ? 'text' : 'password'}
                      name="oldPassword"
                      className={`${css.inputPassword} ${
                        errors.oldPassword ? css.invalid : ''
                      }`}
                      placeholder="Password"
                    />
                    <PasswordToggleButton
                      isVisible={showPassword.oldPassword}
                      onClick={() =>
                        setShowPassword(prev => ({
                          ...prev,
                          oldPassword: !prev.oldPassword,
                        }))
                      }
                    />
                  </div>
                  <ErrorMessage
                    name="oldPassword"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>
                <label htmlFor="newPassword" className={css.labelPassword}>
                  New Password:
                  <div className={css.inputWrapper}>
                    <Field
                      type={showPassword.newPassword ? 'text' : 'password'}
                      name="newPassword"
                      className={`${css.inputPassword} ${
                        errors.newPassword ? css.invalid : ''
                      }`}
                      placeholder="Password"
                    />
                    <PasswordToggleButton
                      isVisible={showPassword.newPassword}
                      onClick={() =>
                        setShowPassword(prev => ({
                          ...prev,
                          newPassword: !prev.newPassword,
                        }))
                      }
                    />
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>
                <label htmlFor="confirmPassword" className={css.labelPassword}>
                  Repeat new password:
                  <div className={css.inputWrapper}>
                    <Field
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      className={`${css.inputPassword} ${
                        errors.confirmPassword ? css.invalid : ''
                      }`}
                      placeholder="Password"
                    />
                    <PasswordToggleButton
                      isVisible={showPassword.confirmPassword}
                      onClick={() =>
                        setShowPassword(prev => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                    />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
                    className={css.errorMessage}
                  />
                </label>
              </div>
            </div>
            <button type="submit" className={css.btnSave}>
              Save
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SettingModal;
