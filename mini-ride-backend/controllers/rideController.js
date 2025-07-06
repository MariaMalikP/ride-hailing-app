const { rides } = require("../data/storage");

let rideId = 1;

exports.requestRide = (req, res) => {
  const { passengerId, pickup, dropoff, type } = req.body;
  const ride = {
    id: rideId++,
    passengerId,
    driverId: null,
    pickup,
    dropoff,
    type,
    status: "Requested"
  };
  rides.push(ride);
  res.status(201).json(ride);
};

exports.getPassengerRides = (req, res) => {
  const passengerId = parseInt(req.params.id);
  const userRides = rides.filter(r => r.passengerId === passengerId);
  res.json(userRides);
};

exports.getRequestedRides = (req, res) => {
  const requested = rides.filter(r => r.status === "Requested");
  res.json(requested);
};

exports.acceptRide = (req, res) => {
  const { rideId } = req.params;
  const { driverId } = req.body;

  const ride = rides.find(r => r.id === parseInt(rideId));
  if (ride) {
    ride.driverId = driverId;
    ride.status = "Accepted";
    res.json(ride);
  } else {
    res.status(404).json({ error: "Ride not found" });
  }
};

exports.completeRide = (req, res) => {
  const { rideId } = req.params;
  const ride = rides.find(r => r.id === parseInt(rideId));
  if (ride) {
    ride.status = "Completed";
    res.json(ride);
  } else {
    res.status(404).json({ error: "Ride not found" });
  }
};
