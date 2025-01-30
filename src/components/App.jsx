//Import css
// import css from './App.module.css';

//import components
// import { useDispatch, useSelector } from 'react-redux';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';
// import { refreshUser } from '../redux/auth/operations';
// import { selectIsRefreshing } from '../redux/auth/selectors';
import { lazy } from 'react';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';

// Ліниве завантаження компонентів
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const SigninPage = lazy(() => import('../pages/SigninPage/SigninPage'));
const SignupPage = lazy(() => import('../pages/SignupPage/SignupPage'));

function App() {
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  // if (isRefreshing) {
  //   return <div className={css.loader}>Loading...</div>;
  // }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* Обмежений доступ для неавторизованих користувачів */}
            <Route
              path="welcome"
              element={<RestrictedRoute component={<WelcomePage/>} />}
            />
            {/* Сторінка для авторизованих користувачів */}
            <Route
              path="home"
              element={<PrivateRoute component={<HomePage/>} />}
            />
            {/* Сторінка для входу */}
            <Route
              path="signin"
              element={<RestrictedRoute component={<SigninPage/>} />}
            />
            {/* Сторінка для реєстрації */}
            <Route
              path="signup"
              element={<RestrictedRoute component={<SignupPage/>} />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
