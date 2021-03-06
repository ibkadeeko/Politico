// Import dependencies
import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// import routes
import parties from './routes/parties';
import offices from './routes/offices';
import users from './routes/users';
import candidates from './routes/candidates';

// Setup express app
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(expressValidator());
app.use(cors());

// Connect to routes
app.use('/api/v1', candidates);
app.use('/api/v1/parties', parties);
app.use('/api/v1/offices', offices);
app.use('/api/v1/auth', users);

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Politico api v1' });
});

// Invalid Routes
app.all('*', (req, res) => {
  res.status(404).json({ message: 'The Route you are requesting for does not exist' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started and listening on port: ${port}`);
});

export default app;
