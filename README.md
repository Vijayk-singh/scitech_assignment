# SciTech Assignment

This project is a full-stack machine monitoring dashboard with:

- a `Next.js` frontend in [`/home/vijay/Desktop/workspace/scitech_assignment/frontend`](./frontend)
- a `NestJS` backend in [`/home/vijay/Desktop/workspace/scitech_assignment/backend`](./backend)
- `MongoDB` for machine data storage
- JWT-based authentication for protected API routes

The app lets a user log in, view a list of machines, open a machine details page, and update machine values such as temperature, energy consumption, and status.

## Project Structure

```text
scitech_assignment/
├── backend/   # NestJS API + MongoDB integration
└── frontend/  # Next.js dashboard UI
```

## Features

- Login flow with JWT token issuance
- Auth-protected machine APIs
- Machine listing dashboard
- Machine detail view with editable fields
- Auto-refreshing dashboard polling
- Add machine support from the dashboard
- MongoDB persistence for machine records

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Axios
- Tailwind CSS

### Backend

- NestJS
- TypeScript
- Mongoose
- MongoDB
- JWT authentication
- Cookie-based token support

## Prerequisites

Make sure these are installed locally:

- Node.js 18+ or newer
- npm
- MongoDB running locally or a reachable MongoDB connection string

## Environment Variables

The backend uses environment variables from `backend/.env`.

1. Copy the example file:

```bash
cp backend/.env.example backend/.env
```

2. Update values if needed:

```env
MONGO_URI=mongodb://localhost:27017/scitech
JWT_SECRET=supersecret
PORT=3001
```

## Installation

Install dependencies for both apps:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

## Running the Project

Start the backend:

```bash
cd backend
npm run start:dev
```

The backend runs on `http://localhost:3001`.

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:3000`.

## Default Login

The current backend accepts this hardcoded demo account:

- Username: `admin@example.com`
- Password: `password123`

## API Overview

Base URL: `http://localhost:3001`

### Auth

- `POST /auth/login` - logs in and returns a JWT token
- `POST /auth/logout` - clears the auth cookie

### Machines

- `GET /machines` - fetch all machines
- `POST /machines` - create a machine
- `GET /machines/:machineId` - fetch one machine by `machineId` or Mongo `_id`
- `PATCH /machines/:machineId` - update a machine by `machineId`

Example machine payload:

```json
{
  "machineId": "M-1001",
  "name": "CNC Press",
  "status": "Running",
  "temperature": 72,
  "energyConsumption": 18.4
}
```

## Application Flow

1. Open the frontend at `http://localhost:3000/login`
2. Log in with the demo credentials
3. Go to the dashboard to view machine records
4. Click a machine row to open its detail page
5. Edit machine data and save changes

## Notes

- CORS is currently configured for `http://localhost:3000`
- The backend sets an HTTP-only cookie and also returns the access token in the login response
- Machine detail history is generated on the backend from the current temperature
- Authentication credentials are hardcoded for demo purposes in the current implementation

## Available Scripts

### Backend

```bash
npm run start
npm run start:dev
npm run build
npm run test
npm run test:e2e
npm run lint
```

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Future Improvements

- Replace hardcoded login with database-backed users
- Add validation for request payloads
- Add seed data for machines
- Add loading/error states for all user actions
- Store frontend API base URL in environment variables
- Add tests for auth flow and machine updates
