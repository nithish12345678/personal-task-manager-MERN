# personal-task-manager-MERN-App
 a simple web application for managing a  personal task list. The application should allow users to create, read, update, and  delete tasks

# Task Manager

A simple web application for managing a personal task list.
![task-manager app screenshot](https://github.com/nithish12345678/personal-task-manager-MERN/assets/83687979/d1213a4e-17a3-4c61-bc4c-4eec10edcf5f)


# Backend Setup
## Prerequisites
Node.js installed.
MySQL installed and running.

## 1.2 Installation
Clone the repository:

## code
git clone https://github.com/your-username/your-project.git
Navigate to the backend directory:

## code
cd your-project/backend
Install dependencies:

## code
npm install

1.3 Configuration
Create a .env file in the backend directory.

Add the following configurations to the .env file:

## code
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=task_manager
Replace your_mysql_username and your_mysql_password with your MySQL credentials.

## Running the Backend
Start the backend server:
## code
npm start

The backend server will be running on http://localhost:3001.

# Frontend Setup
## Prerequisites
Node.js installed.

## Installation
Navigate to the frontend directory:
code
cd your-project/frontend

Install dependencies:
code
npm install

## Configuration
Open src/App.js.

Update the API base URL to match your backend server (usually http://localhost:3001):

code
const apiUrl = 'http://localhost:3001';
2.4 Running the Frontend
## Start the frontend development server:

code
npm start
The frontend application will be accessible at http://localhost:3000.

