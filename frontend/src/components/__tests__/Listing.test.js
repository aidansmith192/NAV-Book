import {render, fireEvent} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
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
    return res(ctx.json([{
      'title': '2016 Mazda 6i Sport Sedan 4D',
      'description': 'The 2016 Mazda6 is a .',
      'price': 18998,
      'category': 'vehicles',
      'subcategory': 'sedans',
      'ts': '2021-12-05T05:31:43.158Z',
      'longitude': -119.018715,
      'latitude': 35.373291,
      'images': [
        'https://static.cargurus.com/images/forsale/2021/11/12/00/36/2016_mazda_mazda6-pic-1463408096809861067-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/12/00/36/2016_mazda_mazda6-pic-6728967871357021994-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/12/00/36/2016_mazda_mazda6-pic-2321576291294866234-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/12/00/36/2016_mazda_mazda6-pic-328002695999406149-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/12/00/36/2016_mazda_mazda6-pic-3667805303528256884-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/12/00/36/2016_mazda_mazda6-pic-2913531182124470524-1024x768.jpeg',
      ],
    },
    {
      'title': '2018 Honda Accord 1.5T LX FWD',
      'description': 'ALG Residual !',
      'price': 21890,
      'category': 'vehicles',
      'subcategory': 'sedans',
      'ts': '2021-12-05T05:31:43.161Z',
      'longitude': -122.474633,
      'latitude': 37.686503,
      'images': [
        'https://static.cargurus.com/images/forsale/2021/11/11/16/20/2018_honda_accord-pic-6185063032861258750-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/11/16/20/2018_honda_accord-pic-2109287041351129518-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/11/16/20/2018_honda_accord-pic-1217146177103358016-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/11/16/20/2018_honda_accord-pic-2723785320852790227-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/11/16/20/2018_honda_accord-pic-2428491572391247646-1024x768.jpeg',
      ],
    },
    {
      'title': '2014 Ducati Superbike 899',
      'description': 'Yolo right??.',
      'price': 12499,
      'category': 'vehicles',
      'subcategory': 'motorcycles',
      'ts': '2021-12-05T05:31:43.163Z',
      'longitude': -122.306981,
      'latitude': 37.54959,
      'images': [
        'https://1.cdn.autotraderspecialty.com/2014-Ducati-Superbike%20899-motorcycle--Motorcycle-201180085-e6a65ac512a162ee5516e516f4e31f3a.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
        'https://1.cdn.autotraderspecialty.com/2014-Ducati-Superbike%20899-motorcycle--Motorcycle-201180085-289d2ea75ac618810dc280362a16c49f.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
        'https://0.cdn.autotraderspecialty.com/2014-Ducati-Superbike%20899-motorcycle--Motorcycle-201180085-3228b219b792fc1286104473df3fb461.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
        'https://1.cdn.autotraderspecialty.com/2014-Ducati-Superbike%20899-motorcycle--Motorcycle-201180085-00a3e803a0291704e98108962baeaa12.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
        'https://1.cdn.autotraderspecialty.com/2014-Ducati-Superbike%20899-motorcycle--Motorcycle-201180085-c268d7116e0f2eeae60402f4a56db30a.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
      ],
    },
    {
      'title': '1994 Harley-Davidson Softail Springer',
      'description': '80"/1340cc V2 !',
      'price': 11995,
      'category': 'vehicles',
      'subcategory': 'motorcycles',
      'ts': '2021-12-05T05:31:43.165Z',
      'longitude': -121.981142,
      'latitude': 36.970238,
      'images': [
        'https://0.cdn.autotraderspecialty.com/1994-Harley-Davidson-Softail-motorcycle--Motorcycle-200437126-0ea945c9acab692b31a506a993cd8b19.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
        'https://1.cdn.autotraderspecialty.com/1994-Harley-Davidson-Softail-motorcycle--Motorcycle-200437126-53e33f64a136d056a4559647237916a0.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
        'https://1.cdn.autotraderspecialty.com/1994-Harley-Davidson-Softail-motorcycle--Motorcycle-200437126-6597bb92bfc931136c1025914fe45c5c.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
        'https://1.cdn.autotraderspecialty.com/1994-Harley-Davidson-Softail-motorcycle--Motorcycle-200437126-504accc12b60f94ecf7d47d73e7ac79a.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
        'https://0.cdn.autotraderspecialty.com/1994-Harley-Davidson-Softail-motorcycle--Motorcycle-200437126-51cab7bde2cbce1bf1230c4418692740.jpg?r=pad&w=735&h=551&c=%23f5f5f5',
      ],
    },
    {
      'title': '2019 Ford Ranger Lariat SuperCrew 4WD',
      'description': 'Navigation,FX4 Differential',
      'price': 39199,
      'category': 'vehicles',
      'subcategory': 'trucks',
      'ts': '2021-12-05T05:31:43.168Z',
      'longitude': -122.260169,
      'latitude': 37.816429,
      'images': [
        'https://static.cargurus.com/images/forsale/2021/11/20/20/29/2019_ford_ranger-pic-1345941863355816171-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/20/20/29/2019_ford_ranger-pic-479625333239432959-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/20/20/29/2019_ford_ranger-pic-5832322452800606276-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/20/20/29/2019_ford_ranger-pic-5168560651055521652-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/20/20/29/2019_ford_ranger-pic-2586080391458033062-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/20/20/29/2019_ford_ranger-pic-1148083459824180504-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/20/20/29/2019_ford_ranger-pic-8969059673317574271-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/11/20/20/29/2019_ford_ranger-pic-2843773728210363783-1024x768.jpeg',
      ],
    },
    {
      'title': '2020 Chevrolet Silverado 1500',
      'description': 'New Price! Satin !',
      'price': 59000,
      'category': 'vehicles',
      'subcategory': 'trucks',
      'ts': '2021-12-05T05:31:43.171Z',
      'longitude': -121.745232,
      'latitude': 36.919019,
      'images': [
        'https://static.cargurus.com/images/forsale/2021/10/29/03/43/2020_chevrolet_silverado_1500-pic-5119785631922264793-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/10/29/03/43/2020_chevrolet_silverado_1500-pic-5433039465815156483-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/10/29/03/43/2020_chevrolet_silverado_1500-pic-8293186924940463028-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/10/29/03/43/2020_chevrolet_silverado_1500-pic-3432330738394893545-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/10/29/03/43/2020_chevrolet_silverado_1500-pic-7668200621631375633-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/10/29/03/43/2020_chevrolet_silverado_1500-pic-7808927228532832554-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/10/29/03/43/2020_chevrolet_silverado_1500-pic-5784474368514427591-1024x768.jpeg',
        'https://static.cargurus.com/images/forsale/2021/10/29/03/43/2020_chevrolet_silverado_1500-pic-8572872203044785918-1024x768.jpeg',
      ],
    },
    {
      'title': 'Gretsch G5420T Hollow Body Electric Guitar',
      'description': 'Up for sale.',
      'price': 650,
      'category': 'instruments',
      'subcategory': 'String',
      'ts': '2021-12-05T05:31:43.174Z',
      'longitude': -121.876434,
      'latitude': 37.296816,
      'images': [
        'https://images.craigslist.org/00c0c_aZtUjW71D4mz_0t20CI_600x450.jpg',
        'https://images.craigslist.org/00K0K_jAaXoOMwbiDz_0t20CI_600x450.jpg',
        'https://images.craigslist.org/00n0n_jRkpi1MzKHAz_0t20CI_600x450.jpg',
        'https://images.craigslist.org/00E0E_l9q3hE1oV83z_0t20CI_600x450.jpg',
        'https://images.craigslist.org/00101_kAfhpdZSIKFz_0t20CI_600x450.jpg',
        'https://images.craigslist.org/00g0g_5TfadZ4JW4iz_0t20CI_600x450.jpg',
        'https://images.craigslist.org/00l0l_5ZDv4YBNNPaz_0CI0t2_600x450.jpg',
      ],
    },
    {
      'title': 'Etude ETR-100 Trumpet Lacquer',
      'description': 'The Etude ETR-100 .',
      'price': 114,
      'category': 'instruments',
      'subcategory': 'Brass',
      'ts': '2021-12-05T05:31:43.178Z',
      'longitude': -122.349973,
      'latitude': 37.933592,
      'images': [
        'https://images.craigslist.org/00E0E_4BRNDuFbdgUz_0CI0t2_600x450.jpg',
        'https://images.craigslist.org/00606_adwHL7dCxZgz_0CI0t2_600x450.jpg',
        'https://images.craigslist.org/00q0q_as8BC7zNSqoz_0CI0t2_600x450.jpg',
        'https://images.craigslist.org/00202_i5LE4zQyepwz_0t20CI_600x450.jpg',
        'https://images.craigslist.org/00P0P_ge9aApp663fz_0t20CI_600x450.jpg',
      ],
    },
    {
      'title': 'Like NEW iPhone 12 Pro Max',
      'description': 'Like New iPhone 12 .',
      'price': 999,
      'category': 'technology',
      'subcategory': 'Apple',
      'ts': '2021-12-05T05:31:43.179Z',
      'longitude': -121.993475,
      'latitude': 36.990305,
      'images': [
        'https://images.craigslist.org/01111_in3AtesJUbrz_0jm0pO_600x450.jpg',
      ],
    },
    {
      'title': 'Microsoft Surface Duo - 128GB',
      'description': 'Surface Duo combines .',
      'price': 399,
      'category': 'technology',
      'subcategory': 'microsoft',
      'ts': '2021-12-05T05:31:43.181Z',
      'longitude': -121.900676,
      'latitude': 37.440201,
      'images': [
        'https://i.ebayimg.com/images/g/ABsAAOSwtaBhp~84/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/GxIAAOSwALVhp~82/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/AwoAAOSwSo5hp~83/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/~AwAAOSw~3dhp~86/s-l1600.jpg',
      ],
    }]));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeEach(() => {
});

