# Contributing to Apartment Listings Platform

Thank you for considering contributing to the Apartment Listings Platform! This document provides guidelines and instructions for contributing to this project.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Environment Setup](#development-environment-setup)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/Apartment-system.git`
3. Add the original repository as upstream: `git remote add upstream https://github.com/atmoharam/Apartment-system.git`
4. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`

## Development Environment Setup

1. Install Docker and Docker Compose
2. Run `docker-compose up --build` to start the development environment
3. The frontend will be available at `http://localhost:3000`
4. The backend API will be available at `http://localhost:4000`

## Coding Standards

### Backend (Node.js/TypeScript)
- Follow the TypeScript coding guidelines
- Use meaningful variable and function names
- Write JSDoc comments for functions and classes
- Follow the Clean Architecture principles
- Use dependency injection where appropriate

### Frontend (Next.js/TypeScript)
- Follow the React/Next.js best practices
- Use functional components with hooks
- Use TypeScript for type safety
- Follow the project's component structure
- Use Tailwind CSS for styling

## Commit Guidelines

- Use clear and descriptive commit messages
- Start with a verb in the present tense (e.g., "Add", "Fix", "Update")
- Reference issue numbers when applicable
- Keep commits focused on a single change

Example:
```
Fix: Resolve apartment filtering issue (#123)
```

## Pull Request Process

1. Update your fork with the latest changes from upstream
2. Ensure your code follows the project's coding standards
3. Write tests for your changes
4. Update documentation if necessary
5. Submit a pull request with a clear description of the changes
6. Wait for code review and address any feedback

## Testing

- Write unit tests for domain entities and use cases
- Write integration tests for repositories
- Write API tests for controllers
- Write UI component tests for frontend components
- Ensure all tests pass before submitting a pull request

## Documentation

- Update the README.md if your changes affect the project setup or usage
- Add JSDoc comments to all new functions and classes
- Update or create documentation in the docs directory as needed
- Document API endpoints if you add or modify them
- Add code examples for complex functionality