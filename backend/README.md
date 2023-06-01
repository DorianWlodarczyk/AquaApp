## Deployment

### Backend

Open your terminal and navigate to the backend

```bash
    cd backend
```

Copy the example environment file to create your own:

```bash
    cp .env.example .env
```

This step is necessary to set up the required environment variables for the backend. Make sure to update the values in the newly created .env file according to your configuration needs.

Here are the environment variables you need to configure in the .env file:

`DB_HOST`: The host address of your database server.

`DB_PORT`: The port number on which your database server is running.

`DB_DATABASE`: The name of the database you want to use for CurrencyHub.

`DB_USER`: The username to connect to your database.

`DB_PASSWORD`: The password to connect to your database.

Install the required dependencies:

Work in progress...

## API Reference

#### Get aquariums list

```
  GET /api/aquariums
```

Retrieve the list of aquariums assigned to the user.

Example response

```
[
  {
    "id": "0",
    "name": "Aquarium #0",
    "imgID": "6",
    "fishNumber": 95
  },
  //...
]
```
