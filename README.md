# KittyHawk

KittyHawk is a full-stack application designed to manage tasks efficiently. It includes a **client** built with React Native for mobile platforms and a **server** powered by Node.js and Express for backend operations. The app supports user authentication, task management

## Features

- User authentication (signup, login, and Todo management)
- Task management (create, update, delete tasks)
- Responsive and user-friendly design

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or higher)
- pnpm (v7 or higher)
- Expo CLI (for running the client)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd KittyHawk
```

### 2. Start the Server

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the `server` directory based on `.env.example` and configure the environment variables.
4. Start the development server:
   ```bash
   pnpm run dev
   ```

### 3. Start the Client

1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the Expo development server:
   ```bash
   pnpm run start
   ```
4. Use the Expo Go app on your mobile device or an emulator to view the app.

## Folder Structure

- `client/`: Contains the React Native frontend code.
- `server/`: Contains the Node.js backend code.


- `some screenshots` 

[Login](https://github.com/samcasmmm/kittyhawk-assignment/blob/main/screenshots/Screenshot_2025-11-23-04-44-03-677_host.exp.exponent.jpg)

[Dashboard](https://github.com/samcasmmm/kittyhawk-assignment/blob/main/screenshots/Screenshot_2025-11-23-04-44-19-660_host.exp.exponent.jpg)

[Add Todo](https://github.com/samcasmmm/kittyhawk-assignment/blob/main/screenshots/Screenshot_2025-11-23-04-44-48-011_host.exp.exponent.jpg)

[My Account](https://github.com/samcasmmm/kittyhawk-assignment/blob/main/screenshots/Screenshot_2025-11-23-04-44-22-496_host.exp.exponent.jpg)

[After adding new task](https://github.com/samcasmmm/kittyhawk-assignment/blob/main/screenshots/Screenshot_2025-11-23-04-45-00-966_host.exp.exponent.jpg)
