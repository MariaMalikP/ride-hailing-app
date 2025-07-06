const express = require("express");
const router = express.Router();
const {
  requestRide,
  getPassengerRides,
  getRequestedRides,
  acceptRide,
  completeRide
} = require("../controllers/rideController");

router.post("/", requestRide);
router.get("/passenger/:id", getPassengerRides);
router.get("/requested", getRequestedRides);
router.patch("/:rideId/accept", acceptRide);
router.patch("/:rideId/complete", completeRide);

module.exports = router;
