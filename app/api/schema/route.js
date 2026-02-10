export default function SchemaRoute() {
  return Response.json({
    collections: {
      users: {
        fields: ["_id", "name", "email", "role", "status", "passwordHash"]
      },
      tasks: {
        fields: ["_id", "title", "assigneeId", "projectId", "status", "dueDate"]
      },
      projects: {
        fields: ["_id", "name", "ownerId", "status", "timeline"]
      },
      attendance: {
        fields: ["_id", "userId", "date", "checkIn", "checkOut", "status"]
      },
      announcements: {
        fields: ["_id", "title", "body", "createdBy", "createdAt"]
      }
    }
  });
}
