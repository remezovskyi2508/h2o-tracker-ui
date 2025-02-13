import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './SettingModal.module.css';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserInfo,
  updateUserAvatar,
  updateUserInfo,
} from '../../redux/user/operations.js';
import {
  selectUserInfo,
  selectUserLoading,
} from '../../redux/user/selectors.js';
import { selectUserId, selectLoading } from '../../redux/auth/selectors.js';
import Loader from '../Loader/Loader';

Modal.setAppElement('#root');

const SettingModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);
  const userId = useSelector(selectUserId);
  const isAuthLoading = useSelector(selectLoading);
  const isUserLoading = useSelector(selectUserLoading);
  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);

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

  const handleUpdateAvatar = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsAvatarUpdating(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await dispatch(
        updateUserAvatar({ id: userId, formData })
      ).unwrap();

      if (response?.data.avatarUrl) {
        setFieldValue('avatar', response.data.avatarUrl);
        toast.success('Avatar updated successfully!');
        await dispatch(fetchUserInfo(userId));
      } else {
        throw new Error('Invalid avatar response');
      }
    } catch (error) {
      toast.error(
        error.message || 'An error occurred while updating the avatar.'
      );
    } finally {
      setIsAvatarUpdating(false);
    }
  };

  const handleSubmit = async values => {
    const data = {};
    if (values.gender) data.gender = values.gender;
    if (values.email) data.email = values.email;
    if (values.name) data.name = values.name;
    if (values.oldPassword) data.oldPassword = values.oldPassword;
    if (values.newPassword) data.newPassword = values.newPassword;

    const result = await dispatch(updateUserInfo({ id: userId, data }));
    if (updateUserInfo.fulfilled.match(result)) {
      toast.success('Profile updated successfully!');
      await dispatch(fetchUserInfo(userId));
    } else {
      toast.error(
        result.payload || 'An error occurred while updating the data.'
      );
    }
  };

  const PasswordToggleButton = ({ isVisible, onClick }) => (
    <button className={css.btnShowPassword} type="button" onClick={onClick}>
      {isVisible ? (
        <svg className={css.iconEye} width="16" height="16">
          <use href="/images/icons.svg#icon-eye"></use>
        </svg>
      ) : (
        <svg className={css.iconEye} width="16" height="16">
          <use href="/images/icons.svg#icon-eye-slash"></use>
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
      {isAuthLoading || isUserLoading ? (
        <Loader />
      ) : (
        <>
          <div className={css.closeBtnWrapper}>
            <button className={css.closeBtn} onClick={onClose}>
              <svg className={css.closeBtnIcon} width="24" height="24">
                <use href="/images/icons.svg#icon-close"></use>
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
                      <svg
                        className={css.uploadButtonIcon}
                        width="16"
                        height="16"
                      >
                        <use href="/images/icons.svg#icon-arrow-up-tray"></use>
                      </svg>
                      Upload a photo
                    </button>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      className={css.photo}
                      accept="image/*"
                      onChange={e => handleUpdateAvatar(e, setFieldValue)}
                      style={{ display: 'none' }}
                    />
                    <div>
                      {isAvatarUpdating ? (
                        <Loader />
                      ) : values?.avatar ? (
                        <img
                          src={values.avatar}
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
                            <Field type="radio" name="gender" value="male" />{' '}
                            Man
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
                    <label
                      htmlFor="confirmPassword"
                      className={css.labelPassword}
                    >
                      Repeat new password:
                      <div className={css.inputWrapper}>
                        <Field
                          type={
                            showPassword.confirmPassword ? 'text' : 'password'
                          }
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
        </>
      )}
    </Modal>
  );
};

export default SettingModal;
