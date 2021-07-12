const router = require("express").Router();

let Booking = require("../models/Booking");

//@GET - /api/v2/booking/ - get all the user bookings
router.get("/", async (req, res) => {
  try {
    const userbookings = await Booking.find();
    res.json(userbookings);
  } catch (err) {
    res.json({ message: err });
  }
});

//@GET - /api/v2/booking/search/:email - get bookings by email
router.get('/search/:email', async(req,res)=>{
  let regex = new RegExp(req.params.email,'i');
  try{
    const bookingByEmail = await Booking.find({email:regex});
    res.json(bookingByEmail);
  }catch(err){
    res.json({message:err});
  }
})

//@POST - /api/v2/booking/add - register new booking
router.post("/add", async(req, res) => {
  const newUserbooking = new Booking({
    name: req.body.name,
    email: req.body.email,
    time: req.body.time,
    date: req.body.date,
    isBooked: req.body.isBooked
  });

  try {
    const savedUserbooking = newUserbooking.save();
    res.json(savedUserbooking);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Booking cannot be done" });
    }
  }
});

//@DELETE - /api/v2/booking/:id - delete bookings by ID
router.delete('/:id',async (req,res)=>{
  try{
    const deleteBooking = await Booking.remove({_id:req.params.id});
    res.json(deleteBooking);
  }catch(err){
    res.json({message:err})
  }
})

module.exports = router;
