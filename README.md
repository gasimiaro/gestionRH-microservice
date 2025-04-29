# Insurance Microservices

A microservices-based insurance management system using Node.js, TypeScript, Apollo Federation, and SQLite.

## Architecture

This project transforms a monolithic insurance management system into a microservices architecture with:

- **User Service**: Manages user operations (create, update, get users)
- **Insurance Service**: Handles insurance companies and beneficiary registrations
- **Notification Service**: Manages notifications and email sending
- **Gateway**: Composes schemas from all services into a unified GraphQL API

## Setup

1. **Install Dependencies**:
   ```bash
   cd user-service
   npm install
   cd ../insurance-service
   npm install
   cd ../notification-service
   npm install
   cd ../gateway
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` file in the project root:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

3. **Start Services**:
   Open separate terminals and run:
   ```bash
   # Terminal 1
   cd user-service
   npm start
   
   # Terminal 2
   cd insurance-service
   npm start
   
   # Terminal 3
   cd notification-service
   npm start
   
   # Terminal 4
   cd gateway
   npm start
   ```

## Test the Application

Use a GraphQL client (e.g., Apollo Studio) to query the Gateway at http://localhost:4000.

### Example Mutation:

```graphql
mutation {
  registerUser(input: {
    matricule: "USER123"
    name: "John Doe"
    email: "john.doe@example.com"
    cin: "123456789"
    role: "USER"
  }) {
    matricule
    name
    email
    notifications {
      id
      message
      sentAt
    }
  }
}
```

### Example Query:

```graphql
query {
  user(matricule: "USER123") {
    matricule
    name
    notifications {
      id
      message
      sentAt
    }
  }
}
```

## Notes

- Each service uses a separate SQLite database (`database.sqlite`)
- The Gateway composes schemas using Apollo Federation
- Notifications are sent via email using nodemailer with Gmail SMTP
- Ensure your `.env` file has valid Gmail credentials (use an App Password)