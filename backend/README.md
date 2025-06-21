# 🚗 UberClone Backend API Documentation

## User Endpoints

---

### 1. `POST /user/register`

**Description:**  
Registers a new user. Returns user info and JWT token.

**Auth Required:** No

#### Request Body

```json
{
  "fullname": {
    "firstname": "firstname",
    "lastname": "lastname"
  },
  "email": "email@gmail.com",
  "password": "securePassword123"
}
```

| Field                | Type     | Required | Description                                 |
|----------------------|----------|----------|---------------------------------------------|
| `fullname.firstname` | String   | ✅ Yes   | First name (min 3 characters)               |
| `fullname.lastname`  | String   | ❌ No    | Last name (min 3 characters if provided)    |
| `email`              | String   | ✅ Yes   | Unique email                                |
| `password`           | String   | ✅ Yes   | Password (min 5 characters)                 |

#### Success Response

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "663b567d324561fc57bcd8d1",
      "fullname": {
        "firstname": "firstname",
        "lastname": "lastname"
      },
      "email": "email@gmail.com",
      "createdAt": "2025-06-21T11:45:33.324Z",
      "updatedAt": "2025-06-21T11:45:33.324Z"
    },
    "token": "JWT_TOKEN_HERE"
  }
  ```

#### Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 400    | Email already registered                    |
| 422    | Validation failed (missing/invalid fields)  |
| 500    | Server/database error                       |

---

### 2. `POST /user/login`

**Description:**  
Logs in a user and returns JWT token and user info.

**Auth Required:** No

#### Request Body

```json
{
  "email": "email@gmail.com",
  "password": "securePassword123"
}
```

| Field      | Type   | Required | Description        |
|------------|--------|----------|--------------------|
| `email`    | String | ✅ Yes   | Registered email   |
| `password` | String | ✅ Yes   | User password      |

#### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "JWT_TOKEN_HERE",
    "user": {
      "_id": "663b567d324561fc57bcd8d1",
      "fullname": {
        "firstname": "firstname",
        "lastname": "lastname"
      },
      "email": "email@gmail.com",
      "createdAt": "2025-06-21T11:45:33.324Z",
      "updatedAt": "2025-06-21T11:45:33.324Z"
    }
  }
  ```

#### Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 400    | Invalid email or password                   |
| 422    | Validation failed (missing/invalid fields)  |
| 500    | Server/database error                       |

---

### 3. `GET /user/profile`

**Description:**  
Fetches the profile of the authenticated user.

**Auth Required:** Yes (JWT token in header or cookie)

#### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "663b567d324561fc57bcd8d1",
    "fullname": {
      "firstname": "firstname",
      "lastname": "lastname"
    },
    "email": "email@gmail.com",
    "createdAt": "2025-06-21T11:45:33.324Z",
    "updatedAt": "2025-06-21T11:45:33.324Z"
  }
  ```

#### Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 401    | Unauthorized / Invalid or missing token     |
| 500    | Server error                                |

---

### 4. `POST /user/logout`

**Description:**  
Logs out the current user by blacklisting the JWT token.

**Auth Required:** Yes (JWT token in header or cookie)

#### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "message": "User logged out successfully"
  }
  ```

#### Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 400    | Token missing or invalid                    |
| 401    | Unauthorized / Invalid or missing token     |
| 500    | Server error                                |

---

## Captain Endpoints

---

### 1. `POST /captain/register`

**Description:**  
Registers a new captain (driver). Returns captain info and JWT token.

**Auth Required:** No

#### Request Body

```json
{
  "fullname": {
    "firstname": "firstname",
    "lastname": "lastname"
  },
  "email": "captain@gmail.com",
  "password": "securePassword123",
  "vehicle": {
    "type": "auto",
    "color": "yellow",
    "capacity": 3,
    "plate": "AB12CD3456"
  },
  "status": "active",
  "location": {
    "latitude": 28.7041,
    "longitude": 77.1025
  }
}
```

