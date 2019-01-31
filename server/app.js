// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';

// import routes
import parties from './routes/parties';

// Setup express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Connect to routes
app.use('/api/politico/v1/parties', parties);

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started and listening on port: ${PORT}`);
});

export default app;
