import express from 'express'
import Room from '../Models/roomSchema.js';
import Booking from '../Models/bookingSchema.js';

const router = express.Router();

// Create a Room

router.post('/rooms', async (req, res) => {

  const { roomName, roomNumber, seatsAvailable, amenities, pricePerHour} = req.body

  try {
    const roomExists = await Room.findOne({roomNumber : roomNumber})
    if(roomExists){
      res.send("Room Number already exists!")
    }else if (!roomExists){
    const room = new Room({roomName : roomName, roomNumber : roomNumber, seatsAvailable : seatsAvailable, amenities : amenities, pricePerHour : pricePerHour});
    await room.save();
    res.status(201).json(room);
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to create a room' });
  }
});

// Book a Room

router.post('/bookings', async (req, res) => {

  const { customerName, date, startTime, endTime, roomType, roomNumber} = req.body

  try {
    const booking = new Booking({customerName : customerName, date : date, startTime : startTime, endTime : endTime, roomType : roomType});
    const roomExists = await Room.findOne({roomName : roomType})
    if(roomExists){
    await Room.updateOne(({roomNumber : roomNumber}), {$set : {bookingStatus : "booked"}})
    await booking.save();
    res.status(201).json(booking);
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to create a booking' });
  }
});

// List all Rooms with Booked Data

router.get('/rooms-with-bookings', async (req, res) => {
  try {
    const rooms = await Room.aggregate([{$match : {bookingStatus : "booked"}}]);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch rooms with bookings', error });
  }
});

//4. List all customers with booked Data

router.get('/customers-with-bookings', async (req, res) => {
  try {
    const customers = await Booking.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch customers with bookings' });
  }
});

//5. List how many times a customer has booked a room

router.get('/customer-booking-history', async (req, res) => {
  try {
    const customerBookingHistory = await Booking.aggregate([
      {
        $group: {
          _id: '$customerName',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(customerBookingHistory);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch customer booking history' });
  }
});


export default router;