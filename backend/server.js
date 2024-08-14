const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Olufemik12@",
  database: "paygizmo",
  port: 3006,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("MySQL Connected...");
});

// Endpoint to get email addresses for gridiron tenant
app.get("/emails", (req, res) => {
  const tenant = req.query.tenant || "gridiron";
  const query = "SELECT EMAILADDRESS FROM paygizmologins WHERE TENANT = ?";
  db.query(query, [tenant], (err, result) => {
    if (err) {
      console.error("Error fetching emails:", err);
      return res.status(500).send({ message: "Error fetching emails" });
    }
    res.send(result);
  });
});

// Endpoint to send email and create a record
app.post("/send-email", (req, res) => {
  const {
    recipient,
    emailaddress,
    status,
    emailtemplate,
    transactiontype,
    transaction,
  } = req.body;

  // Convert `emailaddress` to an array if it's a single string
  const emailAddresses = Array.isArray(emailaddress)
    ? emailaddress
    : [emailaddress];

  // Prepare the `values` array for bulk insertion
  const values = emailAddresses.map((email) => [
    email,
    status,
    transactiontype,
    transaction,
    recipient,
    emailtemplate,

    "UUID()",
    "",
    "",
    "",
    "",
    new Date(),
    new Date(),
    "ega-tech.co",
  ]);

  // Construct the SQL query
  const query = `
    INSERT INTO paygizmoseshtml 
    (EMAILADDRESS, STATUS, TRANSACTIONTYPE, TRANSACTION, RECIPIENT, EMAILTEMPLATE, ID, CURRENCY, AMOUNT, TARGETCURRENCY, TARGETAMOUNT, DATETIMESTAMPID, DATE, DOMAIN) 
    VALUES ?`;

  const finalQuery = mysql.format(query, [values]);

  // Execute the query
  db.query(finalQuery, (err, result) => {
    if (err) {
      console.error("Error inserting record:", err);
      return res.status(500).send({ message: "Failed to insert record" });
    }
    res.json({ message: "Records inserted successfully", result });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
