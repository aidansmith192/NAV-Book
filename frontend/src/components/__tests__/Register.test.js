import {fireEvent, render} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {setupServer} from 'msw/node';
import Register from '../Register';
import {rest} from 'msw';
import AuthProvider from '../../contexts/AuthContext';
import {MemoryRouter} from 'react-router-dom';
const URL = '/v0/dummy';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.json({message: 'Hello CSE183'}));
  }),
  rest.get('/v0/auth/session', (req, res, ctx) => {
    return res(ctx.status(401));
  }),
  rest.post('/v0/auth/login', (req, res, ctx) => {
    return res(ctx.status(401));
  }),
  rest.post('/v0/auth/register', (req, res, ctx) => {
    return res(ctx.status(400));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('Register Renders', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Sign Up'));
});


test('click sign up with out anything filled in', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Sign Up'));
  fireEvent.click(screen.getByText('Sign Up'));
  await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
});

test('click sign up with out anything filled in2', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Sign Up'));
  fireEvent.click(screen.getByText('Sign Up'));
  await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
});


test('click sign up with everythingfilled in, but password mismatch',
  async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>);
    await waitFor(() => screen.getByText('Sign Up'));
    const firstInput = screen.getByTestId('first-input');
    fireEvent.change(firstInput, {
      target: {value: 'new content'},
    });
    const lastInput = screen.getByTestId('last-input');
    fireEvent.change(lastInput, {
      target: {value: 'new content'},
    });
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: {value: 'n@n.com'},
    });
    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {
      target: {value: 'adfasdf'},
    });
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: {value: 'a'},
    });
    const confirmInput = screen.getByTestId('confirm-input');
    fireEvent.change(confirmInput, {
      target: {value: 'b'},
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
    await waitFor(() => screen.getByText('Passwords do not match.'));
  });

test('click sign up with everything filled in, but with bad phonenumber',
  async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>);
    await waitFor(() => screen.getByText('Sign Up'));
    const firstInput = screen.getByTestId('first-input');
    fireEvent.change(firstInput, {
      target: {value: 'new content'},
    });
    const lastInput = screen.getByTestId('last-input');
    fireEvent.change(lastInput, {
      target: {value: 'new content'},
    });
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: {value: 'n@n.com'},
    });
    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {
      target: {value: 'adfasdf'},
    });
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: {value: 'a'},
    });
    const confirmInput = screen.getByTestId('confirm-input');
    fireEvent.change(confirmInput, {
      target: {value: 'a'},
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
    await waitFor(() => screen.getByText('Invalid phone number.'));
  });

test('click sign up with everything filled in, but with bad phonenumber2',
  async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>);
    await waitFor(() => screen.getByText('Sign Up'));
    const firstInput = screen.getByTestId('first-input');
    fireEvent.change(firstInput, {
      target: {value: 'new content'},
    });
    const lastInput = screen.getByTestId('last-input');
    fireEvent.change(lastInput, {
      target: {value: 'new content'},
    });
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: {value: 'n@n.com'},
    });
    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {
      target: {value: '12351235'},
    });
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: {value: 'a'},
    });
    const confirmInput = screen.getByTestId('confirm-input');
    fireEvent.change(confirmInput, {
      target: {value: 'a'},
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
    await waitFor(() => screen.getByText('Invalid email.'));
  });

test('click sign up with everything filled in, but with invalid email',
  async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>);
    await waitFor(() => screen.getByText('Sign Up'));
    const firstInput = screen.getByTestId('first-input');
    fireEvent.change(firstInput, {
      target: {value: 'new content'},
    });
    const lastInput = screen.getByTestId('last-input');
    fireEvent.change(lastInput, {
      target: {value: 'new content'},
    });
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: {value: 'n@n.com'},
    });
    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {
      target: {value: '12351235'},
    });
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: {value: 'a'},
    });
    const confirmInput = screen.getByTestId('confirm-input');
    fireEvent.change(confirmInput, {
      target: {value: 'a'},
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
    await waitFor(() => screen.getByText('Invalid email.'));
  });

test('click sign up with everything filled in, but with email taken',
  async () => {
    server.use(
      rest.post('/v0/auth/register', (req, res, ctx) => {
        return res(ctx.status(409),
          ctx.json({error: 'email taken'}));
      }),
    );
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>);
    await waitFor(() => screen.getByText('Sign Up'));
    const firstInput = screen.getByTestId('first-input');
    fireEvent.change(firstInput, {
      target: {value: 'new content'},
    });
    const lastInput = screen.getByTestId('last-input');
    fireEvent.change(lastInput, {
      target: {value: 'new content'},
    });
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: {value: 'n@n.com'},
    });
    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {
      target: {value: '12351235'},
    });
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: {value: 'a'},
    });
    const confirmInput = screen.getByTestId('confirm-input');
    fireEvent.change(confirmInput, {
      target: {value: 'a'},
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
    await waitFor(() => screen.getByText('That email is already in use.'));
  });

test('click sign up with everything filled in, but with phonenumber taken',
  async () => {
    server.use(
      rest.post('/v0/auth/register', (req, res, ctx) => {
        return res(ctx.status(409),
          ctx.json({error: 'phoneNumber taken'}));
      }),
    );
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>);
    await waitFor(() => screen.getByText('Sign Up'));
    const firstInput = screen.getByTestId('first-input');
    fireEvent.change(firstInput, {
      target: {value: 'new content'},
    });
    const lastInput = screen.getByTestId('last-input');
    fireEvent.change(lastInput, {
      target: {value: 'new content'},
    });
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: {value: 'n@n.com'},
    });
    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {
      target: {value: '12351235'},
    });
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: {value: 'a'},
    });
    const confirmInput = screen.getByTestId('confirm-input');
    fireEvent.change(confirmInput, {
      target: {value: 'a'},
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      screen.getByText('That phone number is already in use.'));
  });

test('click sign up with everything filled in, but with phonenumber taken3',
  async () => {
    server.use(
      rest.post('/v0/auth/register', (req, res, ctx) => {
        return res(ctx.status(200),
          ctx.json({test: 'test'}));
      }),
    );
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>);
    await waitFor(() => screen.getByText('Sign Up'));
    const firstInput = screen.getByTestId('first-input');
    fireEvent.change(firstInput, {
      target: {value: 'new content'},
    });
    const lastInput = screen.getByTestId('last-input');
    fireEvent.change(lastInput, {
      target: {value: 'new content'},
    });
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: {value: 'n@n.com'},
    });
    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {
      target: {value: '12351235'},
    });
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: {value: 'a'},
    });
    const confirmInput = screen.getByTestId('confirm-input');
    fireEvent.change(confirmInput, {
      target: {value: 'a'},
    });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(2));
  });

test('load login page while already logged in', async () => {
  server.use(
    rest.get('/v0/auth/session', (req, res, ctx) => {
      return res(ctx.status(200),
        ctx.json({test: 'testing'}));
    }),
  );
  render(
    <MemoryRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Sign Up'));
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});
