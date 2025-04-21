# Database Schema Documentation

This document provides detailed information about the database schema used in the Apartment Listings Platform.

## Overview

The Apartment Listings Platform uses PostgreSQL as its primary database. The schema is designed to support the core functionality of listing and searching for apartments, with related entities such as cities, neighborhoods, publishers, and benefits.

## Entity Relationship Diagram
![Database Schema](.././assets/apartment.png)


## Tables

### city

Stores information about cities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier for the city |
| name | VARCHAR(100) | NOT NULL, UNIQUE | Name of the city |

### neighborhood

Stores information about neighborhoods within cities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier for the neighborhood |
| name | VARCHAR(100) | NOT NULL | Name of the neighborhood |
| city_id | INT | REFERENCES city(id) ON DELETE CASCADE | Foreign key to the city table |

A unique constraint is applied to the combination of `name` and `city_id` to prevent duplicate neighborhoods within the same city.

### publisher

Stores information about property publishers/owners.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier for the publisher |
| name | VARCHAR(100) | NOT NULL | Name of the publisher |
| email | VARCHAR(100) | NOT NULL, UNIQUE | Email address of the publisher |
| phone_number | VARCHAR(20) | | Phone number of the publisher |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When the publisher was created |

### benefit

Stores information about property benefits/amenities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier for the benefit |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Name of the benefit (e.g., Pool, Gym) |

### apartment

Stores information about apartments/properties.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier for the apartment |
| name | VARCHAR(100) | NOT NULL | Name of the apartment |
| owner_company | VARCHAR(100) | NOT NULL | Company that owns the apartment |
| status | apartment_status | NOT NULL | Status of the apartment (rent/sale) |
| type | apartment_type | NOT NULL | Type of the apartment (villa/chalet/apartment) |
| price | DECIMAL(12,2) | NOT NULL | Price of the apartment |
| rooms_count | INT | CHECK (rooms_count >= 0) | Number of rooms |
| bathrooms_count | INT | CHECK (bathrooms_count >= 0) | Number of bathrooms |
| size | DOUBLE PRECISION | CHECK (size > 0) | Size of the apartment in square meters |
| photo_urls | TEXT[] | | Array of photo URLs |
| street_name | VARCHAR(100) | | Street name |
| building_number | VARCHAR(20) | | Building number |
| zip_code | VARCHAR(20) | | ZIP code |
| latitude | DOUBLE PRECISION | | Latitude coordinate |
| longitude | DOUBLE PRECISION | | Longitude coordinate |
| header_description | TEXT | | Short description for headers |
| description | TEXT | | Full description |
| publisher_id | INT | REFERENCES publisher(id) ON DELETE SET NULL | Foreign key to the publisher table |
| city_id | INT | REFERENCES city(id) NOT NULL | Foreign key to the city table |
| neighborhood_id | INT | REFERENCES neighborhood(id) | Foreign key to the neighborhood table |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When the apartment was created |

### apartment_benefit

Junction table for the many-to-many relationship between apartments and benefits.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| apartment_id | INT | REFERENCES apartment(id) ON DELETE CASCADE | Foreign key to the apartment table |
| benefit_id | INT | REFERENCES benefit(id) ON DELETE CASCADE | Foreign key to the benefit table |

The combination of `apartment_id` and `benefit_id` forms the primary key.

## Enums

### apartment_status

Defines the possible statuses for an apartment.

- `rent`: The apartment is available for rent
- `sale`: The apartment is available for sale

### apartment_type

Defines the possible types of properties.

- `villa`: A standalone house
- `chalet`: A holiday home
- `apartment`: A unit in a multi-unit building

## Indexes

The following indexes are created to improve query performance:

- `idx_apartment_city`: Index on `apartment.city_id`
- `idx_apartment_neighborhood`: Index on `apartment.neighborhood_id`
- `idx_apartment_status`: Index on `apartment.status`
- `idx_apartment_type`: Index on `apartment.type`
- `idx_apartment_benefits`: Index on `apartment_benefit.apartment_id`
- `idx_apartment_price`: Index on `apartment.price`

## Relationships

- A city can have many neighborhoods (one-to-many)
- A neighborhood belongs to one city (many-to-one)
- A publisher can have many apartments (one-to-many)
- An apartment belongs to one publisher (many-to-one)
- An apartment belongs to one city (many-to-one)
- An apartment can belong to one neighborhood (many-to-one)
- An apartment can have many benefits (many-to-many through apartment_benefit)
- A benefit can be associated with many apartments (many-to-many through apartment_benefit)

## Data Integrity

- Foreign key constraints ensure referential integrity
- CHECK constraints ensure data validity (e.g., non-negative room counts)
- UNIQUE constraints prevent duplicate entries
- NOT NULL constraints ensure required fields are provided
- ON DELETE CASCADE ensures that when a parent record is deleted, related child records are also deleted
- ON DELETE SET NULL allows for soft deletion of publishers while preserving apartment records
