const { Sequelize } = require('sequelize');

// Create a connection instance
const sequelize = new Sequelize('transfer_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
