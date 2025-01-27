import React from 'react';
import { Snack } from '../types/Snack';
import { FaTrash } from 'react-icons/fa';

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
      <h3>{snack.name}</h3>
      <p>{snack.description}</p>
      <p>Type: {snack.type}</p>
      <button onClick={handleRemove}>
        <FaTrash /> Remove
      </button>
    </li>
  );
};

export default SnackCard;
