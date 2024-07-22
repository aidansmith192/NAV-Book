const authenticate = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).send('Not authenticated');
  }
};
/**
 *  you can use this middleware, to make a route
 *  accessible only if the user has a valid session
 *
 * EXAMPLE:
 * const authenticate = require('./middleware/authenticate);
 *
 * app.post('/v0/listings', authenticate, listingRoutes);
 *
 * this would make it so a user can only post to the listings
 *  if they are authenticated
 */

module.exports = authenticate;
