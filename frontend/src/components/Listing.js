import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
// import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import CloseIcon from '@material-ui/icons/Close';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import {titleContext} from './titleContext';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  smaller: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      /* eslint quote-props: ["error", "as-needed"]*/
      // display: 'flex',
      // flexWrap: 'wrap',
      backgroundColor: 'White',
      // display: 'aboslute',
      // height: '100px',
      // top: 400,
      position: 'absolute',
      left: 0,
      bottom: -20,
      width: window.innerWidth,
      height: window.innerHeight,
      zIndex: 10000000,
    },
    position: 'absolute',
    display: 'flex',
    width: window.innerWidth,
    height: window.innerHeight,
    left: 0,
    bottom: 0,
    zIndex: 10000000,
  },
  photo: {
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    height: '400px',
    width: '90vw',
  },
  menuButton: {
    position: 'absolute',
    right: theme.spacing(1),
    // backgroundColor: blue,
    // backgroundSize: '20px',
    // borderRadius: 24,
    // background: fill,
    // border: 'solid black',
    // border: 'solid blue',
    // borderColor: 'blue',
    // top: theme.spacing(1),
  },
  divv: {
    backgroundColor: 'Black',
  },
  paper: {
    /* eslint quote-props: ["error", "as-needed"]*/
    // display: 'flex',
    // flexWrap: 'wrap',
    backgroundColor: 'White',
    // display: 'aboslute',
    position: 'absolute',
    // height: '100px',
    top: 400,
    // width: window.innerWidth -300,
    height: '150%',
  },
  top: {
    zIndex: 1000000,
  },
}));

/**
 * @param {*} obj
 * @param {*} truth
 * @return {object}
 */
function objToQueryString(obj, truth) {
  // I found a neat way to parse a query object into a
  // queryString online which can be found here
  // https://stackoverflow.com/questions/
  //  437230555/get-with-query-string-with-fetch-in-react-native
  const keyValuePairs = [];
  for (const key in obj) {
    if (truth === false) {
      keyValuePairs.push(encodeURIComponent(key) + '=' +
      encodeURIComponent(obj[key]));
    }
  }
  return keyValuePairs.join('&');
}
/**
 * @param {*} setListing
 * @param {*} theContext
 * @param {*} theCategory
 * @param {*} theSubCategory
 * @param {*} theTitle
 * @param {*} theSort
 * @param {*} theSpecificAttribute
 * @param {*} theBrand
 * @param {*} theRadius
 * @param {*} theLatitude
 * @param {*} theLongitude
 * @param {*} theId
 */
function getListing(setListing, theContext, theCategory,
  theSubCategory, theTitle, theSort, theSpecificAttribute,
  theBrand, theRadius, theLatitude, theLongitude, theId) {
  let truthIf = false;
  let currentCategory = theCategory;
  if (currentCategory === '') {
    // console.log('currentCategory is UNDEFINED');
    currentCategory = 'undefined';
  }
  let currentSubCategory = theSubCategory;
  if (currentSubCategory === '') {
    // console.log('currentSubCategory is UNDEFINED');
    currentSubCategory = 'undefined';
  }
  let currentTitle = theTitle;
  if (currentTitle === '') {
    // console.log('currentTitle is UNDEFINED');
    currentTitle = 'undefined';
  }
  let currentSpecificAttribute = theSpecificAttribute;
  if (currentSpecificAttribute === '') {
    // console.log('currentSpecificAttribute is UNDEFINED');
    currentSpecificAttribute = 'undefined';
  }

  let currentBrand = theBrand;
  if (currentBrand === '') {
    // console.log('currentBrand is UNDEFINED');
    currentBrand = 'undefined';
  }
  let currentSort = theSort;
  if (currentSort === '') {
    // console.log('currentSort is UNDEFINED');
    currentSort = 'undefined';
  } else if (currentSort === 'PA') {
    currentSort = 'ASC';
  } else if (currentSort === 'PD') {
    currentSort = 'DESC';
  }
  // New features
  let currentRadius = theRadius;
  if (currentRadius === '') {
    // console.log('currentRadius is UNDEFINED');
    currentRadius = -1;
  }
  let currentLatitude = theLatitude;
  if (currentLatitude === '') {
    // console.log('currentLatitude is UNDEFINED');
    currentLatitude = 'undefined';
  }
  let currentLongitude = theLongitude;
  if (currentLongitude === '') {
    // console.log('currentLongitude is UNDEFINED');
    currentLongitude = 'undefined';
  }
  let currentId = theId;
  if (currentId === false) {
    // console.log('currentId is UNDEFINED');
    currentId = 'undefined';
    truthIf = true;
    objToQueryString(['yoylo'], true);
  }

  // console.log(currentCategory);
  // console.log(currentSubCategory);
  // console.log(currentTitle);
  // console.log(currentSpecificAttribute);
  // console.log(currentBrand);
  // console.log(currentSort);
  // New features
  // console.log(currentRadius);
  // console.log(currentLatitude);
  // console.log(currentLongitude);
  // console.log(currentId);
  const queryString = objToQueryString({
    // Need to used wrapped context from the search bar
    // and filters to set the category and subcategory
    category: currentCategory,
    subcategory: currentSubCategory,
    title: currentTitle,
    specificAttribute: currentSpecificAttribute,
    brand: currentBrand,
    sort: currentSort,
    // New features
    maxDistance: currentRadius,
    lat: currentLatitude,
    long: currentLongitude,
    byUser: currentId,
  }, false);
  // Checks if the title exists which is extracted from the search bar
  // in '/home.js' If it exists, we need to setListing() on all listings
  // that are LIKE %currentTitle%

  if (theContext != null) {
    const path = '/v0/listings/';
    path.concat('?');
    path.concat({queryString});
    // console.log(fetch(`${path}?${queryString}`));
    fetch(`${path}?${queryString}`)
      .then((response) => {
      // console.log(response.status);
        truthIf = true;
        return response.json();
      })
      .then((json) => {
      // console.log(json);
        truthIf = true;
        setListing(json);
      });
    // console.log('the truthIF: ' + truthIf);
    if (truthIf === false) {
      setListing([]);
    }
  } else {
    // fetch(`/v0/listing?${queryString}`)
    fetch(`/v0/listings`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // console.log(json);
        setListing(json);
      });
  }
  // !!!!!!!!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!!!!!!
  // Lines 124-131 are used to connect with the Listings backend
  // Works perfectly (Needded to connect home to backend)
  // Just need context of the choosen category and subcategory to work
  // !!!!!!!!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!!!!!!
}

