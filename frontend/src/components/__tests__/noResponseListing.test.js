import {render} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {titleContext} from '../titleContext';
import Listing from '../Listing';

const URL = '/v0/category';

//  const server = setupServer(
//    rest.get(URL, (req, res, ctx) => {
//      return res(ctx.json([{ name: "Vehicles"}]));
//    })
//  );

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.json({message: 'Hello CSE183'}));
  }),
  rest.get('/v0/auth/session', (req, res, ctx) => {
    return res(ctx.status(401));
  }),
  rest.get('/v0/listings', (req, res, ctx) => {
    return res(ctx.status(404, 'fuck'));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

//  const select = (category) => {
//    selected = category;
//  };

//  const setShowCategories = (show) => {
//    showCategories = show;
//  };

beforeEach(() => {
});

afterEach(() => {
  server.resetHandlers();
});

const doRenderEmpty= () => {
  const categorySelected = '';
  const subVehicleSelected = '';
  const currentSearch = 'kjasdfkjgsdbmdsf';
  const sort = '';
  const sortCategory = '';
  const sortSubCategory = '';
  const radius = '';
  const latitude = '';
  const longitude = '';
  const personalListing = '';
  render(
    <titleContext.Provider
      value={[categorySelected,
        subVehicleSelected, currentSearch, sort, sortCategory,
        sortSubCategory, radius, latitude,
        longitude, personalListing]}
    >
      <Listing />
    </titleContext.Provider>,
  );
};

test('Listings exists, certain listing \'Mazda\' exists', async () => {
  doRenderEmpty();
  // await waitFor(() => screen.getByTestId("2016 Mazda 6i Sport Sedan 4D"));
  // doRender();
  // await waitFor(() => screen.getByText("All Categories"));
});
