const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory data
let users = [];
let rides = [];
let rideIdCounter = 1;

// ======= AUTH =======

app.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  const user = { id: users.length + 1, name, email, password, role };
  users.push(user);
  res.json({ msg: "Signup successful", user });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ msg: "Invalid credentials" });

  res.json({ msg: "Login successful", user });
});

// ======= PASSENGER =======

app.post("/request-ride", (req, res) => {
  const { passengerId, pickup, dropoff, rideType } = req.body;

  const ride = {
    id: rideIdCounter++,
    passengerId,
    pickup,
    dropoff,
    rideType,
    status: "Requested",
    driverId: null,
  };

  rides.push(ride);
  res.json({ msg: "Ride requested", ride });
});

app.get("/ride-status/:passengerId", (req, res) => {
  const passengerId = Number(req.params.passengerId);
  const currentRide = rides
    .filter(r => r.passengerId === passengerId)
    .sort((a, b) => b.id - a.id)[0];

  if (!currentRide) return res.status(404).json({ msg: "No rides found" });
  res.json({ status: currentRide.status, ride: currentRide });
});

app.get("/ride-history/:passengerId", (req, res) => {
  const passengerId = Number(req.params.passengerId);
  const history = rides.filter(r => r.passengerId === passengerId && r.status === "Completed");
  res.json({ history });
});

// ======= DRIVER =======

app.get("/pending-rides", (req, res) => {
    console.log("Fetching pending rides", rides);
  const pending = rides.filter(r => r.status === "Requested");
  res.json({
    pending,
    all: rides
  });
});
app.post("/respond-ride", (req, res) => {
  const { rideId, driverId, accept } = req.body;
  const ride = rides.find(r => r.id === rideId);
  if (!ride) return res.status(404).json({ msg: "Ride not found" });

  if (accept) {
    ride.status = "Accepted";
    ride.driverId = driverId;
  } else {
    ride.status = "Rejected";
  }

  res.json({ msg: "Ride response updated", ride });
});

app.post("/update-status", (req, res) => {
  const { rideId, status } = req.body;
  const ride = rides.find((r) => r.id === rideId);
  if (!ride) return res.status(404).json({ msg: "Ride not found" });
  ride.status = status;
  res.json({ msg: "Ride updated", ride });
});
app.post("/complete-ride", (req, res) => {
  const { rideId } = req.body;

  const ride = rides.find((r) => r.id === rideId);
  if (!ride) {
    return res.status(404).json({ msg: "Ride not found" });
  }

  // Only allow completion if it's in progress
  if (ride.status !== "In Progress" && ride.status !== "Accepted") {
    return res.status(400).json({ msg: "Ride is not in progress or accepted." });
  }

  ride.status = "Completed";

  res.json({ msg: "Ride marked as completed", ride });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
