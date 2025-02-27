# Job Management Application

## Overview
This is a **full-stack job management application** built using **Spring Boot** for the backend and **React** for the frontend. The application allows users to create, update, view, and delete job posts.

## Technologies Used
### Backend (Spring Boot)
- Spring Boot (REST API)
- Spring MVC
- Maven (for dependency management)

### Frontend (React)
- React.js
- React Router
- Material UI (for UI styling)
- Axios (for API calls)

## Features
### Backend
- Exposes RESTful endpoints for managing job posts.
- Supports CRUD operations:
  - **Create** a new job post (`POST /jobPost`)
  - **Retrieve** all job posts (`GET /jobPosts`)
  - **Retrieve** a job post by ID (`GET /jobPost/{postId}`)
  - **Update** a job post (`PUT /jobPost`)
  - **Delete** a job post (`DELETE /jobPost/{postId}`)
- CORS enabled for frontend communication.

### Frontend
- Displays all job posts in a list.
- Allows users to create a new job post.
- Provides an interface for updating job details.
- Enables deleting a job post.
- Uses Material UI for a clean and modern UI.

## Project Structure

### Backend (Spring Boot)
```
src/main/java/org/example/jobrest/
│── JobRestApplication.java   # Main Spring Boot application
│── controller/
│   └── JobRestController.java   # REST controller for job posts
│── service/
│   └── JobService.java   # Service layer for handling business logic
│── repository/
│   └── JobRepository.java  # Data access layer (JPA repository)
│── model/
│   └── JobPost.java  # Entity model for JobPost
```

### Frontend (React)
```
src/
│── components/
│   ├── AllPosts.js  # Displays job posts
│   ├── Create.js  # Form for adding a new job post
│   ├── Edit.js  # Form for editing job post details
│   ├── Navbar.js  # Navigation bar
│── App.js  # Main component with routing
│── index.js  # Entry point for React
│── App.css  # Styles
│── index.css  # Global styles
```

## Setup Instructions

### Backend (Spring Boot)
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/job-management-app.git
   cd job-management-app/backend
   ```
2. Build and run the application:
   ```sh
   mvn spring-boot:run
   ```
3. The backend will be running at `http://localhost:8080`.

### Frontend (React)
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React application:
   ```sh
   npm start
   ```
4. The frontend will be available at `http://localhost:3000`.

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/jobPosts` | Get all job posts |
| GET | `/jobPost/{postId}` | Get a job post by ID |
| POST | `/jobPost` | Add a new job post |
| PUT | `/jobPost` | Update an existing job post |
| DELETE | `/jobPost/{postId}` | Delete a job post |



