import {fireEvent, render} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {setupServer} from 'msw/node';
import Login from '../Login';
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
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('Login Renders', async () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>);
  await waitFor(() => screen.getByText('Log In'));
});

/**
 */
test('invalid login', async () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>);
  await waitFor(() => screen.getByText('Log In'));
  fireEvent.click(screen.getByText('Log In'));
  await waitFor(() => screen.getByText('Invalid password or username/phone#'));
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
        <Login />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Log In'));
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});

test('successful login', async () => {
  server.use(
    rest.post('/v0/auth/login', (req, res, ctx) => {
      return res(ctx.status(200),
        ctx.json({test: 'testing'}));
    }),
  );
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Log In'));
  fireEvent.click(screen.getByText('Log In'));
  await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
});

test('click register', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Log In'));
  fireEvent.click(screen.getByText('Create new account'));
  await waitFor(() =>
    expect(mockHistoryPush).toHaveBeenCalledWith('/register'));
});


test('login with email', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Log In'));
  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, {
    target: {value: 'n@n.com'},
  });
  fireEvent.click(screen.getByText('Log In'));
  await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
});
