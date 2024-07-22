const pool = require('../pool');
const calcDistance = require('../util/calcDistance');

const getListings = (req, res) => {
  let andFlag = false;
  const values = [];
  let queryText = 'SELECT * FROM listing';
  if (Object.keys(req.query).length === 0) {
    const query = {
      text: queryText,
    };
    pool.query(query)
      .then((results) => {
        res.status(200).json(results.rows.map((row) => {
          return {
            title: row.title,
            description: row.description,
            price: row.price,
            category: row.category,
            subcategory: row.subcategory,
            userId: row.userId,
            ts: row.ts,
            longitude: Number(row.longitude),
            latitude: Number(row.latitude),
            images: row.images,
          };
        }));
      });
    return;
  }
  // console.log('YOLOOOO');
  if (req.query.maxDistance && req.query.maxDistance !== -1) {
    if (req.query.title === 'undefined' && req.query.category === 'undefined' &&
        req.query.subcategory === 'undefined' &&
         req.query.specificAttribute === 'undefined' &&
           req.query.brand === 'undefined' &&
            req.query.byUser === 'undefined' &&
            req.query.lat !== 'undefined' && req.query.long !== 'undefined') {
      // console.log('1111111111111111111111');
    } else if (req.query.title === undefined &&
       req.query.category === undefined &&
        req.query.subcategory === undefined &&
         req.query.specificAttribute === undefined &&
           req.query.brand === undefined &&
            req.query.byUser === undefined &&
            (req.query.lat !== undefined ||
               req.query.long !== undefined)) {
      // console.log('222222222222222222222222');
    } else {
      // console.log('NOT WHAT I WANTTTTTTTTTTTT')
      queryText += ' WHERE ';
    }
    // if(Object.keys(req.query).length > 3) {
    // console.log('333333333333333333333333');
    // queryText += ' WHERE ';
    // }
  } else if (req.query.title === 'undefined' &&
   req.query.category === 'undefined' &&
            req.query.subcategory === 'undefined' &&
             req.query.specificAttribute === 'undefined' &&
               req.query.brand === 'undefined' &&
                req.query.byUser === 'undefined') {
    // console.log('44444444444444444444');
  } else {
    // console.log('55555555555555555');
    queryText += ' WHERE ';
  }

  // console.log(req.query.title);
  // console.log(req.query.category);
  // console.log(req.query.subcategory);
  // console.log(req.query.specificAttribute);
  // console.log(req.query.brand);
  // console.log(req.query.sort);
  // console.log(req.query.maxDistance);
  // console.log(req.query.lat);
  // console.log(req.query.long);
  // console.log(req.query.byUser);

  if (req.query.title && req.query.title !== 'undefined') {
    values.push(req.query.title);
    queryText += `title ~* $${values.length}`;
    andFlag = true;
  }

  if (req.query.minPrice) {
    if (andFlag) queryText += ' AND ';
    values.push(req.query.minPrice);
    queryText += `price >= $${values.length}`;
    andFlag = true;
  }

  if (req.query.maxPrice) {
    if (andFlag) queryText += ' AND ';
    values.push(req.query.maxPrice);
    queryText += `price <= $${values.length}`;
    andFlag = true;
  }

  if (req.query.byUser && req.query.byUser !== 'undefined') {
    if (!req.session.user) return res.status(401).send('Not authenticated');
    if (andFlag) queryText += ' AND ';
    values.push(req.session.user.id);
    queryText += `userId = $${values.length}`;
    andFlag = true;
  }

  if (req.query.category && req.query.category !== 'undefined') {
    if (andFlag) queryText += ' AND ';
    values.push(req.query.category);
    queryText += `category = $${values.length}`;
    andFlag = true;
  }

  if (req.query.subcategory && req.query.subcategory !== 'undefined') {
    if (andFlag) queryText += ' AND ';
    values.push(req.query.subcategory);
    queryText += `subcategory = $${values.length}`;
    andFlag = true;
  }

  if (req.query.specificAttribute &&
     req.query.specificAttribute !== 'undefined') {
    if (andFlag) queryText += ' AND ';
    values.push(req.query.specificAttribute);
    queryText += `specificattribute = $${values.length}`;
    andFlag = true;
  }

  if (req.query.brand && req.query.brand !== 'undefined') {
    if (andFlag) queryText += ' AND ';
    values.push(req.query.brand);
    queryText += `brand = $${values.length}`;
    andFlag = true;
  }

  if (req.query.sort && req.query.sort !== 'undefined') {
    if (req.query.sort === 'ASC') {
      queryText += ` ORDER BY price ASC`;
    }
    if (req.query.sort === 'DESC') {
      queryText += ` ORDER BY price DESC`;
    }
  }

  // Removed and replace with the above if statement
  // queryText += ' ORDER BY ts DESC';

  const query = {
    text: queryText,
    values,
  };

  // console.log(query);
  pool.query(query)
    .then((listings) => {
      let results = listings.rows;
      if (listings.rows.length === 0) {
        return res.sendStatus(404);
      }
      if (req.query.maxDistance && req.query.maxDistance !== -1) {
        if (!req.query.lat || !req.query.long) {
          return res.sendStatus(400);
        }
        results = results.filter((row) =>
          calcDistance(
            req.query.lat,
            req.query.long,
            Number(row.latitude),
            Number(row.longitude)) <= Number(req.query.maxDistance),
        );
      }
      res.status(200).json(results.map((row) => {
        return {
          title: row.title,
          description: row.description,
          price: row.price,
          category: row.category,
          subcategory: row.subcategory,
          userId: row.userId,
          ts: row.ts,
          longitude: Number(row.longitude),
          latitude: Number(row.latitude),
          images: row.images,
        };
      }));
    });
};

