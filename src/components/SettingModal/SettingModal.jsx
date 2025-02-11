import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './SettingModal.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserInfo,
  updateUserAvatar,
  updateUserInfo,
} from '../../redux/user/operations.js';
import { selectUserInfo } from '../../redux/user/selectors.js';
import { selectUserId } from '../../redux/auth/selectors.js';

Modal.setAppElement('#root');

const SettingModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (userId && !userData) {
      dispatch(fetchUserInfo(userId));
    } else if (userData?.avatar?.url) {
      setImagePreview(userData.avatar.url);
    }
  }, [dispatch, userId, userData]);

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

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImage(file);
    }
    return;
  };
  const handleSubmit = async values => {
    const data = {};
    if (values.gender) data.gender = values.gender;
    if (values.email) data.email = values.email;
    if (values.name) data.name = values.name;
    if (values.oldPassword) data.oldPassword = values.oldPassword;
    if (values.newPassword) data.newPassword = values.newPassword;

    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append('avatar', selectedImage);
        await dispatch(updateUserAvatar({ id: userId, formData })).unwrap();
      }
      await dispatch(updateUserInfo({ id: userId, data }));
      toast.success('Profile updated successfully!');
      await dispatch(fetchUserInfo(userId));
    } catch (error) {
      toast.error(error.message || 'Error updating profile.');
    }
  };

  const PasswordToggleButton = ({ isVisible, onClick }) => (
    <button className={css.btnShowPassword} type="button" onClick={onClick}>
      {isVisible ? (
        <svg className={css.iconEye} width="16" height="16">
          <use href="/images/symbol-defs.svg#icon-eye"></use>
        </svg>
      ) : (
        <svg className={css.iconEye} width="16" height="16">
          <use href="/images/symbol-defs.svg#icon-eye-slash"></use>
        </svg>
      )}
    </button>
  );
  const getPasswordFieldType = fieldName => {
    switch (fieldName) {
      case 'oldPassword':
        return showPassword.oldPassword ? 'text' : 'password';
      case 'newPassword':
        return showPassword.newPassword ? 'text' : 'password';
      case 'confirmPassword':
        return showPassword.confirmPassword ? 'text' : 'password';
      default:
        return 'password';
    }
  };
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
            <use href="/images/symbol-defs.svg#icon-close"></use>
          </svg>
        </button>
      </div>

      <h2 className={css.title}>Setting</h2>
      <Formik
        initialValues={{
          avatar: userData?.avatar?.url || null,
          gender: userData?.gender || 'female',
          name: userData?.name || '',
          email: userData?.email || '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={SettingSchema}
        enableReinitialize
      >
        {({ values, errors }) => (
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
                    <use href="/images/symbol-defs.svg#icon-arrow-up-tray"></use>
                  </svg>
                  Upload a photo
                </button>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  className={css.photo}
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <div>
                  {imagePreview || values?.avatar?.url ? (
                    <img
                      src={imagePreview || values?.avatar?.url}
                      alt="User"
                      className={css.photoPreview}
                    />
                  ) : (
                    <div className={css.initials}>
                      {values?.name?.[0]?.toUpperCase() ||
                        values?.email?.split('@')[0]?.[0]?.toUpperCase()}
                    </div>
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
                      type={getPasswordFieldType('oldPassword')}
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
                      type={getPasswordFieldType('newPassword')}
                      name="newPassword"
                      className={`${css.input} ${
                        errors.newPassword ? css.invalid : ''
                      }`}
                      placeholder="Password"
                      disabled={!values.oldPassword}
                      required={values.oldPassword}
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
                      type={getPasswordFieldType('confirmPassword')}
                      name="confirmPassword"
                      className={`${css.input} ${
                        errors.confirmPassword ? css.invalid : ''
                      }`}
                      placeholder="Password"
                      disabled={!values.oldPassword}
                      required={values.oldPassword}
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
