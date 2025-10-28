# Lesson Platform - Frontend (React + Vite)

This is the frontend application for the **Lesson Platform**, designed to work with the Spring Boot backend. It provides a user-friendly interface for teachers and students to manage, upload, and access lesson materials.

---

## 📖 Table of Contents

1. [Introduction](#1-introduction)
2. [Tech Stack](#2-tech-stack)
3. [Requirements](#3-requirements)
4. [Getting Started](#4-getting-started)
5. [Test Roles](#5-test-roles)
6. [API Endpoints](#6-api-endpoints)
7. [Project Structure](#7-project-structure)
8. [Further Notes](#8-further-notes)

---

## 1. Introduction

This frontend allows:

- Teachers to upload, manage, and assign lesson materials
- Students to view, filter, and prepare for upcoming lessons

It pairs with the backend API found here:  
[Backend API Repository](https://github.com/moreniekmeijer/backend-lesson-platform)

---

## 2. Tech Stack

- **React 19** with [Vite](https://vitejs.dev/)
- **React Hook Form** for forms
- **React Router v7** for routing
- **Axios** for HTTP requests
- **Date-fns** for date manipulation
- **SimplePDF Viewer** to display PDFs
- **JWT Decode** to handle tokens

---

## 3. Requirements

Ensure you have the following installed:

| Tool          | Download Link                                      |
|---------------|----------------------------------------------------|
| WebStorm      | [Download](https://www.jetbrains.com/webstorm/)    |
| Node.js (v18+)| [Download](https://nodejs.org/)                    |
| npm or yarn   | Comes with Node.js                                 |

---

## 4. Getting Started

### Option A: Download ZIP
- Download the ZIP file provided with the source code
- Extract it to your preferred directory
- Open it in WebStorm as a React + Vite project

### Option B: Clone Repository
```bash
git clone https://github.com/moreniekmeijer/frontend-lesson-platform.git
cd frontend-lesson-platform
```

### Then:

1. Run `npm install`
2. Create a `.env` file in the root directory:

    ```env
    VITE_API_URL=http://localhost:8080
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

The app should now be running on: `http://localhost:5173`

---

## 5. Test Roles

| Role  | Username | Email         | Password |
|-------|----------|---------------|----------|
| USER  | user     | user@test.nl  | password |
| ADMIN | admin    | admin@test.nl | password |

---

## 6. API Endpoints

These endpoints are provided by the backend API and consumed by the frontend.
The full API documentation is available in Postman:  
**[Postman Docs 🔗](https://documenter.getpostman.com/view/41365945/2sB2cd4yGR)**

### Core Endpoints (Summary)

#### Authentication
- `POST /authenticate` ➔ login and returns JWT token

#### Users
- `GET /users` ➔ List all users (admin only)
- `GET /users/{id}` ➔ Get user by ID
- `POST /users/register` ➔ Register a new user (with invite code, see: [Application Properties](#5-application-properties))

#### Materials
- `GET /materials` ➔ List all materials
- `GET /materials/{id}` ➔ Get one material
- `POST /materials` ➔ Upload new material-metadata (use in combination with the 'Assign file or link')
- `DELETE /materials/{id}` ➔ Delete material

#### Assign file or link
- `POST /materials/{id}/file` ➔ Add file (PDF, audio, etc.)
- `POST /materials/{id}/link` ➔ Add link

#### Style Management
- `GET /styles` ➔ Get all styles
- `POST /styles` ➔ Add a new style
- `DELETE /styles/{id}` ➔ Delete style

#### Lesson Management
- `GET /lessons/next` ➔ Get upcoming lesson
- `POST /lessons` ➔ Add a new lesson
- `DELETE /lessons/{id}` ➔ Delete lesson

> For full request/response bodies and headers, refer to [Postman Docs](https://documenter.getpostman.com/view/41365945/2sB2cd4yGR)

---

## 7. Project Structure

For a complete view of the project structure, visit this link: `https://githubtree.mgks.dev/repo/moreniekmeijer/frontend-lesson-platform/main/`

---

## 8. Further Notes

- You must have the backend running on `http://localhost:8080`
- Tokens are stored in memory (React context)
- Protected routes are secured via JWT
- An invite code is required when registering a new user: `lekkerwaterdichtregistreren`

---

Need help? Open an issue or get in contact.

