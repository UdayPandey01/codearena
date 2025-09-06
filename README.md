# 🚀 CodeArena: A Real-Time Collaborative Coding Platform

<p align="center">
  <a href="https://github.com/UdayPandey01/codearena/stargazers">
    <img src="https://img.shields.io/github/stars/UdayPandey01/codearena?style=for-the-badge&logo=github&color=f5e0dc&logoColor=f5e0dc&labelColor=302d41" />
  </a>
  <a href="https://github.com/UdayPandey01/codearena/forks">
    <img src="https://img.shields.io/github/forks/UdayPandey01/codearena?style=for-the-badge&logo=github&color=cba6f7&logoColor=cba6f7&labelColor=302d41" />
  </a>
  <img src="https://img.shields.io/github/license/UdayPandey01/codearena?style=for-the-badge&logo=github&color=f2cdcd&logoColor=f2cdcd&labelColor=302d41" />
</p>

**CodeArena** is a full-stack, collaborative coding platform designed for practicing DSA problems and competing in **real-time coding battles**.  
Built with a modern, scalable **microservices architecture**, CodeArena ensures high concurrency support and a seamless user experience.

---

## ✨ Key Features

- **📝 Real-time Collaborative Editor**  
  Code with others simultaneously in the same editor, powered by **WebSockets** and **Y.js**.

- **🔒 Secure Code Execution**  
  User-submitted code runs in an **isolated sandbox** environment using **Judge0**.

- **⚡ Scalable Submission System**  
  Event-driven design using **Kafka** as a message broker to handle high-volume concurrent submissions.

- **🤖 AI-Powered Feedback**  
  Get intelligent code analysis, time complexity estimation, and suggestions via the **Gemini API**.

- **🏆 Live Leaderboards**  
  Real-time ranking updates with a high-performance **Redis cache**.

- **🔑 JWT Authentication**  
  Secure, stateless user authentication.

---

## 🛠️ Tech Stack & Architecture

The project follows a **monorepo** structure managed by **Turborepo**, with clear separation between frontend and backend applications.

| Category   | Technologies |
|------------|--------------|
| **Frontend** | Next.js, React, TailwindCSS, WebSockets, Y.js |
| **Backend**  | Node.js, NestJS, Express, Judge0, Kafka |
| **Databases** | PostgreSQL (via Prisma), Redis |
| **DevOps & Messaging** | Docker, Docker Compose, Kafka, Turborepo |

---

## 🏗️ Architecture Overview

The system is designed with a **decoupled, event-driven architecture** for scalability.

1. User submits code → Backend API **produces an event** to a Kafka topic.  
2. **Executor microservice** consumes the event, calls **Judge0**, and produces the result to another topic.  
3. Backend consumes the result and **pushes it to the client** via WebSockets.  

This ensures real-time updates and fault tolerance.

---

## 🚀 Getting Started

This project is fully **containerized**.  
To run it locally, ensure you have **Git**, **Node.js**, and **Docker** installed.

### 1. Clone the Repository
```bash
git clone https://github.com/UdayPandey01/codearena.git
cd codearena
```

### 2. Set Up Environment Variables
Copy the example .env file:

bash
Copy code
# For Mac/Linux
cp .env.example .env

# For Windows
copy .env.example .env
Then open .env and fill in the required values (e.g., JWT_SECRET, DATABASE_URL).

### 3. Start the Docker Environment
Build and start all services:

bash
Copy code
docker-compose up --build -d

### 4. Run Database Migrations
Run migrations inside the backend container:

bash
Copy code
docker-compose exec backend npx prisma migrate dev
✅ That’s it! The application should now be running.

Frontend: http://localhost:3000

Backend API: http://localhost:3001

---

⚙️ Common Docker Commands
Action	Command
Start all services	docker-compose up -d
Stop all services	docker-compose down
Stop & remove all data volumes	docker-compose down --volumes
View logs for backend	docker-compose logs -f backend
Run command in backend container	docker-compose exec backend <command>