import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Snack } from '../types/Snack';

type SnackFormProps = {
  dispatch: React.Dispatch<any>;
};

const SnackForm = ({ dispatch }: SnackFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'salty' | 'sweet' | 'bitter'>('salty');
  const [like, setLike] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSnack: Snack = {
      id: uuidv4(),
      name,
      description,
      type,
      like,
    };

    dispatch({ type: 'ADD_SNACK', payload: newSnack });
    setName('');
    setDescription('');
    setType('salty');
    setLike(true);
  };

  return (
    <form className="snack-form" onSubmit={handleSubmit}>
      <h2 className="snack-form__title">Add a Snack</h2>
      <input
        type="text"
        placeholder="Snack name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
        required
      ></textarea>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as 'salty' | 'sweet' | 'bitter')}
      >
        <option value="salty">Salty</option>
        <option value="sweet">Sweet</option>
        <option value="bitter">Bitter</option>
      </select>
      <div>
        <label>
          <input
            type="radio"
            checked={like}
            onChange={() => setLike(true)}
          />{' '}
          I like
        </label>
        <label>
          <input
            type="radio"
            checked={!like}
            onChange={() => setLike(false)}
          />{' '}
          I don't like
        </label>
      </div>
      <button type="submit">Add Snack</button>
    </form>
  );
};

export default SnackForm;
