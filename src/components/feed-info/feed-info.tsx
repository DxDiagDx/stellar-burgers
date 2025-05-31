import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI, Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feeds/slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const feed = useSelector(getFeed);
  const orders: TOrder[] = feed.orders;
  const isFeedLoading = feed.loading;

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  if (isFeedLoading) {
    return <Preloader />;
  }

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