| Field                  | Type     | Required | Description                                      |
|------------------------|----------|----------|--------------------------------------------------|
| `fullname.firstname`   | String   | ✅ Yes   | First name (min 3 characters)                    |
| `fullname.lastname`    | String   | ❌ No    | Last name (min 3 characters if provided)         |
| `email`                | String   | ✅ Yes   | Unique email                                     |
| `password`             | String   | ✅ Yes   | Password (min 6 characters)                      |
| `vehicle.type`         | String   | ✅ Yes   | Vehicle type: auto, motorcycle, or car           |
| `vehicle.color`        | String   | ❌ No    | Vehicle color                                    |
| `vehicle.capacity`     | Number   | ❌ No    | Vehicle capacity (seats/load)                    |
| `vehicle.plate`        | String   | ❌ No    | Vehicle plate number                             |
| `status`               | String   | ❌ No    | Captain status: active/inactive (default active) |
| `location.latitude`    | Number   | ❌ No    | Current latitude                                 |
| `location.longitude`   | Number   | ❌ No    | Current longitude                                |

#### Success Response

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "message": "Captain registered successfully",
    "captain": {
      "_id": "663b567d324561fc57bcd8d1",
      "fullname": {
        "firstname": "firstname",
        "lastname": "lastname"
      },
      "email": "captain@gmail.com",
      "vehicle": {
        "type": "auto",
        "color": "yellow",
        "capacity": 3,
        "plate": "AB12CD3456"
      },
      "status": "active",
      "location": {
        "latitude": 28.7041,
        "longitude": 77.1025
      },
      "createdAt": "2025-06-21T11:45:33.324Z",
      "updatedAt": "2025-06-21T11:45:33.324Z"
    },
    "token": "JWT_TOKEN_HERE"
  }
  ```

#### Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 400    | Captain already exists                      |
| 422    | Validation failed (missing/invalid fields)  |
| 500    | Server/database error                       |

---

### 2. `POST /captain/login`

**Description:**  
Logs in a captain and returns JWT token and captain info.

**Auth Required:** No

#### Request Body

```json
{
  "email": "captain@gmail.com",
  "password": "securePassword123"
}
```

| Field      | Type   | Required | Description        |
|------------|--------|----------|--------------------|
| `email`    | String | ✅ Yes   | Registered email   |
| `password` | String | ✅ Yes   | Captain password   |

#### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN_HERE",
    "captain": {
      "_id": "663b567d324561fc57bcd8d1",
      "fullname": {
        "firstname": "firstname",
        "lastname": "lastname"
      },
      "email": "captain@gmail.com",
      "vehicle": {
        "type": "auto",
        "color": "yellow",
        "capacity": 3,
        "plate": "AB12CD3456"
      },
      "status": "active",
      "location": {
        "latitude": 28.7041,
        "longitude": 77.1025
      },
      "createdAt": "2025-06-21T11:45:33.324Z",
      "updatedAt": "2025-06-21T11:45:33.324Z"
    }
  }
  ```

#### Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 400    | Invalid email or password                   |
| 422    | Validation failed (missing/invalid fields)  |
| 500    | Server/database error                       |

---

### 3. `GET /captain/profile`

**Description:**  
Fetches the profile of the authenticated captain.

**Auth Required:** Yes (JWT token in header or cookie)

#### Success Response

- **Status:** `200 OK`
- **Body:** Same as captain object in login/register response.

#### Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 401    | Unauthorized / Invalid or missing token     |
| 500    | Server error                                |

---

### 4. `POST /captain/logout`

**Description:**  
Logs out the current captain by blacklisting the JWT token.

**Auth Required:** Yes (JWT token in header or cookie)

#### Success Response

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Captain logged out successfully"
  }
  ```

#### Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 400    | Token missing or invalid                    |
| 401    | Unauthorized / Invalid or missing token     |
| 500    | Server error                                |

---

## Status Codes

- `200 OK` – Request succeeded
- `201 Created` – Resource created successfully
- `400 Bad Request` – Invalid input or credentials
- `401 Unauthorized` – Missing or invalid authentication
- `422 Unprocessable Entity` – Validation failed
- `500 Internal Server Error` – Server/database error

---

## Auth

Endpoints `/user/profile`, `/user/logout`, `/captain/profile`, and `/captain/logout` require a valid JWT token in the `Authorization` header (`Bearer <token>`) or as a cookie named `token`.
