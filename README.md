GestionRH Microservices
A microservices-based insurance management system using Node.js, TypeScript, Apollo Federation, and PostgreSQL.
Overview
This project transforms a monolithic insurance management system into a microservices architecture. It provides a unified GraphQL API for managing HR-related functionalities, including user management, insurance registration, and notifications. The system leverages Apollo Federation for schema composition, Sequelize for database management, and TypeScript for type safety.
Architecture
The project is structured as a microservices architecture with the following components:

User Service: Manages user operations such as creating, updating, and retrieving users. It handles hierarchical relationships (e.g., advisedBy and advisees) and stores user data in a PostgreSQL database (user_db).
Insurance Service: Handles insurance companies and beneficiary registrations. It allows creating insurance companies and registering beneficiaries, linking them to users. Data is stored in a PostgreSQL database (insurance_db).
Notification Service: Manages notifications and email sending. It sends notifications to users (e.g., when a user’s name is updated) and supports email notifications via Nodemailer using Gmail SMTP. Data is stored in a PostgreSQL database (notification_db).
Gateway: Composes schemas from all services into a unified GraphQL API using Apollo Federation. Currently, all services are combined in a single server, but the architecture is designed to be split into separate services in the future.

Technology Stack

Node.js: Runtime environment (v20.19.0).
TypeScript: For type safety and better developer experience.
Apollo Federation: Composes multiple GraphQL schemas into a single API.
Sequelize: ORM for PostgreSQL database management.
PostgreSQL: Database for storing user, insurance, and notification data.
Nodemailer: For sending email notifications via Gmail SMTP.
GraphQL: API query language for interacting with the services.

Prerequisites

Node.js (v20.19.0 or higher)
PostgreSQL (running on localhost:5432 or configured accordingly)
npm (v10.x or higher)
A Gmail account with an App Password for email notifications (see Google App Passwords for setup)

Setup

Clone the repository:
git clone https://github.com/<ton-utilisateur>/gestionRH-microservice.git
cd gestionRH-microservice


Install Dependencies:
npm install


Configure Environment:Copy the .env.example file to .env and fill in the required values:
cp .env.example .env

Update .env with your database credentials and email settings. Example .env:
# Database configuration for User service
USER_DB_HOST=localhost
USER_DB_PORT=5432
USER_DB_NAME=user_db
USER_DB_USER=postgres
USER_DB_PASSWORD=your_password_here

# Database configuration for Insurance service
INSURANCE_DB_HOST=localhost
INSURANCE_DB_PORT=5432
INSURANCE_DB_NAME=insurance_db
INSURANCE_DB_USER=postgres
INSURANCE_DB_PASSWORD=your_password_here

# Database configuration for Notification service
NOTIFICATION_DB_HOST=localhost
NOTIFICATION_DB_PORT=5432
NOTIFICATION_DB_NAME=notification_db
NOTIFICATION_DB_USER=postgres
NOTIFICATION_DB_PASSWORD=your_password_here

# Email service for notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

Ensure your Gmail account has an App Password configured for EMAIL_PASSWORD.

Set up PostgreSQL Databases:Create the following databases in PostgreSQL:

user_db
insurance_db
notification_db

You can create them using the following commands:
CREATE DATABASE user_db;
CREATE DATABASE insurance_db;
CREATE DATABASE notification_db;


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


Example Mutation: Register a User
mutation {
  createUser(input: {
    matricule: "USER123"
    name: "John Doe"
    email: "john.doe@example.com"
    cin: "123456789"
    role: "USER"
  }) {
    matricule
    name
    email
  }
}

Example Query: Get User Details
query {
  user(matricule: "USER123") {
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

Example Mutation: Create an Insurance Company
mutation {
  createInsuranceCompany(input: {
    companyName: "InsuranceCo"
    companyEmail: "insuranceco@example.com"
  }) {
    id
    companyName
  }
}

Example Mutation: Register a Beneficiary
mutation {
  registerBeneficiary(input: {
    companyId: "1"
    requesterId: "USER123"
    beneficiaryId: "USER123"
    nomBeneficiaire: "John Doe"
    nomNouveauBeneficiaire: "John Smith"
  }) {
    id
    nomBeneficiaire
    nomNouveauBeneficiaire
  }
}

Project Structure

src/schema/: Contains GraphQL schema definitions and resolvers.
common.schema.ts: Shared types and scalars.
user.schema.ts: User service schema and resolvers.
insurance.schema.ts: Insurance service schema and resolvers.
notification.schema.ts: Notification service schema and resolvers.


src/config/: Database configuration files for each service.
src/controllers/: Business logic for each service.
src/models/: Sequelize models for database tables.
src/server.ts: Main entry point combining all services into a single GraphQL API.

Notes

Each service uses a separate PostgreSQL database (user_db, insurance_db, notification_db).
The Gateway composes schemas using Apollo Federation, currently running in a single server.
Notifications are sent via email using Nodemailer with Gmail SMTP.
Ensure your .env file has valid Gmail credentials (use an App Password for EMAIL_PASSWORD).
The project is designed to be split into separate services (user-service, insurance-service, notification-service, and gateway) in the future for better scalability.

Future Improvements

Split the services into separate servers with their own repositories and run them independently.
Deploy the services using Docker and Kubernetes for better scalability.
Add a proper API Gateway using Apollo Gateway to compose the federated schema.
Implement authentication and authorization for secure access.
Add unit and integration tests for each service.

Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements!
License
This project is licensed under the MIT License.