// Used for when a title is specified in the Home.js search bar
// Connects with the Listing.js front end file
// Returns Listings based on the requested title
// const getListingsByTitle = (req, res) => {
//     let query;

//     query = {
//         text: 'SELECT * FROM listing WHERE title LIKE $1',
//         values: ['%' + req.params.title + '%'],
//       };

//       pool.query(query)
//       .then((listings) => {
//         if (listings.rows.length === 0) {
//           return res.sendStatus(404);
//         } else {
//             return res.status(200).json(listings.rows.map(row => {
//                 return {
//                     title: row.title,
//                     description: row.description,
//                     price: row.price,
//                     category: row.category,
//                     subcategory: row.subcategory,
//                     userId: row.userId,
//                     ts: row.ts,
//                     longitude: Number(row.longitude),
//                     latitude: Number(row.latitude),
//                     images: row.images
//                 }
//             }));
//         }
//       });
// };


const createListing = (req, res) => {
  let query;
  // this is pretty hacky, but its the only way i can think of validating
  // that the subcategory exists for now
  if (req.query.subcategory &&
        req.query.subcategory !== 'motorcycles' &&
        req.query.subcategory !== 'trucks' &&
        req.query.subcategory !== 'sedans') {
    return res.sendStatus(400);
  }

  if (req.query.subcategory) {
    query = {
      /* eslint max-len: ["error", { "code": 200 }]*/
      text: 'INSERT INTO listing(category, subcategory, userId, title, description, price, longitude, latitude, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      values: [
        req.params.category,
        req.body.subcategory,
        req.session.user.id,
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.longitude,
        req.body.latitude,
        req.body.images,
      ],
    };
  } else {
    query = {
      /* eslint max-len: ["error", { "code": 200 }]*/
      text: 'INSERT INTO listing(category, userId, title, description, price, longitude, latitude, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [
        req.params.category,
        req.session.user.id,
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.longitude,
        req.body.latitude,
        req.body.images,
      ],
    };
  }
  pool.query(query)
    .then((listing) => {
      return res.sendStatus(200);
    })
    .catch((e) => {
      return res.sendStatus(400);
    });
};

module.exports = {
  getListings,
  createListing,
};
