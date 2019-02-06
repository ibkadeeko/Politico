// Import dependencies
import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';

// import routes
import parties from './routes/parties';
import offices from './routes/offices';

// Setup express app
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(expressValidator());

// Connect to routes
app.use('/api/v1/parties', parties);
app.use('/api/v1/offices', offices);

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Politico api v1' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started and listening on port: ${PORT}`);
});

export default app;
