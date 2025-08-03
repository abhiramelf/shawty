
# Shawty

Shawty is a modern URL shortening service. The backend is built with Node.js, Express, and MongoDB, supporting user authentication, protected APIs, and user-specific link management. The backend code now lives entirely in the `backend` folder. A React frontend will be developed in the `frontend` folder.

## Features

- Shorten long URLs to short, easy-to-share links
- Redirect short URLs to the original destination
- Tracks the number of times a short URL is used
- User registration and login with JWT authentication
- Protected endpoints for managing user-specific links
- Robust error handling and validation
- Built with Express, Mongoose, nanoid, bcryptjs, jsonwebtoken, and dotenv

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation (Backend)

1. Clone the repository:

   ```bash
   git clone https://github.com/abhiramelf/shawty.git
   cd shawty/backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI, port, base URL, and JWT secret:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   BASE_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret
   ```

### Running the Backend

Start the backend server in development mode with nodemon:

```bash
npm run dev
```

The backend app will be running at [http://localhost:3000](http://localhost:3000) (or the port you specified).

### Frontend

The React frontend will live in the `frontend` folder. Instructions for setting up and running the frontend will be added once development begins.

## API Endpoints

### Authentication

- **POST** `/api/auth/register` — Register a new user
  - **Body:** `{ "name": "John", "email": "john@example.com", "password": "yourpassword" }`
  - **Response:** `201 Created` with user info (no password)

- **POST** `/api/auth/login` — Login and receive a JWT token
  - **Body:** `{ "email": "john@example.com", "password": "yourpassword" }`
  - **Response:** `200 OK` with `{ token, user }`

### Shorten a URL

- **POST** `/api/shorten`
  - **Body:** `{ "longUrl": "https://example.com" }`
  - **Response:** `201 Created` with `{ data: { shortUrl, longUrl, urlCode, ... } }`

### Redirect to Original URL

- **GET** `/:code`
  - Redirects to the original long URL if the code exists
  - Returns a 404 page or JSON error if not found

### User Links (Protected)

- **GET** `/api/links/my-links` — Get all links created by the authenticated user
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `200 OK` with `{ data: [ ...links ] }`

## Project Structure

```text
shawty/
├── backend/                 # All backend code (Node.js/Express/MongoDB)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js            # Main Express server entry point
│   ├── package.json         # Backend project metadata and scripts
│   └── .env                 # Backend environment variables (not committed)
├── frontend/                # (To be created) React frontend app
└── README.md                # Project documentation
```

## Environment Variables (Backend)

- `MONGO_URI` — MongoDB connection string
- `PORT` — Port to run the backend server (default: 3000)
- `BASE_URL` — Base URL for generating short links
- `JWT_SECRET` — Secret key for signing JWT tokens

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License.
