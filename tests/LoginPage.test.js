import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from '../src/page/login/LoginPage';
import testData from '../src/testData.json';

describe('LoginPage', () => {
  test('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('pseudonym:')).toBeInTheDocument();
    expect(screen.getByLabelText('mot de passe:')).toBeInTheDocument();
    expect(screen.getByText('mot de passe oublié ?')).toBeInTheDocument();
  });

  test('successful login', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('pseudonym:'), { target: { value: 'testUser1' } });
    fireEvent.change(screen.getByLabelText('mot de passe:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login'));
    expect(window.alert).toHaveBeenCalledWith('Login successful!');
  });

  test('failed login', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('pseudonym:'), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText('mot de passe:'), { target: { value: 'wrongPass' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });
});