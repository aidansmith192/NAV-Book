import {render, fireEvent} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {MemoryRouter} from 'react-router-dom';


import SharedContext from '../../contexts/AuthContext';
import Home from '../Home';

//  const server = setupServer(
//    rest.get(URL, (req, res, ctx) => {
//      return res(ctx.json([{ name: "Vehicles"}]));
//    })
//  );

const server = setupServer(
  rest.get('/v0/auth/session', (req, res, ctx) => {
    return res(ctx.status(401));
  }),
  rest.get('/v0/listings', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post('/v0/auth/logout', (req, res, ctx) => {
    return res(ctx.json(200));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
});

const doRender= () => {
  render(
    <SharedContext
      //  value={{ select, showCategories, setShowCategories }}
    >
      <Home />
    </SharedContext>,
  );
};

/**
  * Opening the categories dialog fetches a known catgeory.
  * Selecting that catgeory sets shared state and closes the dialog.
  */
test('Home Page Exists', async () => {
  doRender();
  await waitFor(() => screen.getByText('All Categories'));
});

test('Category is Opened', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  await waitFor(() => screen.getByTestId('vehicle-category'));
  //  fireEvent.click(await waitFor(() => screen.getByText("Marketplace")));
});

test('SubCategory Exists', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
  await waitFor(() => screen.getByTestId('motorcycle-sub-category'));
  await waitFor(() => screen.getByTestId('sedan-sub-category'));
  await waitFor(() => screen.getByTestId('truck-sub-category'));
});

test('Category is deselected', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('marketplace')));
});

test('Category is Instruments', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('instrument-category')));
});

test('Category is Technology', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('technology-category')));
  // const cont = await screen.queryByTestId("marketplace");
  // expect(cont).toBe(true);
});

test('Category is Vehicles', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
});

test('SubCategory is Motorcycles', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByText('All Categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('motorcycle-sub-category')));
});

test('SubCategory is Sedans', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('sedan-sub-category')));
});

test('SubCategory is Trucks', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('truck-sub-category')));
});

test('Remove Subcategory', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('truck-sub-category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('return-vehicle')));
});

test('Remove Categories', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('truck-sub-category')));
  fireEvent.click(await waitFor(() => screen.getByText('Marketplace')));
});

test('Searching', async () => {
  doRender();
  const search = await waitFor(() =>
    screen.getByPlaceholderText('Search Marketplace'));
  fireEvent.change(search, {
    target: {value: 'test'},
  });
});

test('Filter', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
});

test('Filter by Price', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
  const sort = screen.getByTestId('price-sort');
  fireEvent.change(sort, {
    target: {value: 'PA'},
  });
});

test('Filter by Instrument Type', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('instrument-category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
  const sort = screen.getByTestId('instrument-sort');
  fireEvent.change(sort, {
    target: {value: 'brass'},
  });
});

test('Filter by Technology Brand', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('technology-category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
  const sort = screen.getByTestId('technology-sort');
  fireEvent.change(sort, {
    target: {value: 'apple'},
  });
});

test('Filter by Vehicle Condition', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
  const sort = screen.getByTestId('vehicle-sort');
  fireEvent.change(sort, {
    target: {value: 'new'},
  });
});

test('Filter by Motorcycle Brand', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('motorcycle-sub-category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
  const sort = screen.getByTestId('motorcycle-sort');
  fireEvent.change(sort, {
    target: {value: 'ducati'},
  });
});

test('Filter by Sedan Brand', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('sedan-sub-category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
  const sort = screen.getByTestId('sedan-sort');
  fireEvent.change(sort, {
    target: {value: 'honda'},
  });
});

test('Filter by Truck Brand', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('all-categories')));
  fireEvent.click(await waitFor(() => screen.getByTestId('vehicle-category')));
  fireEvent.click(await waitFor(() =>
    screen.getByTestId('truck-sub-category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
  const sort = screen.getByTestId('truck-sort');
  fireEvent.change(sort, {
    target: {value: 'ford'},
  });
});

test('Reset Filters', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByTestId('filters')));
  fireEvent.click(await waitFor(() => screen.getByText('Reset Filters')));
});

test('Location Fail', async () => {
  doRender();
  fireEvent.click(await waitFor(() => screen.getByText('Location')));
  // userEvent.type(screen.getByTestId("radius"), "25");
  const radius = screen.getByTestId('radius');
  fireEvent.change(radius, {
    target: {value: 25},
  });
});

test('Location', async () => {
  // Geolocation Mocking taken from:
  // https://stackoverflow.com/questions/43008925
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
  doRender();
  fireEvent.click(await waitFor(() => screen.getByText('Location')));
  // userEvent.type(screen.getByTestId("radius"), "25");
  const radius = screen.getByTestId('radius');
  fireEvent.change(radius, {
    target: {value: 25},
  });
});

test('Undo Location', async () => {
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
  doRender();
  fireEvent.click(await waitFor(() => screen.getByText('Location')));
  const radius = screen.getByTestId('radius');
  fireEvent.change(radius, {
    target: {value: 25},
  });
  fireEvent.click(await waitFor(() => screen.getByText('Location')));
});

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('Log In', async () => {
  render(
    <MemoryRouter>
      <SharedContext>
        <Home />
      </SharedContext>
    </MemoryRouter>);
  fireEvent.click(await waitFor(() => screen.getByText('Log In')));
  expect(mockHistoryPush).toHaveBeenCalledWith('/login');
});

test('Log Out', async () => {
  server.use(
    rest.get('/v0/auth/session', (req, res, ctx) => {
      return res(ctx.status(200),
        ctx.json({'email': 'a@a.com',
          'firstName': 'test',
          'lastName': 'a',
          'phoneNumber': '3334445555'}));
    }),
  );
  render(
    <MemoryRouter>
      <SharedContext>
        <Home />
      </SharedContext>
    </MemoryRouter>);
  fireEvent.click(await waitFor(() => screen.getByText('Log Out')));
});

test('Open Personal Listings', async () => {
  render(
    <MemoryRouter>
      <SharedContext>
        <Home />
      </SharedContext>
    </MemoryRouter>);
  fireEvent.click(await waitFor(() => screen.getByTestId('personal')));
}, 20000);

test('Close Personal Listings', async () => {
  render(
    <MemoryRouter>
      <SharedContext>
        <Home />
      </SharedContext>
    </MemoryRouter>);
  fireEvent.click(await waitFor(() => screen.getByTestId('personal')));
  fireEvent.click(await waitFor(() => screen.getByTestId('personal')));
}, 20000);

test('Sell Listing Page', async () => {
  render(
    <MemoryRouter>
      <SharedContext>
        <Home />
      </SharedContext>
    </MemoryRouter>);
  fireEvent.click(await waitFor(() => screen.getByTestId('sell')));
  expect(mockHistoryPush).toHaveBeenCalledWith('/post');
}, 20000);
