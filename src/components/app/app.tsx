import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import React, { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/burger-ingredients/action';
import { getUser } from '../../services/slices/user/action';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location?.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/ingredients/:id'
          element={
            <IngredientDetails title={'Детали ингредиента'} isModal={false} />
          }
        />
        <Route path='/profile/orders/:number' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Лента заказов'}
                onClose={onClose}
                children={<OrderInfo />}
              />
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={onClose}
                children={<IngredientDetails isModal />}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth
                component={
                  <Modal
                    title={'Заказ'}
                    onClose={onClose}
                    children={<OrderInfo />}
                  />
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
