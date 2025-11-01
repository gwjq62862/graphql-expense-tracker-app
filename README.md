# 💰 Expense Tracker (MERN + GraphQL + Apollo)

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]()
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)]()

A full-stack expense tracking application built with **MongoDB**, **Express**, **React**, **Node.js**, and **GraphQL**.
It allows users to manage their transactions, visualize spending habits using a **doughnut chart**, and track expenses in real-time.

---

## 📝 Table of Contents

- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Installation](#-installation)
- [💻 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [📜 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [⚖️ License](#️-license)
- [🔗 Important Links](#-important-links)
- [👣 How to use](#-how-to-use)
- [📜 API Reference](#-api-reference)
- [📌 Footer](#-footer)

---

## 🚀 Features

- **User Authentication** – Sign up & login
- **Add Transactions** – Record expenses or income
- **Update & Delete Transactions**
- **Dynamic Charts** – View spending breakdown by category
- **Responsive UI** – Built with Tailwind CSS
- **GraphQL API** – Apollo Client & Apollo Server
- **MongoDB Database** – Secure storage of user data

---

## 🛠 Tech Stack

| Frontend            | Backend          | Database  |
|---------------------|------------------|-----------|
| React + Vite        | Node.js + Express| MongoDB    |
| Apollo Client       | Apollo Server    | Mongoose   |
| Tailwind CSS        | GraphQL          |            |
| Chart.js            |                  |            |

---

## 📦 Installation

1.  **Clone the repository:**

   ```bash
   git clone https://github.com/gwjq62862/graphql-expense-tracker-app.git
   cd graphql-expense-tracker-app
   ```

2.  **Install dependencies:**

   ```bash
   npm install # Installs dependencies for the root project
   cd frontend
   npm install # Installs dependencies for the frontend
   cd ..
   cd backend
   npm install # Installs dependencies for the backend
   cd ..
   ```

---
## 💻 Usage

1.  **Create a `.env` file** in the `backend` directory.
    *   Add the following environment variable:

        ```
        DB_URL=mongodb://your_db_url
        ```
        Replace `mongodb://your_db_url` with your MongoDB connection string.

2.  **Run the application:**

   ```bash
   npm run dev:full
   ```

   This command starts both the backend and frontend development servers concurrently. Alternatively, you can start the backend and frontend separately:

   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

3.  **Access the application:**

    *   Frontend: Usually runs on `http://localhost:5173` (check the console output for the exact URL).
    *   GraphQL API: Available at `http://localhost:4000/graphql`.



---

## 📂 Project Structure

```
├── backend/                # Server-side code
│   ├── db/                 # Database connection
│   ├── models/             # Mongoose models
│   ├── resolvers/          # GraphQL resolvers
│   ├── typeDefs/           # GraphQL schema
│   ├── index.js            # Main server file
│   └── package.json
|
├── frontend/               # Client-side code
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── graphql/         # Queries & Mutations
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
|
└── README.md
```

---

## 🔗 Important Links

-   **Repository Link:** [https://github.com/gwjq62862/graphql-expense-tracker-app](https://github.com/gwjq62862/graphql-expense-tracker-app)

---

## 👣 How to use

1.  **Sign up:**

    *   Navigate to the signup page.
    *   Enter your full name, username, password, and gender.
    *   Click the "Sign Up" button.

2.  **Log in:**

    *   Go to the login page.
    *   Enter your username and password.
    *   Click the "Login" button.

3.  **Add a transaction:**

    *   Once logged in, you will be redirected to the home page.
    *   Fill out the transaction form with the required details, such as description, payment type, category, amount, location, and date.
    *   Click the "Add Transaction" button.

4.  **View Transaction History:**

    *   The transaction history will display all the recorded transactions.

5.  **Update or Delete Transactions:**

    *   Click the pencil icon to update a transaction.
    *   Click the trash icon to delete a transaction.

6.  **View Spending Breakdown:**

    *   A doughnut chart will visualize your spending breakdown by category.





---

## 📜 API Reference

The application uses GraphQL for its API. Here are the key queries and mutations:

### Queries

*   **transactions(userId: ID!): [Transaction!]**
    *   Fetches all transactions for a given user ID.
    *   Example Usage:
        ```graphql
        query {
          transactions(userId: "user_id") {
            _id
            description
            amount
            location
            category
            date
            paymentType
          }
        }
        ```
*   **transaction(transactionId: ID!): Transaction**
    *   Fetches a single transaction by its ID.
    *   Example Usage:
        ```graphql
        query {
          transaction(transactionId: "transaction_id") {
            _id
            description
            amount
            location
            category
            date
            paymentType
          }
        }
        ```

### Mutations

*   **signup(input: SignUpInput!): User**
    *   Registers a new user.
    *   Input:
        ```graphql
        input SignUpInput {
          username: String!
          name: String!
          password: String!
          gender: String!
        }
        ```
    *   Example Usage:
        ```graphql
        mutation {
          signup(input: {
            username: "newuser"
            name: "New User"
            password: "password123"
            gender: "male"
          }) {
            _id
            username
            name
            gender
          }
        }
        ```
*   **login(input: LoginInput!): User**
    *   Logs in an existing user.
    *   Input:
        ```graphql
        input LoginInput {
          username: String!
          password: String!
        }
        ```
    *   Example Usage:
        ```graphql
        mutation {
          login(input: {
            username: "existinguser"
            password: "password123"
          }) {
            _id
            username
            name
            gender
          }
        }
        ```
*   **createdTransaction(input: CreateTransactionInput!): Transaction!**
    *   Creates a new transaction.
    *   Input:
        ```graphql
        input CreateTransactionInput {
          userId: ID!
          description: String!
          amount: Float!
          location: String
          category: String!
          date: String!
          paymentType: String!
        }
        ```
    *   Example Usage:
        ```graphql
        mutation {
          createdTransaction(input: {
            userId: "user_id"
            description: "Bought groceries"
            amount: 50.0
            category: "expense"
            date: "2024-01-01"
            paymentType: "card"
          }) {
            _id
            description
            amount
            category
            date
            paymentType
          }
        }
        ```
*   **updateTransaction(input: UpdateTransactionInput!): Transaction!**
    *   Updates an existing transaction.
    *   Input:
        ```graphql
        input UpdateTransactionInput {
          transactionId: ID!
          description: String
          amount: Float
          location: String
          category: String
          date: String
          paymentType: String
        }
        ```
    *   Example Usage:
        ```graphql
        mutation {
          updateTransaction(input: {
            transactionId: "transaction_id"
            description: "Updated groceries description"
            amount: 55.0
          }) {
            _id
            description
            amount
            category
            date
            paymentType
          }
        }
        ```
*   **deleteTransaction(transactionId: ID!): Transaction!**
    *   Deletes a transaction.
    *   Example Usage:
        ```graphql
        mutation {
          deleteTransaction(transactionId: "transaction_id") {
            _id
          }
        }
        ```



---

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Submit a pull request.

---

## ⚖️ License

This project has no license.

---

## 📌 Footer

Expense Tracker App - [https://github.com/gwjq62862/graphql-expense-tracker-app](https://github.com/gwjq62862/graphql-expense-tracker-app) by [gwjq62862](https://github.com/gwjq62862).

⭐️ Like the project? Give it a star!

🍴 Fork the repository to contribute.

🐛 Find a bug? Open an issue!


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
