import { Snack } from "../types/Snack";
import { initialLikes, initialDislikes } from "../data/initialSnacks";

export type SnackState = {
  likes: Snack[];
  dislikes: Snack[];
};

export const initialSnackState: SnackState = {
  likes: initialLikes,
  dislikes: initialDislikes,
};

type SnackAction =
  | { type: "ADD_SNACK"; payload: Snack }
  | { type: "REMOVE_SNACK"; payload: { id: string } };

export function snackReducer(
  state: SnackState,
  action: SnackAction
): SnackState {
  switch (action.type) {
    case "ADD_SNACK":
      if (action.payload.like) {
        return { ...state, likes: [...state.likes, action.payload] };
      } else {
        return { ...state, dislikes: [...state.dislikes, action.payload] };
      }
    case "REMOVE_SNACK":
      return {
        likes: state.likes.filter((snack) => snack.id !== action.payload.id),
        dislikes: state.dislikes.filter(
          (snack) => snack.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
