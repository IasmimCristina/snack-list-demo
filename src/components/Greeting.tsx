import React from 'react';
import { User } from '../types/User';
import { FaPizzaSlice, FaCookieBite } from 'react-icons/fa'; 
import './Greeting.css';

type GreetingProps = {
  user: User;
};

const Greeting = ({ user }: GreetingProps) => {
  return (
    <div className="greeting">
      <div className="greeting__icon">
        {user.isLoggedIn ? (
          <FaPizzaSlice size={50} color="var(--color-accent)" />
        ) : (
          <FaCookieBite size={50} color="var(--color-accent)" />
        )}
      </div>
      <div className="greeting__message">
        {user.isLoggedIn ? (
          <h1 className="greeting__text">Welcome, {user.name}!</h1>
        ) : (
          <h1 className="greeting__text">Welcome to SnackList!</h1>
        )}
      </div>
      <p className="greeting__description">
        {user.isLoggedIn ? (
          "Explore your favorite snacks and add them to your lists below!"
        ) : (
          "The best place to get your snacks lists all sorted out!"
        )}
      </p>
    </div>
  );
};

export default Greeting;
