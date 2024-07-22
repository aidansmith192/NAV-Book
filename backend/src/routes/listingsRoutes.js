/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const {createListing, getListings} =
 require('../controllers/listingsController');

router.get('/', getListings);
// QUERY PARAMS
// category                 (string)
// subcategory              (string)
// maxDistance (in miles)   (numeric)
// title                    (string)
// maxPrice (in dollars)    (numeric)
// minPrice (in dollars)    (numeric)
// byUser                   (bool)
// maxDaysOld               (numeric)
// specificAttribute        (string)

router.post('/:category', authenticate, createListing);

module.exports = router;
