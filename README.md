# dpkg-status

App that displays some key content from the dpkg status file in an easily understandable manner. Also provides a way to tag and add notes to packages.

### Tech Stack

The frontend is build with React and styled-components and backend with Koa HTTP server and Knex SQL query builder.

### Development

Clone this git repo

#### Frontend

1. Run "npm start" in the client directory

#### Backend

1. Supply the DATABASE_URL_CUSTOM env to the backend. It should point to a local or remote PostgreSQL database table.

2. Start the development server with "npm start" in the api folder

### Live Demo

[dkpg-status](https://dkpg-status.netlify.app)

The backend is hosted in Heroku so it might take a moment to warm up.
