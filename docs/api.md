# 📡 Dayly API Reference

## Base URL
```
https://YOUR_PROJECT.firebaseapp.com/api/v1
```

## Authentication
Tutti gli endpoint richiedono un Firebase Auth token nell'header:
```
Authorization: Bearer {idToken}
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "displayName": "John Doe"
}

Response: 200 OK
{
  "uid": "user_id",
  "email": "user@example.com",
  "displayName": "John Doe",
  "token": "id_token"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

Response: 200 OK
{
  "uid": "user_id",
  "email": "user@example.com",
  "displayName": "John Doe",
  "token": "id_token"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {idToken}

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

### Refresh Token
```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "refresh_token"
}

Response: 200 OK
{
  "token": "new_id_token"
}
```

---

## 📋 Tasks Endpoints

### Get All Tasks
```http
GET /tasks
Authorization: Bearer {idToken}

Query Parameters:
- filter: "all" | "today" | "upcoming" | "completed"
- category: "work" | "health" | "personal" | "errands" | "deadline"
- priority: "low" | "medium" | "high"
- sort: "dueDate" | "priority" | "created"

Response: 200 OK
{
  "data": [
    {
      "id": "task_123",
      "title": "Comprare latte",
      "description": "Latte scremato 1L",
      "category": "errands",
      "priority": "high",
      "dueDate": "2024-01-15T10:00:00Z",
      "completed": false,
      "recurring": {
        "enabled": false
      },
      "tags": ["shopping"],
      "createdAt": "2024-01-10T08:00:00Z",
      "updatedAt": "2024-01-10T08:00:00Z"
    }
  ],
  "count": 1
}
```

### Get Single Task
```http
GET /tasks/{taskId}
Authorization: Bearer {idToken}

