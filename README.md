"# Network-Assignment-II" 

# Transfer Service API

This project is a RESTful API for handling transfers between accounts. It uses Node.js, Express, Sequelize (for SQL database management), and MySQL. The API includes endpoints for creating accounts and performing transfers between them.

## Table of Contents

- [Installation](#installation)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Running the Project](#running-the-project)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/transfer-service.git
   cd transfer-service
   
##Install dependencies:
npm install

##Database Setup
##Set up MySQL:
Install WAMP/XAMPP or MySQL server.
Create a database named transfer_db.

Set your MySQL username and password in config/db.js.
const sequelize = new Sequelize('transfer_db', 'your_mysql_username', 'your_mysql_password', {
    host: 'localhost',
    dialect: 'mysql'
});
Sync the database:

The database and tables will be created automatically when you run the application.

##API Endpoints
1. Create Account
URL: /api/create-account

Method: POST
##Description: Creates a new account.
Request Body:
{
  "accountNumber": "1122334455",
  "balance": 7500.00
}

Response:
{
  "message": "Account created successfully",
  "account": {
    "accountNumber": "1122334455",
    "balance": 7500.00,
    "createdAt": "2024-08-18T10:00:00.000Z",
    "updatedAt": "2024-08-18T10:00:00.000Z"
  }
}


2. Transfer Between Accounts
URL: /api/transfer

Method: POST
Description: Transfers a specified amount from one account to another.

Request Body:
{
  "sourceAccountNumber": "1234567890",
  "destinationAccountNumber": "0987654321",
  "amount": 100.00
}

Response:
{
  "message": "Transfer successful"
}
3. Error Responses
Invalid account number: Returns 400 Bad Request with an error message.
Insufficient funds: Returns 400 Bad Request with an error message.
Account not found: Returns 404 Not Found with an error message.
Internal Server Error: Returns 500 Internal Server Error with an error message.

##Running the Project
Start the server:
    npm start
    
Or if you are using nodemon:
    nodemon app.js

Access the API:
Use Postman or any other API client to send requests to http://localhost:5000.

##License
This project is licensed under the MIT License.


 How to Use:
1. Replace `"your_mysql_username"` and `"your_mysql_password"` in the `Database Setup` section with your actual MySQL credentials.
2. Update the repository URL in the `Installation` section with your GitHub repository URL.

This `README.md` provides clear instructions on setting up and using your project, including how to interact with the API endpoints.
