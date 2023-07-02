require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/connection');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8080;

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error on database connection: ' + err))

sequelize.sync();

app.disable("x-powered-by")
// Disable for local testing with views/
// app.use(cors({
//   origin: [`http://localhost:${PORT}`]
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// App routes
app.use('/auth', authRoutes);

app.get('/', async (_, res) => {
  res.status(200).send('Server ok');
});

app.get('*', (_, res) => {
  res.status(404).send('Route not found');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  app,
  server
}
