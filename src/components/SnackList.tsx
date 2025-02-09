import React from 'react';
import { Snack } from '../types/Snack';
import SnackCard from './SnackCard';
import { FaCheckCircle } from 'react-icons/fa';
import './SnackList.css'
type SnackListProps = {
  title: string;
  snacks: Snack[];
  dispatch: React.Dispatch<any>;
};

const SnackList = ({ title, snacks, dispatch }: SnackListProps) => {
  return (
    <div className="snack-list">
      <h2 className="snack-list__title">
        {title}
        <div className="snack-list__quantity">
          {snacks.length} items
          <FaCheckCircle className="snack-list__quantity-icon" />
        </div>
      </h2>
      {snacks.length > 0 ? (
        <ul className="snack-list__items">
          {snacks.map((snack) => (
            <SnackCard key={snack.id} snack={snack} dispatch={dispatch} />
          ))}
        </ul>
      ) : (
        <p className="snack-list__empty-message">No snacks added yet!</p>
      )}
    </div>
  );
};

export default SnackList;
