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

#### Get aquarium name and imgID

```
  GET /api/aquariums/{aquariumID}/name
```



Retrieve aquarium name and image ID

Example response

```
{
    "name": "Aquarium #0",
    "imgID": "5"
}
```

#### Get accessories list

```
  GET /api/accessories
```

Retrieve the list of accessories.

Example response

```
{
      heaters: [
        {
          id: "0",
          name: "heater W30 50L",
          maxCapacity: 50,
        },
        //...
      ],
      lamps: [
        {
          id: "0",
          name: "lampoinator 3000",
        },
        //...
      ],
      pumps: [
        {
          id: "0",
          name: "pump 30L",
          maxCapacity: 30,
        },
        //...
      ],
      assets: [
        {
          id: "0",
          name: "small rock",
        },
        //...
      ],
      plants: [
        {
          id: "0",
          name: "red flower",
        },
        //...
      ],
      grounds: [
        {
          id: "0",
          name: "sand",
        },
        //...
      ],
    };
```

#### Create new aquarium

```
  POST /api/aquarium
```

Example body

```
{
  "name": "My aquarium",
  "imgID": "1",
  "width": "50",
  "height": "50",
  "length": "50",
  "heaterID": "2",
  "pumpID": "1",
  "lampID": "1",
  "assetID": "0",
  "plantID": "4",
  "groundID": "4"
}
```

Example response
```
{
    status: "ok"
    aquariumID: "69"
}
```
