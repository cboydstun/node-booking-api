const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    name: { type: String, required: true},
    email: { type: String, required: true},
    time: { type: String, required: true },
    date: { type: String, required: true },
    isBooked: { type: Boolean, default: false}
  },

  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
