import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    customerName: String,
    date: Date,
    startTime: String,
    endTime: String,
    roomType: String,
  });

const Booking = mongoose.model('BOOKING', bookingSchema);

export default Booking;