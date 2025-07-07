# 🚕 Mini Ride Booking App – Prototype

---

## Features

### 👤 Passenger
- Signup/Login (Mocked using localStorage)
- Request a ride (enter pickup/dropoff and choose ride type: Bike, Car, Rickshaw)
- View real-time ride status (Requested → Accepted → In Progress → Completed)
- View ride history

### 🚗 Driver
- View pending ride requests
- Accept or reject rides
- Manage ride status (Start, Complete)

---

## 🛠 Tech Stack

| Layer         | Technology             |
|--------------|------------------------|
| Frontend     | React.js + Tailwind CSS |
| Backend      | Node.js + Express.js (in-memory) |
| Auth         | LocalStorage (mocked auth) |
| State Mgmt   | React `useState`, `useEffect` |
| Icons        | React Icons (Font Awesome) |

---

## 🧪 How to Run Locally

# 🛠 Setup Instructions for Mini Ride Booking App

This guide walks you through setting up both the frontend and backend for the Mini Ride Booking App locally.

---

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

---

## 🖥️ Backend Setup

1. Navigate to the backend directory:

```bash
cd mini-ride-backend
```

2. Install backend dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
node server.js
```

> ✅ Server is now running at: `http://localhost:5000`

---

## 🌐 Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

```bash
cd mini-ride-booking
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm run dev
```

> ✅ Frontend is running at: `http://localhost:5173` (default Vite port)

---

## 🧪 Testing the App

- Open your browser and go to `http://localhost:5173`
- You can now sign up as a **Passenger** or **Driver** and begin booking or accepting rides.

---

Enjoy!
