import mongoose from 'mongoose'

const roomData = new mongoose.Schema({
    roomName: String,
    roomNumber : Number,
    seatsAvailable: Number,
    amenities: [String],
    pricePerHour: Number,
    bookingStatus : {
      type : String,
      default : ""
    }
  });

const Room = mongoose.model('ROOM', roomData);

export default Room;