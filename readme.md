# Product Management API

This is a simple API for managing products and product categories built using Node.js, Express, and Sequelize.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MySQL](https://www.mysql.com/) or any other relational database supported by Sequelize

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/product-management-api.git

## nstall dependencies:
	cd product-management-api
	npm install
## Usage

## User Schema 
{
	"username":"rahul",
	"email":"rahul@gmail.com",
	"password":"rahul"
}

### Authentication
 - All routes except for the POST /auth/register and POST /auth/login routes are protected and require authentication. You need to include a valid JSON Web Token (JWT) in the Authorization header of your requests.

 # Endpoints
 - POST /auth/register: Register a new user.
 - POST /auth/login: Log in and receive a JWT.
 - POST /products/create: Add a new product (Protected Route).
 - GET /products: Get all products.
 - GET /products/:id: Get product by ID.
 - PUT /products/:id: Update product by ID (Protected Route).
 - DELETE /products/:id: Delete product by ID (Protected Route).
 - GET /products/category/:categoryId: Get products by category.
 - GET /products/name/:productName: Get products by name.