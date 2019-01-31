// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';

// import routes
import parties from './routes/parties';
import offices from './routes/offices';

// Setup express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Connect to routes
app.use('/api/v1/politico/parties', parties);
app.use('/api/v1/politico/offices', offices);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started and listening on port: ${PORT}`);
});

export default app;
