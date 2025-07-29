## Prerequisites

- [Node.js](v18+ recommended)
- [Docker](https://www.docker.com/get-started)

## Step 1: Start MongoDB with Docker Compose

Make sure you have Docker installed.

In the root of the project (where the `docker-compose.yml` file is), run:

```bash
docker-compose up -d 
```

This command:

 - Starts MongoDB in a Docker container

 - Maps MongoDB port 27017 to your local machine


## Step 2: Start Backend

``` bash 
cd backend
npm install
npm run dev
```

## Step 3: Start Frontend

``` bash 
cd frontend
npm install
npm run dev
```
Open the browser at the address shown in the terminal!

Now you can view all Text widgets, add a new one or delete.

Happy Widgeting 🚀


## To run tests

from the backend dir run `npm run test`