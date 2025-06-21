## 📌 `POST /user/register`

### 🧾 **Description**
This endpoint registers a new user into the system. It expects the user's full name, email, and password. On successful registration, it returns the created user data and a JWT token for authentication.

---

### 📤 **Request Body**

Send the following JSON in the request body:

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

| Field        | Type     | Required | Description                    |
|--------------|----------|----------|--------------------------------|
| `fullname`   | Object   | ✅ Yes   | Object containing first and last name |
| `firstname`  | String   | ✅ Yes   | First name of the user (min 3 characters) |
| `lastname`   | String   | ❌ No    | Last name of the user (optional, but min 3 chars if given) |
| `email`      | String   | ✅ Yes   | Unique email for login         |
| `password`   | String   | ✅ Yes   | Password (min 6 characters)    |

---

### ✅ **Success Response**

```json
Status: 201 Created
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
  "password":"hashedpassword"
  "token": "JWT_TOKEN_HERE"
}
```

---

### ❌ **Error Responses**

| Status Code | Reason                                      |
|-------------|---------------------------------------------|
| `400`       | Email already registered                    |
| `422`       | Validation failed (missing or invalid fields) |
| `500`       | Server error / database failure             |

#### Example: Email already exists
```json
Status: 400 Bad Request
{
  "success": false,
  "message": "Email already registered"
}
```

#### Example: Validation error
```json
Status: 422 Unprocessable Entity
{
  "message": "Validation failed. Please check your inputs.",
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### 🔐 **Auth Required**
❌ No — this endpoint is **public** (used for signing up)
