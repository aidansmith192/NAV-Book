const express = require('express');
const session = require('express-session');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dummy = require('./dummy');
// Used for listing generation
// const listing = require('./listing');
const authRoutes = require('./routes/authRoutes');
const listingsRoutes = require('./routes/listingsRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'testing',
  resave: false,
  saveUninitialized: false,
}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

// dummy route
app.get('/v0/dummy', dummy.get);
// Your routes go here
app.use('/v0/auth', authRoutes);
// Only used to generate hot picks of the day (for now)
// app.get('/v0/listing', listing.get);

app.use('/v0/listings', listingsRoutes);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
