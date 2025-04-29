# 🌟 GestionRH Microservices

**A modern, microservices-based HR and insurance management system built with Node.js, TypeScript, Apollo Federation, and SQLite.**

---

## 📋 Overview

**GestionRH Microservices** transforms a monolithic HR and insurance management system into a scalable microservices architecture. It provides a unified **GraphQL API** to manage HR-related functionalities such as user management, insurance registration, and notifications. The system leverages **Apollo Federation** for schema composition, **Sequelize** for database management, and **TypeScript** for type safety.

---

## 🏗️ Architecture

The project is designed as a **microservices architecture** with the following components:

- **User Service**  
  Manages user operations (create, update, retrieve) and hierarchical relationships (e.g., `advisedBy` and `advisees`).  
  **Database**: `user_db` (SQLite).

- **Insurance Service**  
  Handles insurance companies and beneficiary registrations, linking them to users.  
  **Database**: `insurance_db` (SQLite).

- **Notification Service**  
  Manages notifications and email sending (e.g., user name updates) using **Nodemailer** with Gmail SMTP.  
  **Database**: `notification_db` (SQLite).

- **Gateway**  
  Combines schemas from all services into a unified **GraphQL API** using **Apollo Federation**.  
  *Note*: Currently runs as a single server but is designed for future separation.

---

## 🛠️ Technology Stack

| **Technology**         | **Purpose**                              |
|-------------------------|------------------------------------------|
| **Node.js** (v20.19.0) | Runtime environment                     |
| **TypeScript**         | Type safety and developer experience    |
| **Apollo Federation**  | Unified GraphQL schema composition      |
| **Sequelize**          | ORM for SQLite                      |
| **SQLite**             | Relational database                     |
| **Nodemailer**         | Email notifications via Gmail SMTP      |
| **GraphQL**            | API query language                      |

---

## ✅ Prerequisites

- **Node.js**: v20.19.0 or higher
- **SQLite**: Rjust 
- **npm**: v10.x or higher
- **Gmail Account**: With an [App Password](https://support.google.com/accounts/answer/185833) for email notifications

---

## 🚀 Setup

Follow these steps to get the project up and running:

### 1. Clone the Repository
```bash
git clone https://github.com/gasimiaro/gestionRH-microservice.git
cd gestionRH-microservice
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Copy the `.env.example` file to `.env` and update it with your credentials:
```bash
cp .env.example .env
```

Example `.env`:
```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

*Ensure your Gmail account has an App Password configured for `EMAIL_PASSWORD`.*

### 4. Set Up SQLite Databases
Create the required databases:
```sql
CREATE DATABASE user_db;
CREATE DATABASE insurance_db;
CREATE DATABASE notification_db;
```

### 5. Install Service-Specific Dependencies
```bash
cd user-service && npm install
cd ../insurance-service && npm install
cd ../notification-service && npm install
cd ../gateway && npm install
```

### 6. Start the Services
Run each service in a separate terminal:
```bash
# Terminal 1: User Service
cd user-service
npm start

# Terminal 2: Insurance Service
cd insurance-service
npm start

# Terminal 3: Notification Service
cd notification-service
npm start

# Terminal 4: Gateway
cd gateway
npm start
```

---

## 🧪 Test the Application

Access the **GraphQL API** at `http://localhost:4000` using a GraphQL client like **Apollo Studio**.

### Example Mutation: Register a User
```graphql
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
```

### Example Query: Get User Details
```graphql
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
```

### Example Mutation: Create an Insurance Company
```graphql
mutation {
  createInsuranceCompany(input: {
    companyName: "InsuranceCo"
    companyEmail: "insuranceco@example.com"
  }) {
    id
    companyName
  }
}
```

### Example Mutation: Register a Beneficiary
```graphql
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
```

---

## 📂 Project Structure

```plaintext
insurance-microservices/
├── user-service/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── user.controller.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   ├── models/
│   │   │   └── User.ts
│   │   ├── graphql/
│   │   │   ├── schema.ts
│   │   │   └── resolvers.ts
│   │   ├── types/
│   │   │   └── user.ts
│   │   └── index.ts
│   ├── package.json
│   └── database.sqlite
├── insurance-service/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── insurance.controller.ts
│   │   ├── services/
│   │   │   └── insurance.service.ts
│   │   ├── models/
│   │   │   └── InsuranceCompany.ts
│   │   │   └── BeneficiaryRegistration.ts
│   │   ├── graphql/
│   │   │   ├── schema.ts
│   │   │   └── resolvers.ts
│   │   ├── types/
│   │   │   └── insurance.ts
│   │   └── index.ts
│   ├── package.json
│   └── database.sqlite
├── notification-service/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── notification.controller.ts
│   │   ├── services/
│   │   │   └── notification.service.ts
│   │   ├── models/
│   │   │   └── Notification.ts
│   │   ├── graphql/
│   │   │   ├── schema.ts
│   │   │   └── resolvers.ts
│   │   ├── types/
│   │   │   └── notification.ts
│   │   └── index.ts
│   ├── package.json
│   └── database.sqlite
├── gateway/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── .env
├── .env
└── README.md
 documentation
```

---

## 📝 Notes

- Each service uses a separate SQLite database (`user_db`, `insurance_db`, `notification_db`).
- The **Gateway** composes schemas using **Apollo Federation** but currently runs as a single server.
- Notifications are sent via email using **Nodemailer** with Gmail SMTP.
- Ensure valid Gmail credentials (App Password) in the `.env` file.
- The project is designed for future scalability by splitting services into independent servers.

---

## 🚀 Future Improvements

- Split services into separate servers with dedicated repositories.
- Deploy using **Docker** and **Kubernetes** for scalability.
- Implement a proper **Apollo Gateway** for schema federation.
- Add **authentication** and **authorization** for secure access.
- Include **unit** and **integration tests** for robustness.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m "Add YourFeature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Report issues or suggest improvements via the [Issues](https://github.com/<your-username>/gestionRH-microservice/issues) page.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🎉 Get Started!

Ready to dive in? Clone the repo, set up the environment, and start exploring the power of microservices with **GestionRH**!

```bash
git clone https://github.com/<your-username>/gestionRH-microservice.git
```

---

### Modifications effectuées :
1. **Mise en page moderne** : Utilisation d'emojis, tableaux, et sections claires pour une lecture facile.
2. **Structure optimisée** : Regroupement des instructions pour plus de clarté (ex. : installation, configuration).
3. **Exemples GraphQL** : Mise en forme avec coloration syntaxique pour une meilleure lisibilité.
4. **Ajout de visuels** : Emojis et icônes pour une interface plus attrayante.
5. **Simplification** : Suppression des redondances et clarification des étapes d'installation.
6. **Ajout de navigation** : Sections bien définies avec titres et sous-titres pour un accès rapide.

