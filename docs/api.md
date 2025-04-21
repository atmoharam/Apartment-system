# API Documentation

This document provides detailed information about the API endpoints available in the Apartment Listings Platform.

## Base URL

The base URL for all API endpoints is:

```
http://localhost:4000/api
```

## Authentication

Currently, the API does not require authentication. This will be implemented in future versions.

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK` - The request was successful
- `201 Created` - The resource was successfully created
- `400 Bad Request` - The request was invalid
- `404 Not Found` - The requested resource was not found
- `500 Internal Server Error` - An error occurred on the server

Error responses include a JSON object with an `error` property containing a message:

```json
{
  "error": "Error message"
}
```

## Endpoints

### Apartments

#### Get All Apartments

```
GET /apartments
```

Returns a list of all apartments.

**Query Parameters:**

- `status` (optional) - Filter by apartment status (rent/sale)
- `type` (optional) - Filter by apartment type (villa/chalet/apartment)
- `city_id` (optional) - Filter by city ID
- `neighborhood_id` (optional) - Filter by neighborhood ID
- `min_price` (optional) - Filter by minimum price
- `max_price` (optional) - Filter by maximum price
- `min_rooms` (optional) - Filter by minimum number of rooms
- `min_bathrooms` (optional) - Filter by minimum number of bathrooms
- `min_size` (optional) - Filter by minimum size

**Response:**

```json
[
  {
    "id": 1,
    "name": "Luxury Apartment",
    "owner_company": "Premium Developers",
    "status": "sale",
    "type": "apartment",
    "price": 2500000,
    "rooms_count": 4,
    "bathrooms_count": 3,
    "size": 200,
    "photo_urls": ["url1", "url2"],
    "street_name": "Main Street",
    "building_number": "123",
    "zip_code": "12345",
    "latitude": 1.23456,
    "longitude": 2.34567,
    "header_description": "Beautiful apartment",
    "description": "A beautiful apartment in the city center",
    "publisher_id": 1,
    "city_id": 1,
    "neighborhood_id": 1,
    "created_at": "2023-01-01T00:00:00.000Z"
  }
]
```

#### Get Apartment by ID

```
GET /apartments/:id
```

Returns a single apartment by ID.

**Parameters:**

- `id` - The ID of the apartment

**Response:**

```json
{
  "id": 1,
  "name": "Luxury Apartment",
  "owner_company": "Premium Developers",
  "status": "sale",
  "type": "apartment",
  "price": 2500000,
  "rooms_count": 4,
  "bathrooms_count": 3,
  "size": 200,
  "photo_urls": ["url1", "url2"],
  "street_name": "Main Street",
  "building_number": "123",
  "zip_code": "12345",
  "latitude": 1.23456,
  "longitude": 2.34567,
  "header_description": "Beautiful apartment",
  "description": "A beautiful apartment in the city center",
  "publisher_id": 1,
  "city_id": 1,
  "neighborhood_id": 1,
  "created_at": "2023-01-01T00:00:00.000Z",
  "benefits": [
    {
      "id": 1,
      "name": "Pool"
    },
    {
      "id": 2,
      "name": "Gym"
    }
  ]
}
```

#### Create Apartment

```
POST /apartments
```

Creates a new apartment.

**Request Body:**

```json
{
  "name": "Luxury Apartment",
  "owner_company": "Premium Developers",
  "status": "sale",
  "type": "apartment",
  "price": 2500000,
  "rooms_count": 4,
  "bathrooms_count": 3,
  "size": 200,
  "photo_urls": ["url1", "url2"],
  "street_name": "Main Street",
  "building_number": "123",
  "zip_code": "12345",
  "latitude": 1.23456,
  "longitude": 2.34567,
  "header_description": "Beautiful apartment",
  "description": "A beautiful apartment in the city center",
  "publisher_id": 1,
  "city_id": 1,
  "neighborhood_id": 1,
  "benefit_ids": [1, 2]
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Luxury Apartment",
  "owner_company": "Premium Developers",
  "status": "sale",
  "type": "apartment",
  "price": 2500000,
  "rooms_count": 4,
  "bathrooms_count": 3,
  "size": 200,
  "photo_urls": ["url1", "url2"],
  "street_name": "Main Street",
  "building_number": "123",
  "zip_code": "12345",
  "latitude": 1.23456,
  "longitude": 2.34567,
  "header_description": "Beautiful apartment",
  "description": "A beautiful apartment in the city center",
  "publisher_id": 1,
  "city_id": 1,
  "neighborhood_id": 1,
  "created_at": "2023-01-01T00:00:00.000Z"
}
```

### Benefits

#### Get All Benefits

```
GET /benefits
```

Returns a list of all benefits.

**Response:**

```json
[
  {
    "id": 1,
    "name": "Pool"
  },
  {
    "id": 2,
    "name": "Gym"
  }
]
```

#### Get Benefit by ID

```
GET /benefits/:id
```

Returns a single benefit by ID.

**Parameters:**

- `id` - The ID of the benefit

**Response:**

```json
{
  "id": 1,
  "name": "Pool"
}
```

### Cities

#### Get All Cities

```
GET /cities
```

Returns a list of all cities.

**Response:**

```json
[
  {
    "id": 1,
    "name": "Cairo"
  },
  {
    "id": 2,
    "name": "Alexandria"
  }
]
```

#### Get City by ID

```
GET /cities/:id
```

Returns a single city by ID.

**Parameters:**

- `id` - The ID of the city

**Response:**

```json
{
  "id": 1,
  "name": "Cairo"
}
```

### Neighborhoods

#### Get All Neighborhoods

```
GET /neighborhoods
```

Returns a list of all neighborhoods.

**Query Parameters:**

- `city_id` (optional) - Filter by city ID

**Response:**

```json
[
  {
    "id": 1,
    "name": "Downtown",
    "city_id": 1
  },
  {
    "id": 2,
    "name": "Uptown",
    "city_id": 1
  }
]
```

#### Get Neighborhood by ID

```
GET /neighborhoods/:id
```

Returns a single neighborhood by ID.

**Parameters:**

- `id` - The ID of the neighborhood

**Response:**

```json
{
  "id": 1,
  "name": "Downtown",
  "city_id": 1
}
```

#### Create Neighborhood

```
POST /neighborhoods
```

Creates a new neighborhood.

**Request Body:**

```json
{
  "name": "Downtown",
  "city_id": 1
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Downtown",
  "city_id": 1
}
```

#### Update Neighborhood

```
PUT /neighborhoods/:id
```

Updates an existing neighborhood.

**Parameters:**

- `id` - The ID of the neighborhood

**Request Body:**

```json
{
  "name": "New Downtown",
  "city_id": 1
}
```

**Response:**

```json
{
  "id": 1,
  "name": "New Downtown",
  "city_id": 1
}
```

#### Delete Neighborhood

```
DELETE /neighborhoods/:id
```

Deletes a neighborhood.

**Parameters:**

- `id` - The ID of the neighborhood

**Response:**

```
204 No Content
```

### Publishers

#### Get All Publishers

```
GET /publishers
```

Returns a list of all publishers.

**Response:**

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone_number": "123456789",
    "created_at": "2023-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone_number": "987654321",
    "created_at": "2023-01-02T00:00:00.000Z"
  }
]
```

#### Get Publisher by ID

```
GET /publishers/:id
```

Returns a single publisher by ID.

**Parameters:**

- `id` - The ID of the publisher

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone_number": "123456789",
  "created_at": "2023-01-01T00:00:00.000Z"
}
```

#### Create Publisher

```
POST /publishers
```

Creates a new publisher.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone_number": "123456789"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone_number": "123456789",
  "created_at": "2023-01-01T00:00:00.000Z"
}
```

#### Update Publisher

```
PUT /publishers/:id
```

Updates an existing publisher.

**Parameters:**

- `id` - The ID of the publisher

**Request Body:**

```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone_number": "123456789"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone_number": "123456789",
  "created_at": "2023-01-01T00:00:00.000Z"
}
```

## Postman Collection

A complete Postman collection is available for testing the API:

[View API Docs](https://documenter.getpostman.com/view/22778824/2sB2cYdLpw)