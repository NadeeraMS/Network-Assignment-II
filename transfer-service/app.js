const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const transferRoute = require('./routes/transfer');
const accountRoute = require('./routes/accounts'); 




const app = express();

app.use(bodyParser.json());

// Sync models with the database (use { force: true } carefully)
sequelize.sync().then(() => {
  console.log('Database & tables created!');
}).catch(err => console.error('Error syncing database:', err));

// Routes
app.use('/api', transferRoute);
app.use('/api', accountRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
