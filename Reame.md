# Steps to run this Project

## Install Dependencies

Run the following command to install all the necessary packages:

```bash
npm install


Create a .env file in the root directory of the project and add the following variables

DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret_key
PORT=4000



# To create the necessary database tables, run

npx prisma migrate dev --name init


# Start the Server

To start the server in development mode, use: npm run dev




# Testing API Endpoints

This document outlines the steps to test the API endpoints of the Instahyre Full Stack Task using Postman.

## Base URL

The base URL for the API is: `http://localhost:4000/api`


## Endpoints

### 1. Register a New User

- **Endpoint**: `http://localhost:4000/api/register`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "name": "John Doe",
        "phone": "+1234567890",
        "email": "johndoe@example.com",
        "password": "password123"
    }
    ```
- **Expected Response**:
    - **Status**: `201 Created`
    - **Response Body**:
        ```json
        {
            "id": 1,
            "name": "John Doe",
            "phone": "+1234567890",
            "email": "johndoe@example.com",
            "createdAt": "2023-01-01T00:00:00.000Z"
        }
        ```

### 2. Login to Get JWT Token

- **Endpoint**: `/api/login`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "phone": "+1234567890",
        "password": "password123"
    }
    ```
- **Expected Response**:
    - **Status**: `200 OK`
    - **Response Body**:
        ```json
        {
            "token": "your_jwt_token_here"
        }
        ```

### 3. Add a Contact

- **Endpoint**: `/api/contacts`
- **Method**: `POST`
- **Authorization**: Bearer Token (from login response)
- **Request Body**:
    ```json
    {
        "name": "Jane Smith",
        "phone": "+0987654321",
        "isSpam": false
    }
    ```
- **Expected Response**:
    - **Status**: `201 Created`
    - **Response Body**:
        ```json
        {
            "id": 1,
            "userId": 1,
            "name": "Jane Smith",
            "phone": "+0987654321",
            "isSpam": false
        }
        ```

### 4. Mark a Number as Spam

- **Endpoint**: `/api/spam`
- **Method**: `POST`
- **Authorization**: Bearer Token (from login response)
- **Request Body**:
    ```json
    {
        "phone": "+0987654321"
    }
    ```
- **Expected Response**:
    - **Status**: `200 OK`
    - **Response Body**:
        ```json
        {
            "message": "Spam marked successfully"
        }
        ```

### 5. Search Contacts by Name

- **Endpoint**: `/api/search/name`
- **Method**: `GET`
- **Authorization**: Bearer Token (from login response)
- **Query Parameters**:
    - `query`: Name to search for (e.g., `Jane`)
- **Expected Response**:
    - **Status**: `200 OK`
    - **Response Body**:
        ```json
        [
            {
                "id": 1,
                "userId": 1,
                "name": "Jane Smith",
                "phone": "+0987654321",
                "isSpam": false
            }
        ]
        ```

### 6. Search Contacts by Phone Number

- **Endpoint**: `/api/search/phone`
- **Method**: `GET`
- **Authorization**: Bearer Token (from login response)
- **Query Parameters**:
    - `phone`: Phone number to search for (e.g., `+0987654321`)
- **Expected Response**:
    - **Status**: `200 OK`
    - **Response Body**:
        ```json
        [
            {
                "id": 1,
                "userId": 1,
                "name": "Jane Smith",
                "phone": "+0987654321",
                "isSpam": false
            }
        ]
        ```


## Conclusion

This document serves as a guide to test all the available API endpoints for the Instahyre Full Stack Developer Task - Siddharth Harsh Raj