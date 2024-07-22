import * as React from 'react';
// import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Listing from './Listing';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import PianoIcon from '@mui/icons-material/Piano';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MemoryIcon from '@mui/icons-material/Memory';
import {titleContext} from './titleContext';
// import TextField from '@mui/material/TextField';

// Inspired by:
// Appbar: https://codesandbox.io/s/fzlui?file=/demo.js
// Breadcrumbs: https://codesandbox.io/s/euiq0?file=/demo.js
// Chips: https://codesandbox.io/s/6eji5?file=/demo.js
// Drawers: https://codesandbox.io/s/ttn20?file=/demo.js
// Icons: https://mui.com/components/material-icons/
// Select: https://codesandbox.io/s/oq6nl?file=/demo.js
// Textfield: https://codesandbox.io/s/njk0b?file=/demo.js

// const Search = styled('div')(({theme}) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({theme}) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({theme}) => ({
//   'color': 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// fetch calls for backend
// use context to connect, filters/components wrapped in same context

/**
 * a search bar on the home page
 *
 * @return {object} JSX
 */
export default function PrimarySearchAppBar() {
  // Used for the titleContext for text is typed into the search bar
  // Which is used in a Provider for Listing.js
  const [currentSearch, changeSearch] = React.useState('');
  // This changes the title when a user types into the search bar
  const handleSearch = (event) => {
    changeSearch(event.target.value);
  };

  const {currentUser, logout} = useAuth();
  // current user is true, then they are logged in
  const history = useHistory();
  const handleLogin = () => {
    history.push('/login');
  };

  const gotoPost = () => {
    history.push('/post');
  };

  const handleLogout = () => {
    logout();
    // window.location.reload(false); // CAN ADD IF NEEDED
  };

  // Category Pop-up
  const [category, setCategory] = React.useState({});
  const toggleCategory = (anchor, open) => (event) => {
    setCategory({[anchor]: open});
  };

  // Filter Pop-up
  const [filter, setFilter] = React.useState({});
  const toggleFilter = (anchor, open) => (event) => {
    setFilter({[anchor]: open});
  };

  // Category Handlers
  const [categorySelected, setCategorySelected] = React.useState('');
  const selectInstruments = () => {
    setCategorySelected('instruments');
  };
  const selectTechnology = () => {
    setCategorySelected('technology');
  };
  const selectVehicles = () => {
    setCategorySelected('vehicles');
  };
  const [subVehicleSelected, setSubVehicleSelected] = React.useState('');
  const selectMotorcycles = () => {
    setSubVehicleSelected('motorcycles');
  };
  const selectSedans = () => {
    setSubVehicleSelected('sedans');
  };
  const selectTrucks = () => {
    setSubVehicleSelected('trucks');
  };
  const deselectSubVehicles = () => {
    setSubVehicleSelected('');
    resetFilters();
  };
  const deselectAll = () => {
    setCategorySelected('');
    setSubVehicleSelected('');
    resetFilters();
  };

  // Filter Handlers
  const [sort, setSort] = React.useState('');
  const sortChange = (event) => {
    setSort(event.target.value);
  };
  const [sortCategory, setSortCategory] = React.useState('');
  const sortCategoryFilter = (event) => {
    setSortCategory(event.target.value);
  };
  const [sortSubCategory, setSortSubCategory] = React.useState('');
  const sortSubCategoryFilter = (event) => {
    setSortSubCategory(event.target.value);
  };
  const resetFilters = () => {
    setSortSubCategory('');
    setSortCategory('');
    setSort('');
  };

  // Location Handling
  const [location, setLocation] = React.useState(false);
  const [radius, setRadius] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0.0);
  const [latitude, setLatitude] = React.useState(0.0);
  const getLocation = () => {
    if (location) {
      setLocation(false);
      setRadius(0);
      setLongitude(0.0);
      setLatitude(0.0);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
          setLocation(true);
        });
      } else {
        setLocation(false);
        setRadius(0);
        setLongitude(0.0);
        setLatitude(0.0);
      }
    }
  };
  const handleRadius = (event) => {
    setRadius(event.target.value);
  };

  const getUserName = () => {
    while (currentUser) {
      return currentUser.firstName;
    }
  };

  const [personalListing, setPersonalListing] = React.useState(false);
  const getPersonalListings = () => {
    if (personalListing) {
      setPersonalListing(false);
    } else {
      setPersonalListing(true);
    }
  };

  const categoryList = (anchor) => (
    <Box
      sx={{height: '100vh'}}
      role="presentation"
      // onClick={toggleCategory(anchor, false)}
      // onKeyDown={toggleCategory(anchor, false)}
    >
      <Box
        sx={{
          padding: '15px',
          fontFamily: 'arial',
          fontWeight: 'bold',
          position: 'relative',
        }}
      >
        <div style={{textAlign: 'center', margin: 'auto'}}
          id="catsel"
          aria-label="catsel">
          Select Category
        </div>
        <IconButton
          onClick={toggleCategory(anchor, false)}
          id="showmore"
          aria-label="showmore"
          // aria-controls={mobileMenuId}
          aria-haspopup="true"
          // onClick={handleMobileMenuOpen}
          color="inherit"
          sx={{position: 'absolute', top: '2px', right: '5px'}}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem sx={{display: categorySelected ? 'none' : 'flex'}}>
          <Chip
            label="Instruments"
            component="a"
            clickable
            aria-label="inst-category"
            id="inst-category"
            icon={<PianoIcon/>}
            data-testid="instrument-category"
            onClick={function(event) {
              selectInstruments(event);
              toggleCategory(anchor, false)(event);
            }}
          />
        </ListItem>
        <ListItem sx={{display: categorySelected ? 'none' : 'flex'}}>
          <Chip
            label="Technology"
            component="a"
            clickable
            aria-label="tech-category"
            id="tech-category"
            icon={<MemoryIcon/>}
            data-testid="technology-category"
            onClick={function(event) {
              selectTechnology(event);
              toggleCategory(anchor, false)(event);
            }}
          />
        </ListItem>
        <ListItem sx={{display: categorySelected ? 'none' : 'flex'}}>
          <Chip
            label="Vehicles"
            component="a"
            clickable
            data-testid="vehicle-category"
            aria-label="vehicle-category"
            id="vehicle-category"
            icon={<DirectionsCarIcon/>}
            onClick={function(event) {
              selectVehicles(event);
              toggleCategory(anchor, false)(event);
            }}
            // onClick={toggleCategory(anchor, false)}
          />
        </ListItem>
      </List>
    </Box>
  );

  const filterList = (anchor) => (
    <Box
      sx={{height: '100vh'}}
      role="presentation"
    >
      <Box
        sx={{
          padding: '15px',
          fontFamily: 'arial',
          fontWeight: 'bold',
          position: 'relative',
        }}
      >
        <div style={{textAlign: 'center', margin: 'auto'}}>
          Filters
        </div>
        <IconButton
          onClick={toggleFilter(anchor, false)}
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
          sx={{position: 'absolute', top: '2px', right: '5px'}}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <form>
            <label>Sort By Price: </label>
            <select
              value={sort}
              onChange={sortChange}
              data-testid="price-sort">
              <option value=""></option>
              <option value="PA">Increasing</option>
              <option value="PD">Decreasing</option>
            </select>
          </form>
          {/* <Select
              value={sort}
              onChange={sortChange}
              data-testid="price-sort"
            >
              <option value=""></option>
              <option value="PA">Price Increasing</option>
              <option value="PD">Price Decreasing</option>
              {/* <MenuItem value={'PA'}>Price Increasing</MenuItem>
              <MenuItem data-testid="pd"
                value={'PD'}>Price Decreasing</MenuItem>
            </Select> */}
        </ListItem>
        <ListItem sx={{display:
          categorySelected === 'instruments' ? 'flex' : 'none'}}>
          <form>
            <label>Instrument Type: </label>
            <select
              value={sortCategory}
              onChange={sortCategoryFilter}
              data-testid="instrument-sort">
              <option value=""></option>
              <option value="brass">Brass</option>
              <option value="string">String</option>
            </select>
          </form>
          {/* <Select
              data-testid="instrument-sort"
              value={sortCategory}
              onChange={sortCategoryFilter}
              native={true}
            >
              <option value=""></option>
              <option value="brass">Brass</option>
              <option value="string">String</option>
              {/* <MenuItem value={'string'}>String</MenuItem>
              <MenuItem data-testid="brass-filter"
                value={'brass'}>Brass</MenuItem>
            </Select> */}
        </ListItem>
        <ListItem sx={{display:
          categorySelected === 'technology' ? 'flex' : 'none'}}>
          <form>
            <label>Technology Brand: </label>
            <select
              value={sortCategory}
              onChange={sortCategoryFilter}
              data-testid="technology-sort">
              <option value=""></option>
              <option value="apple">Apple</option>
              <option value="microsoft">Microsoft</option>
            </select>
          </form>
          {/* <Select
            data-testid="technology-sort"
            value={sortCategory}
            onChange={sortCategoryFilter}
          >
            <MenuItem value={'apple'}>Apple</MenuItem>
            <MenuItem value={'microsoft'}>Microsoft</MenuItem>
          </Select> */}
        </ListItem>
        <ListItem sx={{display:
          categorySelected === 'vehicles' ? 'flex' : 'none'}}>
          <form>
            <label>Vehicle Condition: </label>
            <select
              value={sortCategory}
              onChange={sortCategoryFilter}
              data-testid="vehicle-sort">
              <option value=""></option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </form>
          {/* <Select
              data-testid="vehicle-sort"
              value={sortCategory}
              onChange={sortCategoryFilter}
            >
              <MenuItem value={'new'}>New</MenuItem>
              <MenuItem value={'used'}>Used</MenuItem>
            </Select> */}
        </ListItem>
        <ListItem sx={{display:
          subVehicleSelected === 'motorcycles' ? 'flex' : 'none'}}>
          <form>
            <label>Motorcycle Brand: </label>
            <select
              value={sortSubCategory}
              onChange={sortSubCategoryFilter}
              data-testid="motorcycle-sort">
              <option value=""></option>
              <option value="ducati">Ducati</option>
              <option value="harley-davidson">Harley-Davidson</option>
            </select>
          </form>
          {/* <Select
              data-testid="motorcycle-sort"
              value={sortSubCategory}
              onChange={sortSubCategoryFilter}
            >
              <MenuItem value={'ducati'}>Ducati</MenuItem>
              <MenuItem value={'harley-davidson'}>Harley-Davidson</MenuItem>
            </Select> */}
        </ListItem>
        <ListItem sx={{display:
          subVehicleSelected === 'sedans' ? 'flex' : 'none'}}>
          <form>
            <label>Sedan Brand: </label>
            <select
              value={sortSubCategory}
              onChange={sortSubCategoryFilter}
              data-testid="sedan-sort">
              <option value=""></option>
              <option value="honda">Honda</option>
              <option value="mazda">Mazda</option>
            </select>
          </form>
          {/* <Select
              data-testid="sedan-sort"
              value={sortSubCategory}
              onChange={sortSubCategoryFilter}
            >
              <MenuItem value={'honda'}>Honda</MenuItem>
              <MenuItem value={'mazda'}>Mazda</MenuItem>
            </Select> */}
        </ListItem>
        <ListItem sx={{display:
          subVehicleSelected === 'trucks' ? 'flex' : 'none'}}>
          <form>
            <label>Truck Brand: </label>
            <select
              value={sortSubCategory}
              onChange={sortSubCategoryFilter}
              data-testid="truck-sort">
              <option value=""></option>
              <option value="chevrolet">Chevrolet</option>
              <option value="ford">Ford</option>
            </select>
          </form>
          {/* <Select
              data-testid="truck-sort"
              value={sortSubCategory}
              onChange={sortSubCategoryFilter}
            >
              <MenuItem value={'chevrolet'}>Chevrolet</MenuItem>
              <MenuItem value={'ford'}>Ford</MenuItem>
            </Select> */}
        </ListItem>
      </List>
      <Button
        variant="contained"
        sx={{textTransform: 'none', marginLeft: 'auto',
          marginRight: 'auto', display: 'block'}}
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </Box>
  );

  return (
    <Box>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={category[anchor]}
            onClose={toggleCategory(anchor, false)}
          >
            {categoryList(anchor)}
          </Drawer>
          {['bottom'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Drawer
                anchor={anchor}
                open={filter[anchor]}
                onClose={toggleFilter(anchor, false)}
              >
                {filterList(anchor)}
              </Drawer>
              <AppBar position="static" sx={{bgcolor: 'white'}}>
                <Toolbar>
                  <Typography
                    fontWeight="bold"
                    color="#5393ff"
                    variant="h6"
                    noWrap
                    component="div"
                    id="navbook"
                  >
                    NAV Book
                  </Typography>
                  <Box sx={{flexGrow: 1}}/>
                  <div>
                    {currentUser ? (
                      <Box sx={{display: 'flex'}}>
                        <Typography
                          fontWeight="bold"
                          color="#505050"
                          variant="h6"
                          noWrap
                          component="div"
                          sx={{paddingRight: '10px', display: 'flex',
                            fontSize: '15px', alignItems: 'center'}}
                        >
                          Hello {getUserName()},
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{textTransform: 'none'}}
                          onClick={handleLogout}
                        >
                          Log Out
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={{display: 'flex'}}>
                        <Button
                          variant="contained"
                          sx={{textTransform: 'none'}}
                          onClick={handleLogin}
                        >
                          Log In
                        </Button>
                      </Box>
                    )}
                  </div>
                  {/* <Box sx={{display: currentUser ? 'none' : 'flex'}}>
                    <Button
                      variant="contained"
                      sx={{textTransform: 'none'}}
                      onClick={handleLogin}
                    >
                      Log In
                    </Button>
                  </Box> */}
                  {/* <Box sx={{display: currentUser ? 'flex' : 'none'}}>
                    <Typography
                      fontWeight="bold"
                      color="#505050"
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{paddingRight: '10px', display: 'flex',
                        fontSize: '15px', alignItems: 'center'}}
                    >
                      Hello {getUserName()},
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{textTransform: 'none'}}
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </Box> */}
                </Toolbar>
              </AppBar>
              <Box sx={{display: categorySelected ? 'flex' : 'none',
                marginTop: '10px', marginLeft: '10px'}}>
                <Breadcrumbs
                  separator="›"
                  aria-label="breadcrumb"
                  sx={{fontSize: '10'}}
                >
                  <Link
                    underline="hover"
                    key="1"
                    color="inherit"
                    href="/"
                    onClick={deselectAll}
                    data-testid="marketplace"
                  >
                    Marketplace
                  </Link>
                  <Link
                    underline="hover"
                    key="2"
                    color="inherit"
                  >
                    <Box sx={{display:
                      categorySelected === 'instruments' ? 'flex' : 'none'}}>
                      Instruments
                    </Box>
                    <Box sx={{display:
                      categorySelected === 'technology' ? 'flex' : 'none'}}>
                      Technology
                    </Box>
                    <Box sx={{display:
                      categorySelected === 'vehicles' ? 'flex' : 'none'}}
                    data-testid="return-vehicle"
                    id="return-vehicle"
                    aria-label="return-vehicle"
                    onClick={function(event) {
                      selectVehicles(event);
                      deselectSubVehicles(event);
                    }}>
                      Vehicles
                    </Box>
                  </Link>
                  <Link
                    underline="hover"
                    key="3"
                    color="inherit"
                    sx={{display: subVehicleSelected ? 'flex' : 'none'}}
                  >
                    <Box sx={{display:
                      subVehicleSelected === 'motorcycles' ? 'flex' : 'none'}}>
                      Motorcycles
                    </Box>
                    <Box sx={{display:
                      subVehicleSelected === 'sedans' ? 'flex' : 'none'}}>
                      Sedans
                    </Box>
                    <Box sx={{display:
                      subVehicleSelected === 'trucks' ? 'flex' : 'none'}}>
                      Trucks
                    </Box>
                  </Link>
                </Breadcrumbs>
              </Box>
              <Box sx={{padding: '10px',
                display: categorySelected ? 'none' : 'flex'}}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label=""
                    component="a"
                    data-testid="personal"
                    clickable
                    icon={<PersonIcon/>}
                    onClick={getPersonalListings}
                    sx={{display: currentUser ? 'flex' : 'none'}}
                  />
                  <Chip
                    label="Sell"
                    component="a"
                    data-testid="sell"
                    clickable
                    onClick={gotoPost}
                    sx={{display: currentUser ? 'flex' : 'none'}}
                  />
                  <Chip
                    label="All Categories"
                    component="a"
                    // href="#basic-chip"
                    clickable
                    data-testid="all-categories"
                    aria-label='all-categories'
                    id='all-categories'
                    onClick={toggleCategory(anchor, true)}
                  />
                </Stack>
              </Box>
              <Box sx={{padding: '10px', display: categorySelected ===
                'vehicles' && !subVehicleSelected ? 'flex' : 'none'}}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="Motorcycles"
                    data-testid="motorcycle-sub-category"
                    component="a"
                    clickable
                    icon={<TwoWheelerIcon/>}
                    onClick={selectMotorcycles}
                  />
                  <Chip
                    label="Sedans"
                    data-testid="sedan-sub-category"
                    component="a"
                    clickable
                    icon={<DirectionsCarIcon/>}
                    onClick={selectSedans}
                  />
                  <Chip
                    label="Trucks"
                    data-testid="truck-sub-category"
                    component="a"
                    clickable
                    aria-label="trucksubcategory"
                    id="trucksubcategory"
                    icon={<LocalShippingIcon/>}
                    onClick={selectTrucks}
                  />
                </Stack>
              </Box>
              <div
                style={{
                  backgroundColor: '#EAEAEA',
                  borderRadius: '20px',
                  marginBottom: '10px',
                  paddingBottom: '10px',
                  width: '95vw',
                  left: '10px', // should become -15px for desktop
                  display: 'inline-block',
                }}
              >
                <div style={{display: 'inline-block', paddingLeft: '5px',
                  paddingTop: '5px'}}>
                  <SearchIcon />
                </div>
                <input
                  placeholder="Search Marketplace"
                  autoComplete='true'
                  value={currentSearch}
                  data-testid="search"
                  style={{display: 'flex', marginTop: '-25px',
                    width: '80vw', marginLeft: '30px',
                    backgroundColor: '#EAEAEA', border: '0'}}
                  onChange={handleSearch}
                />
              </div>
              <Divider/>
              <Box sx={{padding: '10px'}}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant='contained'
                    data-testid="location"
                    sx={{
                      background: '#A0D0FF',
                      color: '#2080FF',
                      fontWeight: 'bold',
                      textTransform: 'none',
                    }}
                    onClick={getLocation}
                  >
                    <LocationOnOutlinedIcon/>
                    Location
                  </Button>
                  <form style={{
                    display: location ? 'inline-block' :
                      'none', width: '110px'}}>
                    <label>Radius in Miles:</label>
                    <input
                      type='text'
                      id="outlined-basic"
                      label="Radius in Miles"
                      value={radius}
                      data-testid="radius"
                      onChange={handleRadius}
                      style={{width: '90px'}}/>
                  </form>
                  {/* <TextField
                    id="outlined-basic"
                    label="Radius in Miles"
                    variant="outlined"
                    value={radius}
                    data-testid="radius"
                    sx={{display: location ? 'flex' : 'none', width: '140px'}}
                    onChange={handleRadius}/> */}
                  <Button
                    variant='contained'
                    data-testid="filters"
                    sx={{
                      background: '#A0D0FF',
                      color: '#2080FF',
                      fontWeight: 'bold',
                      textTransform: 'none',
                    }}
                    onClick={toggleFilter(anchor, true)}
                  >
                    <TuneIcon/>
                    Filters
                  </Button>
                </Stack>
              </Box>
              <titleContext.Provider value={[categorySelected,
                subVehicleSelected, currentSearch, sort, sortCategory,
                sortSubCategory, radius, latitude,
                longitude, personalListing]}>
                <Listing />
              </titleContext.Provider>
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
}
