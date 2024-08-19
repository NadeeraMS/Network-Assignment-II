const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const transferRoute = require('./routes/transfer');

const app = express();

app.use(bodyParser.json());

// Sync models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

// Routes
app.use('/api', transferRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
