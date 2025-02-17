import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

describe("Greeting", () => {
  describe("When user is logged in", () => {
    it("displays the user name and the description in the greeting message", () => {
      // 1. Setup
      render(<Greeting user={{ name: "Iasmim", isLoggedIn: true }} />);

      const greetingMessage = screen.getByRole("heading", {
        name: "Welcome, Iasmim!",
      });
      const description = screen.getByText(
        "Explore your favorite snacks and add them to your lists below!"
      );

      // 3. Assertion
      expect.soft(greetingMessage).toBeInTheDocument();
      expect.soft(description).toBeInTheDocument();
    });
  });

  describe("When user is logged out", () => {
    it("displays the default greeting message and the description", () => {
      // 1. Setup
      render(<Greeting user={{ name: "", isLoggedIn: false }} />);

      const defaultMessage = screen.getByRole("heading", {
        name: "Welcome to SnackList!",
      });
      const description = screen.getByText(
        "The best place to get your snacks lists all sorted out!"
      );

      // 3. Assertion
      expect.soft(defaultMessage).toBeInTheDocument();
      expect.soft(description).toBeInTheDocument();
    });
  });
});
