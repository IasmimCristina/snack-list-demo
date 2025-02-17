import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SnackManager from "./SnackManager";
import { useReducer } from "react";
import { snackReducer, SnackState } from "../reducers/snackReducer";
import { User } from "../types/User";

const initialSnacks: SnackState = {
  likes: [
    {
      id: "1",
      name: "Good snack",
      description: "Tasty food",
      type: "salty",
      like: true,
    },
  ],
  dislikes: [
    {
      id: "2",
      name: "Bad snack",
      description: "Weird sweet bar",
      type: "sweet",
      like: true,
    },
  ],
};

describe("SnackManager", () => {
  const user = userEvent.setup();

  const setup = (user: User) => {
    function SnackManagerWrapper() {
      const [snacks, dispatch] = useReducer(snackReducer, initialSnacks);
      return <SnackManager snacks={snacks} dispatch={dispatch} user={user} />;
    }

    return render(<SnackManagerWrapper />);
  };

  describe("When user is logged out", () => {
    it("displays login message", () => {
      // 1. Setup
      setup({ name: "", isLoggedIn: false });

      // 3. Assertion
      expect(
        screen.getByText("Login to start adding your favorite snacks!")
      ).toBeInTheDocument();
    });
  });

  describe("When user is logged in", () => {
    beforeEach(() => {
      // 1. Setup
      setup({ name: "Ias", isLoggedIn: true });
    });

    it.todo("displays both snack lists with their items", () => {
      // const likedList =
      // const dislikedList =

      // Debugging tool
      // screen.logTestingPlaygroundURL();
      
      // 3. Assertion
    });

    describe("When adding a new snack", () => {
      it.todo("adds a liked snack correctly", async () => {
        // 2. Action
        // 3. Assertion
      });
    });

    describe("When removing a snack", () => {
      it.todo("removes a liked snack correctly", async () => {
        // 2. Action
        // 3. Assertion
      });
    });
  });
});
