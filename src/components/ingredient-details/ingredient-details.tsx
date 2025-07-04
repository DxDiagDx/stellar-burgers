import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { getIngredientsItems } from '../../services/slices/burger-ingredients/slice';
import { useLocation } from 'react-router-dom';
import { TIngredient } from '@utils-types';

type TIngredientDetailsProps = {
  title?: string;
  isModal?: boolean;
};

export const IngredientDetails: FC<TIngredientDetailsProps> = ({
  title,
  isModal
}) => {
  const location = useLocation();
  const ingredientId = location.pathname.split('/').pop();
  /** TODO: взять переменную из стора */
  const ingredients: TIngredient[] = useSelector(getIngredientsItems);
  const ingredientData: TIngredient = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  )!;
  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      title={title}
      ingredientData={ingredientData}
      isModal={isModal}
    />
  );
};
