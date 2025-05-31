import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getProfileOrders } from '../../services/slices/profile-feed/slice';
import { getProfileFeed } from '../../services/slices/profile-feed/action';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getProfileOrders).orders;
  const isFeedsLoading = useSelector(getProfileOrders).loading;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileFeed());
  }, []);

  if (isFeedsLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