/**
 * @return {object} JSX
 */
function Listing() {
  const theContext = React.useContext(titleContext);

  // currentTitle is the title that is requested from the
  // home.js search bar
  // truth is used to make sure comparison between if the title
  // has been changed only occurs once. So that the program doesn't
  // cause an infinite loop
  const [truth, setTruth] = React.useState();
  // console.log(category, subCategory, title, specificAttribute, brand, sort,
  //   radius, latitude, longitude, id);
  const classes = useStyles();
  const [listing, setListing] = React.useState();
  const [modalData, setData] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  // If the title changed, change the currentTitle in Listing.js
  // and run getListing() on the requested title. Which should generate
  // listing depending on the new title
  if (truth !== theContext && (theContext[0] !== '' || theContext[1] !== '' ||
   theContext[2] !== '' || theContext[3] !== '' || theContext[4] !== '' ||
    theContext[5] !== '' || theContext[6] !== '' || theContext[7] !== ''||
     theContext[8] !== '' || theContext[9] !== '' )) {
    setTruth(theContext);
    getListing(setListing, theContext, theContext[0],
      theContext[1], theContext[2], theContext[3],
      theContext[4], theContext[5], theContext[6],
      theContext[7], theContext[8], theContext[9]);
  }

  const handleChange = (event, value) => {
    setPage(value);
  };
  React.useEffect(() => {
    // console.log('useEffect()!');
    getListing(setListing);
  }, []);

  const handleOpen = (index) => {
    setOpen(true);
    // setData(data[index]);
    setData(index);
  };

  const handleClose = () => {
    setOpen(false);
    setPage(1);
    // console.log('CLOSE!');
    closeListing();
  };

  const [listingOpen, setListingOpen] = React.useState(false);
  const openListing = (event) => {
    setListingOpen(true);
  };
  const closeListing = (event) => {
    setListingOpen(false);
  };

  const customPaper = () => {
    // console.log('second!');
    // console.log(modalData.images);
    return (
      <div>
        {open ? (
          <Paper className={classes.smaller}
            open={open}
            onClose={handleClose}
            sx={{display: 'fixed', top: '0px', left: ' 0px'}}
          >
            <div className={classes.root}>
              <IconButton aria-label={'close desktop reader'}
                edge="start" className={classes.menuButton }
                color="primary" onClick={handleClose}
                data-testid={'close desktop reader'}>
                <CloseIcon />
              </IconButton>
              <Box m={2} pt={3}>
                <Stack spacing={2} className={classes.photo}>
                  <img justify='center' alignItems='center'
                    src={modalData.images[page - 1]}
                    alt={modalData.title}
                  />
                  <Pagination count={modalData.images.length} page={page}
                    onChange={handleChange} />
                  <Typography variant="h6" id="modal-title">
                    {modalData.title}
                  </Typography>
                  <p/>
                  <Typography variant="h6" id="modal-title">
                    {'$' + modalData.price}
                  </Typography>
                  <p/>
                  <Typography variant="h6" id="modal-title">
                    {modalData.description}
                  </Typography>
                </Stack>
              </Box>
            </div>
          </Paper>
        ) : null}
      </div>
    );
  };

  let hand;
  if (modalData != null) {
    hand = customPaper();
  }
  // (listing && listing.map((item) => (console.log(item.image[0]['image']))));
  // (listing && listing.map((item) => (console.log(item.image.length))));
  // console.log(dummy);
  return (
    <div>
      {listing ? (
        <ImageList sx={{
          display: !listingOpen ? 'block' : 'none',
          width: '95vw', marginLeft: 'auto', marginRight: 'auto'}}>
          {listing && listing.map((item) => (
            <ImageListItem id={item.title} data-testid={item.title}
              key={item.title}
              onClick={() => {
                handleOpen(item);
                openListing();
              }}>
              <img
                src={`${item.images[0]}?w=248&fit=crop&auto=format`}
                srcSet={`${item.images[0]}
              ?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{margin: '5px'}}
              />
              <ImageListItemBar
              // title={item.title}
                title={'$'+item.price}
                subtitle={<span>{item.title}</span>}
                // old subtitle with the location...
                // subtitle={<span>{item.title + ' ' + item.location}</span>}
                position="below"
                sx={{left: '10px'}}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : null }
      <div>
        {hand}
      </div>
    </div>
  );
}

export default Listing;
