const mysql = require("mysql2");

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost", 
  user: "root", 
  password: "", 
  database: "flower_project", 
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
