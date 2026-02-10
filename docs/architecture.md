# GROFAST DIGITAL - Architecture Notes

## UI Structure
- `/` marketing + CTA
- `/login` authentication screen
- `/admin` admin dashboard shell
- `/member` team member dashboard shell

## Components
- `Shell`: shared layout with sidebar navigation and top actions
- `ThemeToggle`: light/dark mode stored in `localStorage`

## Database Schema (MongoDB or PostgreSQL)
- Users: id, name, email, role, status, passwordHash
- Tasks: id, title, assigneeId, projectId, status, dueDate
- Projects: id, name, ownerId, status, timeline
- Attendance: id, userId, date, checkIn, checkOut, status
- LeaveRequests: id, userId, dateRange, reason, status
- Announcements: id, title, body, createdBy, createdAt
- ActivityLogs: id, userId, action, createdAt

## API Routes
- `POST /api/auth/login` -> JWT
- `POST /api/auth/logout`
- `GET /api/users` (admin)
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/attendance`
- `POST /api/attendance/check-in`
- `POST /api/attendance/check-out`
- `POST /api/leave-requests`
- `PUT /api/leave-requests/:id`
- `GET /api/announcements`
- `POST /api/announcements`
- `GET /api/activity-logs`
- `GET /api/reports/export?format=pdf|excel`

## Deployment Guidance
- Frontend: Vercel or Netlify
- Backend: Render / Railway / Fly.io
- Database: MongoDB Atlas or Supabase Postgres
- Use environment variables for JWT secret, database URL, and file storage keys.

## Real-time Add-ons
- Notifications: Pusher / Ably / Socket.io
- Task reminders: background job runner + cron
