const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Olufemik12@",
  database: "paygizmo",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!...");
});

// Endpoint to get email addresses for gridiron tenant

app.get("/emails", (req, res) => {
  const tenant = req.query.tenant || "gridiron";
  const query = "SELECT EMAILADDRESS FROM paygizmologins WHERE TENANT =?";
  db.query(query, [tenant], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/send-email", (req, res) => {
  const { recipient } = req.body;
  const query = `
        INSERT INTO paygizmoseshtml (ID, EMAILADDRESS, CURRENCY, AMOUNT, TARGETCURRENCY, TARGETAMOUNT, DATETIMESTAMPID, STATUS, TRANSACTIONTYPE, TRANSACTION, RECIPIENT, DATE, EMAILTEMPLATE, DOMAIN)
        VALUES (UUID(), 'admin@gridirontest.com', '', '', '', '', NOW(), 'sending', '', '', ?, NOW(), 'this is a test', 'ega-tech.co')
    `;
  db.query(query, [recipient], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
