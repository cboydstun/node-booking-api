const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

let Admin = require("../models/Admin");

//@GET - '/api/v2/admin - get the admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.json({ message: err });
  }
});

//@POST - /api/v2/admin/add - register an admin
router.post("/add", async (req, res) => {
  const newAdmin = new Admin({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    authkey: req.body.authkey,
    type: "admin",
  });

  if (req.body.password.length < 6) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  try {
    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
  }
});


//@POST - /api/v2/admin/login - login an admin
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	const admin = await Admin.findOne({ email }).lean()

	if (!admin) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
	}
    try{
    if ( await bcrypt.compare(password, admin.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: admin._id,
				email: admin.email
			},
			process.env.JWT_SECRET
		)

		return res.json({ 
      status: 'ok', 
      data: token,
      role: admin.type 
    })
	}else{
        res.json({ status: 'error', error: 'Invalid password' })
    }
    }catch(error){
        res.json({ status: 'error', error: 'Invalid email/password' })

    }
});

module.exports = router;
