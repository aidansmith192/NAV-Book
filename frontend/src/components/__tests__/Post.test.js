import {fireEvent, render} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {setupServer} from 'msw/node';
import Post from '../Post';
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
    return res(ctx.status(200),
      ctx.json({test: 'test'}));
  }),
  rest.post('/v0/auth/login', (req, res, ctx) => {
    return res(ctx.status(401));
  }),
  rest.post('/v0/auth/register', (req, res, ctx) => {
    return res(ctx.status(400));
  }),
  rest.post('/v0/listings/vehicles', (req, res, ctx) => {
    return res(ctx.status(400));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Post Renders', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
});


test('Post Renders, and can select a category', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.change(screen.getByText('vehicles'),
    {target: {value: 'technology'}});
  await waitFor(() => screen.getByText('technology'));
});

test('click next', async () => {
  // https://stackoverflow.com/questions/43008925/
  // how-to-mock-navigator-geolocation-in-a-react-jest-test/64995659
  const mockGeolocation = {
    getCurrentPosition: jest.fn()
      .mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      }))),
  };
  global.navigator.geolocation = mockGeolocation;
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
});

test('invalid price', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
  const titleInput = screen.getByTestId('title-input');
  fireEvent.change(titleInput, {
    target: {value: 'test'},
  });
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, {
    target: {value: 'test'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
});

test('valid price and title', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
  const titleInput = screen.getByTestId('title-input');
  fireEvent.change(titleInput, {
    target: {value: 'test'},
  });
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, {
    target: {value: '1235'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() =>
    screen.getByText('Add a description. (512 character max)'));
});

test('empty title', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
  const titleInput = screen.getByTestId('title-input');
  fireEvent.change(titleInput, {
    target: {value: ''},
  });
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, {
    target: {value: '1235'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
});


test('description too big', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
  const titleInput = screen.getByTestId('title-input');
  fireEvent.change(titleInput, {
    target: {value: 'test'},
  });
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, {
    target: {value: '1235'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() =>
    screen.getByText('Add a description. (512 character max)'));
  const descriptionInput = screen.getByTestId('description-input');
  fireEvent.change(descriptionInput, {
    target: {value: '1'.repeat(600)},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() =>
    screen.getByText('Add a description. (512 character max)'));
});

test('description OK', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
  const titleInput = screen.getByTestId('title-input');
  fireEvent.change(titleInput, {
    target: {value: 'test'},
  });
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, {
    target: {value: '1235'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() =>
    screen.getByText('Add a description. (512 character max)'));
  const descriptionInput = screen.getByTestId('description-input');
  fireEvent.change(descriptionInput, {
    target: {value: 'test'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Add image up to 5 image URLs'));
});

test('post listing with OK response1', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
  const titleInput = screen.getByTestId('title-input');
  fireEvent.change(titleInput, {
    target: {value: 'test'},
  });
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, {
    target: {value: '1235'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() =>
    screen.getByText('Add a description. (512 character max)'));
  const descriptionInput = screen.getByTestId('description-input');
  fireEvent.change(descriptionInput, {
    target: {value: 'test'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Add image up to 5 image URLs'));
  fireEvent.click(screen.getByText('Create!'));
  await waitFor(() =>screen.getByText(
    'An error occured creating your listing, ' +
    'please refresh the page and try again'));
  await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(0));
});

test('post listing with OK response2', async () => {
  server.use(
    rest.post('/v0/listings/vehicles', (req, res, ctx) => {
      return res(ctx.status(200));
    }));
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() => screen.getByText('Next'));
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Choose a title and price.'));
  const titleInput = screen.getByTestId('title-input');
  fireEvent.change(titleInput, {
    target: {value: 'test'},
  });
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, {
    target: {value: '1235'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() =>
    screen.getByText('Add a description. (512 character max)'));
  const descriptionInput = screen.getByTestId('description-input');
  fireEvent.change(descriptionInput, {
    target: {value: 'test'},
  });
  fireEvent.click(screen.getByText('Next'));
  await waitFor(() => screen.getByText('Add image up to 5 image URLs'));
  fireEvent.click(screen.getByText('Create!'));
  await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
});


test('post listing with OK response3', async () => {
  server.use(
    rest.get('/v0/auth/session', (req, res, ctx) => {
      return res(ctx.status(401));
    }));
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post />
      </AuthProvider>
    </MemoryRouter>);
  await waitFor(() =>
    expect(mockHistoryPush).toHaveBeenCalledWith('/login'));
});


test('click next2', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Post/>
      </AuthProvider>
    </MemoryRouter>,
  );
  await waitFor(() => screen.getByText('Next'));
  const selector = screen.getByTestId('selector');
  selector.value = 'testing';
  fireEvent.change(selector, {target: {value: 'technology'}});
});
