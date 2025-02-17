import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, expect } from "vitest";
import { User } from "../types/User";
import Header from "./Header";

// Custom render
const setup = (initialUser: User) => {
  function HeaderWrapper() {
    const [user, setUser] = useState(initialUser);
    return <Header user={user} setUser={setUser} />;
  }

  return render(<HeaderWrapper />);
};

describe("Header", () => {
  const user = userEvent.setup();
  describe("When user is logged out", () => {
    beforeEach(() => {
      // 1. Setup
      setup({ name: "", isLoggedIn: false });
    });

    it("renders the login button and hides logout button", () => {
      // 3. Assertion
      expect
        .soft(screen.getByRole("button", { name: "Login" }))
        .toBeInTheDocument();
      expect
        .soft(screen.queryByRole("button", { name: "Logout" }))
        .not.toBeInTheDocument();
    });

    it("opens login form when clicking login button", async () => {
      // 2. Action
      await user.click(screen.getByRole("button", { name: "Login" }));

      // 3. Assertion
      expect
        .soft(screen.getByRole("form", { name: "Login form" }))
        .toBeInTheDocument();
      expect.soft(screen.getByLabelText("Username")).toBeInTheDocument();
      expect.soft(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("closes login form when clicking close button", async () => {
      // 2. Action
      await user.click(screen.getByRole("button", { name: "Login" }));
      await user.click(
        screen.getByRole("button", { name: "Close login form" })
      );

      // 3. Assertion
      expect(
        screen.queryByRole("form", { name: "Login form" })
      ).not.toBeInTheDocument();
    });

    it("shows validation errors when submitting empty form", async () => {
      // 2. Action
      await user.click(screen.getByRole("button", { name: "Login" }));
      await user.click(screen.getByRole("button", { name: "Continue" }));

      // 3. Assertion
      expect
        .soft(screen.getByText("Username is required."))
        .toBeInTheDocument();
      expect
        .soft(screen.getByText("Password is required."))
        .toBeInTheDocument();
    });

    it("logs in successfully with valid credentials", async () => {
      // 2. Action
      await user.click(screen.getByRole("button", { name: "Login" }));
      await user.type(screen.getByLabelText("Username"), "Ias");
      await user.type(screen.getByLabelText("Password"), "password");
      await user.click(screen.getByRole("button", { name: "Continue" }));

      // 3. Assertion
      await waitFor(() => {
        expect(
          screen.queryByRole("form", { name: "Login form" })
        ).not.toBeInTheDocument();
      });
      expect.soft(screen.getByText("Ias")).toBeInTheDocument();
      expect
        .soft(screen.getByRole("button", { name: "Logout" }))
        .toBeInTheDocument();
      expect
        .soft(screen.queryByRole("button", { name: "Login" }))
        .not.toBeInTheDocument();
    });

    it("shows alert for invalid credentials", async () => {
      // Mock
      const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

      // 2. Action
      await user.click(screen.getByRole("button", { name: "Login" }));
      await user.type(screen.getByLabelText(/username/i), "Akemi");
      await user.type(screen.getByLabelText(/password/i), "wrongpassword");
      await user.click(screen.getByRole("button", { name: "Continue" }));

      // 3. Assertion
      expect(alertMock).toHaveBeenCalledWith("Invalid password!");

      alertMock.mockRestore();
    });
  });

  describe("When user is logged in", () => {
    it("logs out correctly", async () => {
      // 1. Setup
      setup({ name: "Ias", isLoggedIn: true });
      
      // 2. Action
      await user.click(screen.getByRole("button", { name: "Logout" }));

      // 3. Assertion
      expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });
  });
});
