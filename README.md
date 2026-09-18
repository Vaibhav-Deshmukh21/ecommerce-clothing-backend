# Clothing E-Commerce Backend

A RESTful backend API for a clothing e-commerce application built with Node.js, Express.js, and MongoDB.

## 🚀 Features

* User registration and login
* JWT-based authentication
* Role-based authorization
* User profile management
* Category and subcategory management
* Product management
* Product image upload
* Product search and filtering
* Pagination and sorting
* Admin management
* Order management
* Contact API
* Input validation and error handling
* Soft delete for applicable resources

## 🛠️ Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* ImageKit
* Nodemailer

## 📁 Project Structure

```text
Backend/
├── config/
├── controller/
├── middleware/
├── model/
├── routes/
├── utils/
├── uploads/
├── .env
├── app.js
├── package.json
└── server.js
```

## 🔐 Authentication

The API uses JWT-based authentication.

Protected routes require a valid access token.

Example:

```http
Authorization: Bearer <access_token>
```

## 📌 API Modules

### User

* Register
* Login
* Verify OTP
* Resend OTP
* Get current user
* Update profile
* Change password
* Forgot password
* Reset password
* Logout
* Delete account

### Products

* Create product
* Get all products
* Get product by ID
* Update product
* Delete product
* Search products
* Filter products
* Pagination and sorting

### Categories

* Create category
* Get categories
* Get category by ID
* Update category
* Delete category

### Admin

* Create admin
* Get users
* Delete user
* Admin authorization

### Orders

* Create and manage orders
* Order status management

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate to the project:

```bash
cd clothing-ecommerce-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add your environment variables.

Start the development server:

```bash
npm run dev
```

The API will run locally on:

```text
http://localhost:3000
```

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASSWORD=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

**Do not commit your `.env` file to GitHub.**

## 🧪 API Testing

The APIs can be tested using **Postman**.

Main API groups:

```text
/api
├── User
├── Product
├── Category
├── Admin
└── Order
```

## 📚 Learning Purpose

This project was developed to practice and understand production-oriented backend concepts such as:

* REST API development
* Authentication and authorization
* MongoDB relationships and references
* Middleware
* File uploads
* Pagination
* Search and filtering
* Role-based access control
* API testing

## 👨‍💻 Author

Vaibhav Deshmukh

Backend Developer Intern | Node.js | Express.js | MongoDB

## 📄 License

This project is for learning and portfolio purposes.
