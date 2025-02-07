import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './SettingModal.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserAvatar,
  updateUserInfo,
  updateUserPassword,
} from '../../redux/user/operations.js';
import { selectUserInfo } from '../../redux/user/selectors.js';

Modal.setAppElement('#root');

const SettingModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);

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
    avatar: userData.avatar || null,
    gender: userData.gender || 'female',
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

  const handleUpdateAvatar = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await dispatch(
        updateUserAvatar({ id: userData._id, formData })
      ).unwrap();

      if (response?.avatar) {
        setFieldValue('avatar', response.avatar);
      } else {
        throw new Error('Invalid avatar response');
      }
    } catch (error) {
      console.error('Avatar update failed:', error);
      toast.error(
        error.message || 'An error occurred while updating the avatar.'
      );
    }
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        updateUserInfo({
          id: values.id,
          name: values.name,
          email: values.email,
          gender: values.gender,
        })
      ).unwrap();
      if (values.oldPassword && values.newPassword) {
        await dispatch(
          updateUserPassword({
            id: values.id,
            password: values.oldPassword,
            newPassword: values.newPassword,
          })
        ).unwrap();
      }
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
        <svg className={css.iconEye} width="16" height="16">
          <use href="../../../public/images/symbol-defs.svg#icon-eye"></use>
        </svg>
      ) : (
        <svg className={css.iconEye} width="16" height="16">
          <use href="../../../public/images/symbol-defs.svg#icon-eye-slash"></use>
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
      <Toaster />
      <div className={css.closeBtnWrapper}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeBtnIcon} width="24" height="24">
            <use href="../../../public/images/symbol-defs.svg#icon-close"></use>
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
                  onClick={() => document.getElementById('avatar').click()}
                >
                  <svg className={css.uploadButtonIcon} width="16" height="16">
                    <use href="../../../public/images/symbol-defs.svg#icon-arrow-up-tray"></use>
                  </svg>
                  Upload a photo
                </button>
                <input
                  type="file"
                  id="avatar"
                  name="avar"
                  className={css.photo}
                  accept="image/*"
                  onChange={e => handleUpdateAvatar(e, setFieldValue)}
                  style={{ display: 'none' }}
                />
                <div className={css.initials}>
                  {values?.avatar ? (
                    <img
                      src={values.avatar}
                      alt="User"
                      className={css.photoPreview}
                    />
                  ) : (
                    values?.name?.[0]?.toUpperCase() ||
                    values?.email?.split('@')[0]?.[0]?.toUpperCase()
                  )}
                </div>
              </div>
            </div>
            <div className={css.formGroupUserSetting}>
              <div className={css.formGroupUserInfo}>
                <div className={css.formGroupIdentity}>
                  <label htmlFor="gender" className={css.label}>
                    Your gender identity
                    <div className={css.radioWrapper}>
                      <label className={css.radio}>
                        <Field type="radio" name="gender" value="female" />
                        Woman
                      </label>
                      <label className={css.radio}>
                        <Field type="radio" name="gender" value="male" /> Man
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
                      className={`${css.input} ${
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
                      className={`${css.input} ${
                        errors.newPassword ? css.invalid : ''
                      }`}
                      placeholder="Password"
                      disabled={!values.oldPassword}
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
                      className={`${css.input} ${
                        errors.confirmPassword ? css.invalid : ''
                      }`}
                      placeholder="Password"
                      disabled={!values.oldPassword}
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
