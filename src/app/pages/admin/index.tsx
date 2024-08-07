"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";

const AdminPage = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState("");
  const [tenant, setTenant] = useState("gridiron");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch email addresses from the backend based on tenant
    axios
      .get(`http://localhost:5000/emails?tenant=${tenant}`)
      .then((response) => setEmails(response.data))
      .catch((error) =>
        console.error("Error fetching email addresses:", error)
      );
  }, [tenant]);

  const handleSubmit = () => {
    const emailList = selectedEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    if (emailList.length > 20) {
      setError("You can send emails to a maximum of 20 addresses at a time.");
      return;
    }

    setError("");

    emailList.forEach((email) => {
      axios
        .post("http://localhost:5000/send-email", { recipient: email })
        .then(() => alert(`Email sent to ${email}`))
        .catch((error) => console.error("Error sending email:", error));
    });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <label>
          Email Address(es) (comma-separated):
          <Input
            type="text"
            value={selectedEmails}
            onChange={(e) => setSelectedEmails(e.target.value)}
            placeholder="Enter email addresses"
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <h2>Available Email Addresses:</h2>
      <ul>
        {emails.map(({ EMAILADDRESS }) => (
          <li key={EMAILADDRESS}>{EMAILADDRESS}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
