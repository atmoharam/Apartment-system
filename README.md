# Apartment Listings Platform - Clean Architecture Implementation

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

[![Node.js](https://img.shields.io/badge/Node.js-18-green)]()
[![Next.js](https://img.shields.io/badge/Next.js-14-blue)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)]()
## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Clean Architecture](#clean-architecture)
4. [Technologies](#technologies)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Screenshots](#screen-shots)
8. [Installation](#installation)
9. [Enhancement](#enhancement)
10. [Future Work](#future-work)

## Overview <a name="overview"></a>
A modern apartment listings platform built with Clean Architecture principles, featuring:

- Next.js frontend
- Node.js backend API
- PostgreSQL database
- Docker containerization

## Features <a name="features"></a>
- Property listing management (CRUD operations)
- Advanced search and filtering
- Multi-step property submission form
- Publisher management system
- Location-based browsing

## Clean Architecture <a name="clean-architecture"></a>
This project follows **Clean Architecture** principles with clear separation of concerns:

1. **Domain Layer** - Contains business entities and logic
2. **Application Layer** - Contains use cases that orchestrate the flow of data
3. **Interface Layer** - Contains controllers and presenters
4. **Frameworks Layer** - Contains database implementations, web frameworks, etc.



Key principles implemented:
- Independent of frameworks
- Testable business rules
- Independent of UI, database, or external agencies
- Dependency Rule: Inner circles can't know about outer circles

## Technologies <a name="technologies"></a>

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form

### Backend
- Node.js 18
- Express
- PostgreSQL

### Infrastructure
- Docker
- Docker Compose
- pm2 to manage applications
- Postman (API testing)

## Database Schema <a name="database-schema"></a>
![Database Schema](./assets/apartment.png)

Key Entities:
- `Apartment` - Core property model
- `Neighborhood` - Location hierarchy
- `Publisher` - Listing owners
- `ApartmentBenefit` - Amenities junction table

## API Documentation <a name="api-documentation"></a>
Complete Postman documentation:  
[View API Docs](https://documenter.getpostman.com/view/22778824/2sB2cYdLpw)

## Screen Shots <a name="screen-shots"></a>
![UI of Home](./assets/Home.PNG)
![UI of Adding Apartment](./assets/Add-new-apartment-1.PNG)
![UI of Adding Apartment](./assets/Add-new-apartment-2.PNG)
![UI of Adding Apartment](./assets/Add-new-apartment-3.PNG)
![UI of Adding Apartment](./assets/Add-new-apartment-4.PNG)
![UI of Apartment Details](./assets/apartment-details.PNG)
## Installation <a name="installation"></a>
```bash
git clone (https://github.com/atmoharam/Apartment-system)
cd Apartment-system
docker-compose up --build
```
## Enhancement <a name="enhancement"></a>
- Pagination: Implement pagination to improve user experience and performance.
- Caching: Use caching mechanisms to reduce server load and speed up response times.

## Future Work <a name="future-work"></a>
- Authentication System: Develop a secure user authentication system.
- Seller Reports: Create reports for sellers to track their apartment listings.
- Real-Time View Counter: Display the number of views for each ad in real-time.
- Ad Posting Limits: Restrict the number of ads a user can post per day to prevent spam.
- IP Limit Filter: Implement IP-based rate limiting to protect against attacks.
