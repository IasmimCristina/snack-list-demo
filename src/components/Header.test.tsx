import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, expect } from 'vitest';
import { User } from '../types/User';
import Header from './Header';

describe('Header component', () => {
  const mockSetUser = vi.fn();

  describe('When user is logged out', () => {
    const mockUser: User = {
      name: '',
      isLoggedIn: false
    };

    it('renders login button when user is not logged in', () => {
      render(<Header user={mockUser} setUser={mockSetUser} />);

      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    });

    it('opens login form when clicking login button', async () => {
      const user = userEvent.setup();
      render(<Header user={mockUser} setUser={mockSetUser} />);

      await user.click(screen.getByRole('button', { name: /login/i }));

      expect(screen.getByRole('form', { name: /login form/i })).toBeInTheDocument();
      expect.soft(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect.soft(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('closes login form when clicking close button', async () => {
      const user = userEvent.setup();
      render(<Header user={mockUser} setUser={mockSetUser} />);

      await user.click(screen.getByRole('button', { name: /login/i }));
      await user.click(screen.getByRole('button', { name: /close login form/i }));

      expect(screen.queryByRole('form', { name: /login form/i })).not.toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
      const user = userEvent.setup();
      render(<Header user={mockUser} setUser={mockSetUser} />);

      await user.click(screen.getByRole('button', { name: /login/i }));
      await user.click(screen.getByRole('button', { name: /log in/i }));

      expect.soft(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect.soft(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    it('logs in successfully with valid credentials', async () => {
      const user = userEvent.setup();
      render(<Header user={mockUser} setUser={mockSetUser} />);

      await user.click(screen.getByRole('button', { name: /login/i }));
      await user.type(screen.getByLabelText(/username/i), 'John');
      await user.type(screen.getByLabelText(/password/i), 'password');
      await user.click(screen.getByRole('button', { name: /log in/i }));

      expect(mockSetUser).toHaveBeenCalledWith({
        name: 'John',
        isLoggedIn: true
      });
      expect(screen.queryByRole('form', { name: /login form/i })).not.toBeInTheDocument();
    });

    it('shows alert for invalid credentials', async () => {
      const user = userEvent.setup();
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

      render(<Header user={mockUser} setUser={mockSetUser} />);

      await user.click(screen.getByRole('button', { name: /login/i }));
      await user.type(screen.getByLabelText(/username/i), 'John');
      await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
      await user.click(screen.getByRole('button', { name: /log in/i }));

      expect(alertMock).toHaveBeenCalledWith('Invalid username or password');
      alertMock.mockRestore();
    });
  });

  describe('When user is logged in', () => {
    const mockUser: User = {
      name: 'John',
      isLoggedIn: true
    };

    it('renders username and logout button', () => {
      render(<Header user={mockUser} setUser={mockSetUser} />);

      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
    });

    it('logs out correctly', async () => {
      const user = userEvent.setup();
      render(<Header user={mockUser} setUser={mockSetUser} />);

      await user.click(screen.getByRole('button', { name: /logout/i }));

      expect(mockSetUser).toHaveBeenCalledWith({
        name: '',
        isLoggedIn: false
      });

      // Not: removii a verificação do Login button aqui porque o componente
      // apenas vai mostrar o botão de Login quando receber as novas props
      // O setUser é mockado, então não causa re-render automático
    });
  });
});