Response: 200 OK
{
  "id": "task_123",
  "title": "Comprare latte",
  "description": "Latte scremato 1L",
  "category": "errands",
  "priority": "high",
  "dueDate": "2024-01-15T10:00:00Z",
  "completed": false,
  "recurring": {
    "enabled": false
  },
  "tags": ["shopping"],
  "createdAt": "2024-01-10T08:00:00Z",
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

### Create Task
```http
POST /tasks
Authorization: Bearer {idToken}
Content-Type: application/json

{
  "title": "Comprare latte",
  "description": "Latte scremato 1L",
  "category": "errands",
  "priority": "high",
  "dueDate": "2024-01-15T10:00:00Z",
  "tags": ["shopping"],
  "recurring": {
    "enabled": false
  }
}

Response: 201 Created
{
  "id": "task_123",
  "title": "Comprare latte",
  "description": "Latte scremato 1L",
  "category": "errands",
  "priority": "high",
  "dueDate": "2024-01-15T10:00:00Z",
  "completed": false,
  "tags": ["shopping"],
  "createdAt": "2024-01-10T08:00:00Z",
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

### Update Task
```http
PATCH /tasks/{taskId}
Authorization: Bearer {idToken}
Content-Type: application/json

{
  "title": "Comprare latte e burro",
  "priority": "medium",
  "dueDate": "2024-01-16T10:00:00Z"
}

Response: 200 OK
{
  "id": "task_123",
  "title": "Comprare latte e burro",
  "description": "Latte scremato 1L",
  "category": "errands",
  "priority": "medium",
  "dueDate": "2024-01-16T10:00:00Z",
  "completed": false,
  "tags": ["shopping"],
  "updatedAt": "2024-01-10T09:00:00Z"
}
```

### Complete Task
```http
POST /tasks/{taskId}/complete
Authorization: Bearer {idToken}

Response: 200 OK
{
  "id": "task_123",
  "title": "Comprare latte",
  "completed": true,
  "completedAt": "2024-01-10T09:15:00Z",
  "updatedAt": "2024-01-10T09:15:00Z"
}
```

### Delete Task
```http
DELETE /tasks/{taskId}
Authorization: Bearer {idToken}

Response: 204 No Content
```

---

## 🧠 Reminders Endpoints

### Get All Reminders
```http
GET /reminders
Authorization: Bearer {idToken}

Query Parameters:
- type: "note" | "money" | "document" | "subscription"
- priority: "low" | "medium" | "high" | "urgent"
- sort: "dueDate" | "priority" | "created"

Response: 200 OK
{
  "data": [
    {
      "id": "reminder_456",
      "title": "Prestito a Marco",
      "content": "Ho prestato 20€ a Marco il 10/01",
      "type": "money",
      "dueDate": "2024-01-20T00:00:00Z",
      "priority": "medium",
      "category": "finance",
      "notified": false,
      "createdAt": "2024-01-10T08:00:00Z",
      "updatedAt": "2024-01-10T08:00:00Z"
    }
  ],
  "count": 1
}
```

### Create Reminder
```http
POST /reminders
Authorization: Bearer {idToken}
Content-Type: application/json

{
  "title": "Prestito a Marco",
  "content": "Ho prestato 20€ a Marco il 10/01",
  "type": "money",
  "priority": "medium",
  "dueDate": "2024-01-20T00:00:00Z",
  "category": "finance"
}

Response: 201 Created
{
  "id": "reminder_456",
  "title": "Prestito a Marco",
  "content": "Ho prestato 20€ a Marco il 10/01",
  "type": "money",
  "priority": "medium",
  "dueDate": "2024-01-20T00:00:00Z",
  "category": "finance",
  "notified": false,
  "createdAt": "2024-01-10T08:00:00Z",
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

### Update Reminder
```http
PATCH /reminders/{reminderId}
Authorization: Bearer {idToken}
Content-Type: application/json

{
  "content": "Ho prestato 20€ a Marco il 10/01 - scadenza 31/01",
  "priority": "high"
}

Response: 200 OK
```

### Delete Reminder
```http
DELETE /reminders/{reminderId}
Authorization: Bearer {idToken}

Response: 204 No Content
```

---

## 📅 Appointments Endpoints

### Get All Appointments
```http
GET /appointments
Authorization: Bearer {idToken}

Query Parameters:
- month: "2024-01"
- category: string

Response: 200 OK
{
  "data": [
    {
      "id": "appt_789",
      "title": "Visita dentista",
      "description": "Detartasi + controllo",
      "date": "2024-01-15",
      "startTime": "10:30",
      "endTime": "11:00",
      "location": "Studio Dr. Rossi",
      "attendees": [],
      "category": "health",
      "color": "#FF6B6B",
      "reminder": {
        "enabled": true,
        "minutesBefore": 30
      },
      "createdAt": "2024-01-10T08:00:00Z"
    }
  ],
  "count": 1
}
```

### Create Appointment
```http
POST /appointments
Authorization: Bearer {idToken}
Content-Type: application/json

{
  "title": "Visita dentista",
  "description": "Detartasi + controllo",
  "date": "2024-01-15",
  "startTime": "10:30",
  "endTime": "11:00",
  "location": "Studio Dr. Rossi",
  "category": "health",
  "color": "#FF6B6B",
  "reminder": {
    "enabled": true,
    "minutesBefore": 30
  }
}

Response: 201 Created
```

### Update Appointment
```http
PATCH /appointments/{appointmentId}
Authorization: Bearer {idToken}
Content-Type: application/json

{
  "startTime": "11:00",
  "endTime": "11:30"
}

Response: 200 OK
```

### Delete Appointment
```http
DELETE /appointments/{appointmentId}
Authorization: Bearer {idToken}

Response: 204 No Content
```

---

## 📝 Notes Endpoints

### Get All Notes
```http
GET /notes
Authorization: Bearer {idToken}

Query Parameters:
- search: string
- tag: string
- sort: "created" | "updated"

Response: 200 OK
{
  "data": [
    {
      "id": "note_101",
      "title": "Cose da fare domani",
      "content": "- Comprare pane\n- Telefonare a mamma\n- Pagare bolletta",
      "tags": ["importante"],
      "pinned": true,
      "color": "#FFF59D",
      "createdAt": "2024-01-10T08:00:00Z",
      "updatedAt": "2024-01-10T08:00:00Z"
    }
  ],
  "count": 1
}
```

### Create Note
```http
POST /notes
Authorization: Bearer {idToken}
Content-Type: application/json

{
  "title": "Cose da fare domani",
  "content": "- Comprare pane\n- Telefonare a mamma",
  "tags": ["importante"],
  "color": "#FFF59D"
}

Response: 201 Created
```

### Update Note
```http
PATCH /notes/{noteId}
Authorization: Bearer {idToken}
Content-Type: application/json

{
  "content": "- Comprare pane\n- Telefonare a mamma\n- Pagare bolletta",
  "pinned": true
}

Response: 200 OK
```

### Delete Note
```http
DELETE /notes/{noteId}
Authorization: Bearer {idToken}

Response: 204 No Content
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Missing required field: title"
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHENTICATED",
    "message": "Invalid or missing authentication token"
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "You do not have permission to access this resource"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Rate Limiting

- **Limit**: 100 requests per minute per user
- **Header**: `X-RateLimit-Remaining`
- **Reset**: `X-RateLimit-Reset`

```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705000000
```

---

## Pagination

Endpoints che supportano paginazione:

```
GET /tasks?page=1&limit=20
```

Response include:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

---

## WebSocket (Real-time Updates)

Connessione per aggiornamenti real-time:

```javascript
const ws = new WebSocket('wss://YOUR_PROJECT.firebaseapp.com/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    resource: 'tasks',
    token: idToken
  }));
};

ws.onmessage = (event) => {
  const { type, data } = JSON.parse(event.data);
  // type: "task_created", "task_updated", "task_deleted"
  console.log(type, data);
};
```

---

## SDK Usage Examples

### JavaScript/TypeScript
```javascript
import { getDaylyAPI } from '@dayly/shared';

const api = getDaylyAPI(idToken);

// Create task
const task = await api.tasks.create({
  title: 'Comprare latte',
  category: 'errands',
  priority: 'high'
});

// Get tasks
const tasks = await api.tasks.list({ filter: 'today' });

// Update task
await api.tasks.update(task.id, { completed: true });
```

### React Hook
```javascript
import { useTasksAPI } from '@dayly/shared';

function TaskList() {
  const { tasks, loading, error, createTask, updateTask } = useTasksAPI();
  
  return (
    // JSX
  );
}
```
