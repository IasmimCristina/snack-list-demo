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
      name: "Snack 01",
      description: "Crispy sweet potato chips",
      type: "sweet",
      like: true,
    },
  ],
  dislikes: [
    {
      id: "2",
      name: "Snack 02",
      description: "Black licorice candy",
      type: "sweet",
      like: false,
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

  describe("when user is logged out", () => {
    beforeEach(() => {
      setup({ name: "", isLoggedIn: false });
    });

    it("displays login message", () => {
      expect
        .soft(screen.getByText(/Login to start adding your favorite snacks!/i))
        .toBeInTheDocument();
    });

    it("does not render snack form and lists", () => {
      expect
        .soft(screen.queryByRole("list", { name: /Snacks I Like/i }))
        .not.toBeInTheDocument();
      expect
        .soft(screen.queryByRole("list", { name: /Snacks I Don't Like/i }))
        .not.toBeInTheDocument();

      expect.soft(screen.queryByRole("form")).not.toBeInTheDocument();
    });
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      setup({ name: "Ias", isLoggedIn: true });
    });

    it("displays both snack lists with correct titles", () => {
      expect.soft(screen.getByText(/Snacks I Like 👍/i)).toBeInTheDocument();
      expect
        .soft(screen.getByText(/Snacks I Don't Like 👎/i))
        .toBeInTheDocument();
    });

    it("shows initial snacks in their lists", () => {
      const likedList = screen.getByRole("list", { name: /Snacks I Like/i });
      const dislikedList = screen.getByRole("list", {
        name: /Snacks I Don't Like/i,
      });

      expect.soft(within(likedList).getByText(/Snack 01/i));
      expect.soft(within(dislikedList).getByText(/Snack 02/i));
    });

    describe("when adding a new snack", () => {
      it("adds a liked snack correctly", async () => {
        await user.type(screen.getByLabelText(/Snack Name/i), "New Snack");
        await user.type(
          screen.getByLabelText(/Description/i),
          "Tasty snack description"
        );
        await user.selectOptions(screen.getByLabelText(/Type/i), "salty");
        await user.click(screen.getByLabelText(/I like it 👍/i));
        await user.click(screen.getByRole("button", { name: /Add Snack/i }));

        await waitFor(() =>
          expect.soft(screen.getByText(/New Snack/i)).toBeInTheDocument()
        );
      });
    });

    describe("when removing a snack", () => {
      it("removes a liked snack correctly", async () => {
        const likedList = screen.getByRole("list", { name: /Snacks I Like/i });
        const removeButton = within(likedList).getByRole("button", {
          name: /Remove/i,
        });

        await user.click(removeButton);

        await waitFor(() =>
          expect.soft(screen.queryByText(/Snack 01/i)).not.toBeInTheDocument()
        );
      });
    });
  });
});
