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
    beforeEach(() => {
      // 1. Setup

      setup({ name: "", isLoggedIn: false });
    });

    it("displays login message", () => {
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

    it("displays both snack lists with their items", () => {
      // Option - data-testId:
      const likedList = screen.getByTestId("snacks-i-like-👍");
      const dislikedList = screen.getByTestId("snacks-i-do-not-like-👎");

      // Second option:
      // const likedList = screen.getByRole("list", { name: "Snacks I like 👍 1 item(s)" });
      // const dislikedList = screen.getByRole("list", {
      //   name: "Snacks I do not like 👎 1 item(s)",
      // });

      // Debugging tool
      screen.logTestingPlaygroundURL();

      // 3. Assertion
      expect.soft(likedList).toBeInTheDocument();
      expect.soft(dislikedList).toBeInTheDocument();
      expect.soft(within(likedList).getByText("Good snack"));
      expect.soft(within(dislikedList).getByText("Bad snack"));
    });

    describe("When adding a new snack", () => {
      it("adds a liked snack correctly", async () => {
        const likedList = screen.getByTestId("snacks-i-like-👍");

        // 2. Action
        await user.type(screen.getByLabelText(/Snack Name/i), "New snack");
        await user.type(
          screen.getByLabelText("Description"),
          "Tasty snack description"
        );
        // await user.selectOptions(screen.getByLabelText("Type"), "bitter");
        await user.click(screen.getByRole("option", { name: "Bitter" }));
        await user.click(screen.getByLabelText("I like it 👍"));
        await user.click(screen.getByRole("button", { name: "Add Snack" }));

        // 3. Assertion
        expect(within(likedList).getByText("New snack"));
      });
    });

    describe("When removing a snack", () => {
      it("removes a liked snack correctly", async () => {
        const likedList = screen.getByTestId("snacks-i-like-👍");
        const removeButton = within(likedList).getByRole("button", {
          name: "Remove",
        });

        // 2. Action
        await user.click(removeButton);

        // 3. Assertion
        await waitFor(() =>
          expect.soft(screen.queryByText("Good snack")).not.toBeInTheDocument()
        );
      });
    });
  });
});
