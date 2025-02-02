const mysql = require("mysql2");

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost", // Replace with your database host
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "flower_project", // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if connection fails
  } else {
    console.log("Connected to the MySQL database.");
  }
});

module.exports = db;
