import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, expect } from "vitest";
import { User } from "../types/User";
import Header from "./Header";

const setup = (initialUser: User) => {
  function HeaderWrapper() {
    const [user, setUser] = useState(initialUser);
    return <Header user={user} setUser={setUser} />;
  }

  return render(<HeaderWrapper />);
};

describe("Header component", () => {
  const user = userEvent.setup();
  describe("When user is logged out", () => {
    beforeEach(() => {
      setup({ name: "", isLoggedIn: false });
    });

    it("renders login button", () => {
      expect.soft(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
      expect.soft(
        screen.queryByRole("button", { name: /logout/i })
      ).not.toBeInTheDocument();
    });

    it("opens login form when clicking login button", async () => {
      await user.click(screen.getByRole("button", { name: /login/i }));

      expect(
        screen.getByRole("form", { name: /login form/i })
      ).toBeInTheDocument();
      expect.soft(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect.soft(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("closes login form when clicking close button", async () => {
      await user.click(screen.getByRole("button", { name: /login/i }));
      await user.click(
        screen.getByRole("button", { name: /close login form/i })
      );

      expect(
        screen.queryByRole("form", { name: /login form/i })
      ).not.toBeInTheDocument();
    });

    it("shows validation errors when submitting empty form", async () => {
      await user.click(screen.getByRole("button", { name: /login/i }));
      await user.click(screen.getByRole("button", { name: /log in/i }));

      expect
        .soft(screen.getByText(/username is required/i))
        .toBeInTheDocument();
      expect
        .soft(screen.getByText(/password is required/i))
        .toBeInTheDocument();
    });

    it("logs in successfully with valid credentials", async () => {
      await user.click(screen.getByRole("button", { name: /login/i }));
      await user.type(screen.getByLabelText(/username/i), "John");
      await user.type(screen.getByLabelText(/password/i), "password");
      await user.click(screen.getByRole("button", { name: /log in/i }));

      await waitFor(() => {
        expect(
          screen.queryByRole("form", { name: /login form/i })
        ).not.toBeInTheDocument();
      });
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /logout/i })
      ).toBeInTheDocument();
    });

    it("shows alert for invalid credentials", async () => {
      const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

      await user.click(screen.getByRole("button", { name: /login/i }));
      await user.type(screen.getByLabelText(/username/i), "Akemi");
      await user.type(screen.getByLabelText(/password/i), "wrongpassword");
      await user.click(screen.getByRole("button", { name: /log in/i }));

      expect(alertMock).toHaveBeenCalledWith("Invalid password!");
      alertMock.mockRestore();
    });
  });

  describe("When user is logged in", () => {
    beforeEach(() => {
      setup({ name: "Ias", isLoggedIn: true });
    });

    it("renders username and logout button", () => {
      expect(screen.getByText("Ias")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /logout/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /login/i })
      ).not.toBeInTheDocument();
    });

    it("logs out correctly", async () => {
      await user.click(screen.getByRole("button", { name: /logout/i }));

      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /logout/i })
      ).not.toBeInTheDocument();
    });
  });
});
