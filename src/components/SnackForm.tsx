import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Snack } from '../types/Snack';
import './SnackForm.css'

type SnackFormProps = {
  dispatch: React.Dispatch<any>;
};

const SnackForm = ({ dispatch }: SnackFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'salty' | 'sweet' | 'bitter'>('salty');
  const [like, setLike] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "" || description.trim() === "") {
      setIsNameValid(name.trim() !== "");
      setIsDescriptionValid(description.trim() !== "");
      return;
    }

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

      <div className="snack-form__field">
        <label htmlFor="name" className="snack-form__label">Snack Name</label>
        <input
          id="name"
          className={`snack-form__input ${!isNameValid ? 'error' : ''}`}
          type="text"
          placeholder="Snack name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!isNameValid && <span className="error-message">Snack name is required.</span>}
      </div>

      <div className="snack-form__field">
        <label htmlFor="description" className="snack-form__label">Description</label>
        <textarea
          id="description"
          className={`snack-form__textarea ${!isDescriptionValid ? 'error' : ''}`}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={25}
        />
        {!isDescriptionValid && <span className="error-message">Description is required.</span>}
      </div>

      <div className="snack-form__field">
        <label htmlFor="type" className="snack-form__label">Type</label>
        <select
          id="type"
          className="snack-form__select"
          value={type}
          onChange={(e) => setType(e.target.value as 'salty' | 'sweet' | 'bitter')}
        >
          <option value="salty">Salty</option>
          <option value="sweet">Sweet</option>
          <option value="bitter">Bitter</option>
        </select>
      </div>

      <div className="snack-form__field">
        <label>
          <input
            type="radio"
            checked={like}
            onChange={() => setLike(true)}
          />{' '}
          I like it 👍
        </label>
        <label>
          <input
            type="radio"
            checked={!like}
            onChange={() => setLike(false)}
          />{' '}
          I don't like it 👎
        </label>
      </div>

      <button type="submit" className="snack-form__button">Add Snack</button>
    </form>
  );
};

export default SnackForm;
