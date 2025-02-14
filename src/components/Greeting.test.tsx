import { render, screen } from "@testing-library/react";
import { User } from "../types/User";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  describe("when user is logged in", () => {
    beforeEach(() => {
      render(<Greeting user={{ name: "Iasmim", isLoggedIn: true }} />);
    });

    it("displays the user name in the greeting message", () => {
      const greetingMessage = screen.getByRole("heading", {
        name: /Welcome, Iasmim!/i,
      });
      expect(greetingMessage).toBeInTheDocument();
    });

    it("displays the description to explore snacks", () => {
      const description = screen.getByText(
        /Explore your favorite snacks and add them to your lists below!/i
      );
      expect(description).toBeInTheDocument();
    });
  });

  describe("when user is not logged in", () => {
    beforeEach(() => {
      render(<Greeting user={{ name: "", isLoggedIn: false }} />);
    });

    it("displays the default greeting message", () => {
      const greetingMessage = screen.getByRole("heading", {
        name: /Welcome to SnackList!/i,
      });
      expect(greetingMessage).toBeInTheDocument();
    });

    it("displays the description about snack lists", () => {
      const description = screen.getByText(
        /The best place to get your snacks lists all sorted out!/i
      );
      expect(description).toBeInTheDocument();
    });
  });
});
