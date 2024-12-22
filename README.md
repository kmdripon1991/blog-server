# Blog Project

## Overview

This project is a backend system for a blogging platform with two user roles: **Admin** and **User**. The system enables users to perform CRUD operations on blogs and provides admins with special permissions for managing users and their blogs. The platform features secure authentication, role-based access control, and a public API for searching, sorting, and filtering blogs.

This guide provides the steps to set up a Node.js project with TypeScript, MongoDB, ESLint, Prettier, and VSCode configurations for efficient development.

---

## Technologies Used

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose

---

## User

In the user module, interface, model, route, controller and service files have been created. The user routes have been declared in the user route. The controller has been called from the router file. Again, the controller file calls the service file. The user registration and login work has been completed in the service file. The `zod validation` is used for user model data validation

Register User API:.............
Login User API:................

---

## Blog

In the blog module, interface, model, route, controller, service, constant files have been created. The blog routes have been declared in the blog route. The controller has been called from the router file. Again, the controller file calls the service file. The user registration and login work has been completed in the service file. The `zod validation` is used for user model data validation

Create Blog API:.........................
Update Blog API:.........................
Delete Blog API:............................
Get All Blogs API:.........................

---

## Admin Action

In the admin module, admin route, controller and service file have been created. Admin action tasks have been completed from the service file.

[User Block by Admin](https://www.google.com) - https://www.google.com

Only an Admin can block a user by updating the user field `isBlocked` property `true`.

[Any Blogs can be deleted Admin](https://www.google.com) - https://www.google.com

Only an Admin can block a user by updating the user field `isBlocked` property `true`.

---

## Features and Requirements

### 1. User Roles

#### Admin

- Created manually in the database with predefined credentials.
- Permissions:
  - **Delete any blog.**
  - **Block any user** by setting the `isBlocked` flag.
- Cannot update blogs.

#### User

- Can **register** and **log in**.
- Permissions:
  - **Create blogs** (only when logged in).
  - **Update and delete their own blogs.**
- Cannot perform admin actions.

---

### 2. Authentication and Authorization

- **Authentication:** Users must log in to perform write, update, and delete operations.
- **Authorization:** Differentiated roles (Admin/User) with secure permissions.

---

### 3. Blog API

#### Public API for Reading Blogs

- Includes blog title, content, and author name.
- Features:
  - **Search**: Search by blog title or content.
  - **Sort**: Sort blogs by fields such as `createdAt` or `title`.
  - **Filter**: Filter blogs by author ID.

---

## Models

### User Model

| Field       | Type      | Description                                                 |
| ----------- | --------- | ----------------------------------------------------------- |
| `name`      | `string`  | Full name of the user.                                      |
| `email`     | `string`  | Email address for authentication.                           |
| `password`  | `string`  | Securely stored password.                                   |
| `role`      | `string`  | Role of the user: `"admin"` or `"user"`. Default: `"user"`. |
| `isBlocked` | `boolean` | Indicates whether the user is blocked. Default: `false`.    |
| `createdAt` | `Date`    | Timestamp when the user was created.                        |
| `updatedAt` | `Date`    | Timestamp of the last update.                               |

### Blog Model

| Field         | Type       | Description                                               |
| ------------- | ---------- | --------------------------------------------------------- |
| `title`       | `string`   | Title of the blog post.                                   |
| `content`     | `string`   | Main body/content of the blog post.                       |
| `author`      | `ObjectId` | Reference to the User model.                              |
| `isPublished` | `boolean`  | Indicates whether the blog is published. Default: `true`. |
| `createdAt`   | `Date`     | Timestamp when the blog was created.                      |
| `updatedAt`   | `Date`     | Timestamp of the last update.                             |

---

## API Endpoints

### 1. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

Registers a new user.

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### 1.2 Login User

**Endpoint:**  
`POST /api/auth/login`

**Description:**  
Authenticates a user with their email and password and generates a JWT token.

---

#### **Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

# Blog Management System

## 2. Blog Management

### 2.1 Create Blog

**Endpoint:**  
`POST /api/blogs`

**Description:**  
Allows a logged-in user to create a blog.

---

### 2.2 Update Blog

**Endpoint:**  
`PATCH /api/blogs/:id`

**Description:**  
Allows a logged-in user to update their own blog.

---

### 2.3 Delete Blog

**Endpoint:**  
`DELETE /api/blogs/:id`

**Description:**  
Allows a logged-in user to delete their own blog.

---

### 2.4 Get All Blogs (Public)

**Endpoint:**  
`GET /api/blogs`

**Description:**  
Fetches all blogs with options for:

- **Search:** Search by `title` or `content`.
- **Sort:** Sort by specific fields like `createdAt`.
- **Filter:** Filter by `author ID`.

---

## 3. Admin Actions

### 3.1 Block User

**Endpoint:**  
`PATCH /api/admin/users/:userId/block`

**Description:**  
Allows an admin to block a user.

---

### 3.2 Delete Blog

**Endpoint:**  
`DELETE /api/admin/blogs/:id`

**Description:**  
Allows an admin to delete any blog.

---

## 4. Error Handling

Consistent error responses ensure meaningful feedback to users. The following error types are managed:

- **Zod Validation Error:** Invalid data inputs based on Zod schemas.
- **Not Found Error:** Requested resources not found.
- **Validation Error:** General validation issues.
- **Authentication Error:** Failed login or invalid token.
- **Authorization Error:** Insufficient permissions.
- **Internal Server Error:** Unhandled or unexpected server issues.

**Error Response Format:**

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional details" },
  "stack": "Error stack trace (if available)"
}
```
