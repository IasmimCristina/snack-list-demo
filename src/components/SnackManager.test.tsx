import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SnackManager from './SnackManager';
import { SnackState } from '../reducers/snackReducer';
import { User } from '../types/User';
import { Snack } from '../types/Snack';

describe('SnackManager', () => {
  const mockDispatch = vi.fn();

  const initialSnacks: SnackState = {
    likes: [
      {
        id: '1',
        name: 'Snack 01',
        description: 'Crispy potato chips',
        type: 'salty',
        like: true
      }
    ],
    dislikes: [
      {
        id: '2',
        name: 'Snack 02',
        description: 'Black licorice candy',
        type: 'sweet',
        like: false
      }
    ]
  };

  describe('when user is logged out', () => {
    const loggedOutUser: User = {
      name: '',
      isLoggedIn: false
    };

    beforeEach(() => {
      render(<SnackManager snacks={initialSnacks} dispatch={mockDispatch} user={loggedOutUser} />);
    });

    it('displays login message', () => {
      expect(screen.getByText(/Login to start adding your favorite snacks!/i)).toBeInTheDocument();
    });

    it('does not render snack form and lists', () => {
      expect(screen.queryByText(/Snacks I Like/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('form')).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    const loggedInUser: User = {
      name: 'John',
      isLoggedIn: true
    };

    beforeEach(() => {
      render(<SnackManager snacks={initialSnacks} dispatch={mockDispatch} user={loggedInUser} />);
    });

    it('displays both snack lists with correct titles', () => {
      expect(screen.getByText(/Snacks I Like 👍/i)).toBeInTheDocument();
      expect(screen.getByText(/Snacks I Don't Like 👎/i)).toBeInTheDocument();
    });

    it('shows initial snacks in their respective lists', () => {
      expect(screen.getByText(/Snack 01/i)).toBeInTheDocument();
      expect(screen.getByText(/Snack 02/i)).toBeInTheDocument();
    });

    describe('when adding a new snack', () => {
      it('adds a liked snack correctly', async () => {
        const snackNameInput = screen.getByLabelText(/Snack Name/i);
        const snackDescriptionInput = screen.getByLabelText(/Description/i);
        const snackTypeSelect = screen.getByLabelText(/Type/i);
        const likeRadio = screen.getByLabelText(/I like it 👍/i);
        const submitButton = screen.getByText(/Add Snack/i);

        await userEvent.type(snackNameInput, 'New Snack');
        await userEvent.type(snackDescriptionInput, 'Tasty snack description');
        await userEvent.selectOptions(snackTypeSelect, 'salty');
        await userEvent.click(likeRadio);
        await userEvent.click(submitButton);

        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: 'ADD_SNACK',
          payload: expect.objectContaining({
            name: 'New Snack',
            description: 'Tasty snack description',
            type: 'salty',
            like: true,
          })
        }));
      });

      it('adds a disliked snack correctly', async () => {
        const snackNameInput = screen.getByLabelText(/Snack Name/i);
        const snackDescriptionInput = screen.getByLabelText(/Description/i);
        const snackTypeSelect = screen.getByLabelText(/Type/i);
        const dislikeRadio = screen.getByLabelText(/I don't like it 👎/i);
        const submitButton = screen.getByText(/Add Snack/i);

        await userEvent.type(snackNameInput, 'Bad Snack');
        await userEvent.type(snackDescriptionInput, 'Not so tasty snack');
        await userEvent.selectOptions(snackTypeSelect, 'sweet');
        await userEvent.click(dislikeRadio);
        await userEvent.click(submitButton);

        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: 'ADD_SNACK',
          payload: expect.objectContaining({
            name: 'Bad Snack',
            description: 'Not so tasty snack',
            type: 'sweet',
            like: false,
          })
        }));
      });

      it('shows error message if snack name is missing', async () => {
        const snackDescriptionInput = screen.getByLabelText(/Description/i);
        const snackTypeSelect = screen.getByLabelText(/Type/i);
        const likeRadio = screen.getByLabelText(/I like it 👍/i);
        const submitButton = screen.getByText(/Add Snack/i);

        await userEvent.type(snackDescriptionInput, 'Description only snack');
        await userEvent.selectOptions(snackTypeSelect, 'bitter');
        await userEvent.click(likeRadio);
        await userEvent.click(submitButton);

        expect(screen.getByText(/Snack name is required./i)).toBeInTheDocument();
      });

      it('shows error message if description is missing', async () => {
        const snackNameInput = screen.getByLabelText(/Snack Name/i);
        const snackTypeSelect = screen.getByLabelText(/Type/i);
        const likeRadio = screen.getByLabelText(/I like it 👍/i);
        const submitButton = screen.getByText(/Add Snack/i);

        await userEvent.type(snackNameInput, 'Snack Without Description');
        await userEvent.selectOptions(snackTypeSelect, 'salty');
        await userEvent.click(likeRadio);
        await userEvent.click(submitButton);

        expect(screen.getByText(/Description is required./i)).toBeInTheDocument();
      });
    });
  });
});