afterEach(() => {
  server.resetHandlers();
});

const doRender= () => {
  const categorySelected = 'Vehicles';
  render(
    <titleContext.Provider
      value={[categorySelected]}
    >
      <Listing />
    </titleContext.Provider>,
  );
};

const doRender2= () => {
  const categorySelected = '';
  const subVehicleSelected = '';
  const currentSearch = '';
  const sort = '';
  const sortCategory = '';
  const sortSubCategory = '';
  const radius = '';
  const latitude = '';
  const longitude = '';
  const personalListing = true;
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

const doRenderSort= () => {
  const categorySelected = '';
  const subVehicleSelected = '';
  const currentSearch = '';
  const sort = 'PA';
  const sortCategory = '';
  const sortSubCategory = '';
  const radius = '';
  const latitude = '';
  const longitude = '';
  const personalListing = true;
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

const doRenderSort2= () => {
  const categorySelected = '';
  const subVehicleSelected = '';
  const currentSearch = '';
  const sort = 'PD';
  const sortCategory = '';
  const sortSubCategory = '';
  const radius = '';
  const latitude = '';
  const longitude = '';
  const personalListing = true;
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

const doRenderIdFalse= () => {
  const categorySelected = 'Vehicles';
  const subVehicleSelected = '';
  const currentSearch = '';
  const sort = '';
  const sortCategory = '';
  const sortSubCategory = '';
  const radius = '';
  const latitude = '';
  const longitude = '';
  const personalListing = false;
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

const doRenderEmpty= () => {
  const categorySelected = '';
  const subVehicleSelected = '';
  const currentSearch = '';
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
  doRender();
  await waitFor(() => screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));
  // doRender();
  // await waitFor(() => screen.getByText("All Categories"));
});

test('Listings exists, certain listing \'Mazda\' exists2', async () => {
  doRender2();
  await waitFor(() => screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));
  // doRender();
  // await waitFor(() => screen.getByText("All Categories"));
});

test('Listings exists with sort specified with \'PA\'', async () => {
  doRenderSort();
  await waitFor(() => screen.getByTestId('Microsoft Surface Duo - 128GB'));
  // doRender();
  // await waitFor(() => screen.getByText("All Categories"));
});

test('Listings exists with sort specified with \'PD\'', async () => {
  doRenderSort2();
  await waitFor(() => screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));
  // doRender();
  // await waitFor(() => screen.getByText("All Categories"));
});

