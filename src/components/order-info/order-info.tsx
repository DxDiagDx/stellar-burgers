import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsItems } from '../../services/slices/burger-ingredients/slice';
import { useParams } from 'react-router-dom';
import { orderBurgerByNumber } from '../../services/slices/order/action';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и burger-ingredients из стора */
  const { number } = useParams();

  const dispatch = useDispatch();

  const orderData = useSelector((state) => {
    let order = state.feeds.orders.find(
      (order) => order.number === Number(number)
    );
    if (order) {
      return order;
    }

    order = state.profileFeed.orders.find(
      (order) => order.number === Number(number)
    );
    if (order) {
      return order;
    }

    return state.order.orderByNumber;
  });

  useEffect(() => {
    if (!orderData) {
      dispatch(orderBurgerByNumber(Number(number)));
    }
  }, []);

  const ingredients = useSelector(getIngredientsItems);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
