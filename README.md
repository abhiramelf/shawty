# Shawty

<!--
README for Shawty: URL Shortener
This file explains the project, setup, and structure for new users and contributors.
-->

Shawty is a simple URL shortening service built with Node.js, Express, and MongoDB. It allows you to shorten long URLs and redirect users to the original links using the generated short codes.

## Features

- Shorten long URLs to short, easy-to-share links
- Redirect short URLs to the original destination
- Built with Express and MongoDB (via Mongoose)
- Environment variable support via dotenv

## Getting Started

<!-- Prerequisites for running the project -->
### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

<!-- Installation steps for developers -->
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhiramelf/shawty.git
   cd shawty
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and desired port:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

### Running the Application

Start the server in development mode with nodemon:

```bash
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000) (or the port you specified).

## Project Structure [WIP]

<!-- Directory structure and file purpose -->
```md
shawty/
├── backend/
│   ├── config/
│   │   └── db.js         # MongoDB connection logic
│   ├── controllers/      # (Controllers for business logic)
│   ├── middleware/       # (Custom middleware)
│   ├── models/           # (Mongoose models)
├── server.js             # Main Express server entry point
├── package.json          # Project metadata and scripts
└── .env                  # Environment variables (not committed)
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License.
