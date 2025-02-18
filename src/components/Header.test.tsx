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

    it.todo("opens login form when clicking login button", async () => {
      // 2. Action
      // 3. Assertion
    });

    it.todo("closes login form when clicking close button", async () => {
      // 2. Action
      // 3. Assertion
    });

    it.todo("shows validation errors when submitting empty form", async () => {
      // 2. Action
      // 3. Assertion
    });

    it.todo("logs in successfully with valid credentials", async () => {
      // 2. Action
      // 3. Assertion
    });

    it.todo("shows alert for invalid credentials", async () => {
      // Mock
      const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

      // 2. Action

      // 3. Assertion

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