test('Listings exists with id selected as false', async () => {
  doRenderIdFalse();
  await waitFor(() => screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));
  // doRender();
  // await waitFor(() => screen.getByText("All Categories"));
});

test('Listings click on a Listing', async () => {
  doRenderSort2();
  await waitFor(() => screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));
  doRenderEmpty();
  await waitFor(() => screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));

  fireEvent.click(screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));
});

test('Listings click on a Listing and close it', async () => {
  doRenderSort2();
  await waitFor(() => screen.getByTestId('2014 Ducati Superbike 899'));
  doRenderEmpty();
  await waitFor(() => screen.getByTestId('2014 Ducati Superbike 899'));

  fireEvent.click(screen.getByTestId('2014 Ducati Superbike 899'));
  fireEvent.click(screen.getByTestId('close desktop reader'));
});
/* eslint max-len: ["error", { "code": 200 }]*/
test('Listings click on Listing click on image, then close the lisiting', async () => {
  doRenderSort2();
  await waitFor(() => screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));
  doRenderEmpty();
  await waitFor(() => screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));

  fireEvent.click(screen.getByTestId('2016 Mazda 6i Sport Sedan 4D'));
  fireEvent.click(screen.getByLabelText('Go to next page'));
  fireEvent.click(screen.getByTestId('close desktop reader'));
});
