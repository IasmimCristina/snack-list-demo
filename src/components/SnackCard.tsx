import React from 'react';
import { Snack } from '../types/Snack';
import { FaTrash } from 'react-icons/fa';
import './SnackCard.css'

type SnackCardProps = {
  snack: Snack;
  dispatch: React.Dispatch<any>;
};

const SnackCard = ({ snack, dispatch }: SnackCardProps) => {
  const handleRemove = () => {
    dispatch({ type: 'REMOVE_SNACK', payload: { id: snack.id } });
  };

  return (
    <li className="snack-card">
      <div className="snack-card__header">
        <h3 className="snack-card__name">{snack.name}</h3>
        <button className="snack-card__button" onClick={handleRemove}>
          <FaTrash />
          Remove
        </button>
      </div>
      <p className="snack-card__description">{snack.description}</p>
      <p className="snack-card__type">Type: {snack.type}</p>
    </li>
  );
};

export default SnackCard;
