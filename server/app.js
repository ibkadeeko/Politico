// Import dependencies
import express from 'express';
import expressValidator from 'express-validator';
// var expressValidator = require(‘express-validator’);
// import bodyParser from 'body-parser';

// import routes
import parties from './routes/parties';
import offices from './routes/offices';

// Setup express app
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressValidator());

// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json

// Connect to routes
app.use('/api/v1/parties', parties);
app.use('/api/v1/offices', offices);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started and listening on port: ${PORT}`);
});

export default app;
