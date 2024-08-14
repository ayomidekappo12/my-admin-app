Full-Stack Email Management Application

## Overview

This application consists of a full-stack solution for managing and sending emails. It includes a React (Next.js) frontend and an Express.js backend with a MySQL database. The frontend provides an admin panel for managing email addresses and sending emails, while the backend handles email storage and sending operations.

## Features

Admin Panel: Manage email addresses and send emails.
Email Validation: Ensure that email addresses are in a valid format before sending.
Bulk Email Sending: Send emails to multiple addresses (up to 20) in a single operation.
Data Fetching: Fetch email addresses from the backend and display them in the admin panel.
Error Handling: Display user-friendly error messages for various operations.

## Technologies

Frontend: React (Next.js), TypeScript
Backend: Express.js, MySQL
Database: MySQL
HTTP Client: Axios (for API requests)
UI Components: Custom components for input and buttons

## Project Structure

Frontend (/src):

components/: Contains UI components.
pages/: Contains React components and pages, including the admin panel.
utils/: Contains utility functions for API requests.
Backend (/server):

server.js: Express server with endpoints for fetching emails and sending emails.
config/: Contains database configuration.

## Setup Instructions

Frontend Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/your-repo/full-stack-email-management.git
cd full-stack-email-management
Navigate to the Frontend Directory:

bash
Copy code
cd src
Install Dependencies:

bash
Copy code
npm install
Run the Development Server:

bash
Copy code
npm run dev
The frontend will be available at http://localhost:3000.

## Backend Setup

Navigate to the Backend Directory:

bash
Copy code
cd server
Install Dependencies:

bash
Copy code
npm install
Configure the Database:
Ensure that the MySQL database is set up and running. Update the server.js file with your MySQL credentials and database configuration.

Run the Backend Server:

bash
Copy code
npm start
The backend will be available at http://localhost:5000.

## Database Setup

Create a MySQL Database:

Name: paygizmo
Create the necessary tables with the provided SQL schema.
Sample Tables:

paygizmologins: Stores email addresses and tenant information.
paygizmoseshtml: Records email sending activity.

## API Endpoints

GET /emails: Fetches email addresses for a specified tenant.

Query Parameter: tenant (default: gridiron)
POST /send-email: Sends an email and records the activity.

Request Body:
recipient: Recipient email address
emailaddress: Sender email address
status: Status of the email sending operation
emailtemplate: HTML content of the email
transactiontype: Type of transaction
transaction: Transaction details

## Error Handling

User-friendly error messages are displayed for failed API requests and validation errors.
Backend logs errors to the console for debugging purposes.

## Contributing

Feel free to contribute by submitting issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.
