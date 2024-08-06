const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const imageDownloader = require("image-downloader");
const fs = require("fs");
const multer = require("multer");
const Booking = require("./models/booking");
const Place = require("./models/place");

const bcrypt = require("bcryptjs");
require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/user");

const bcryptSalt = bcrypt.genSaltSync(10);

const jwtSecret = "csijcnaliufh298h0sic;osidnc;isjn";

app.use(express.json());
//1Xv1B9fEFlNSiPCB
//mongodb+srv://mitanshjoshi141203:1Xv1B9fEFlNSiPCB@cluster0.zedvf4l.mongodb.net/
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173,https://hotel-booking-frontend-zeta-black.vercel.app/",
  })
);

app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      }
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photoMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  console.log(req.files);
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newpath = path + "." + ext;
    fs.renameSync(path, newpath);
    uploadedFiles.push(newpath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extrainfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    console.log("Verified userData:", userData);
    
    try {
      const newPlace = await Place.create({
        owner: userData.id,
        title,
        address,
        photos,
        description,
        perks,
        extrainfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      console.log("Newly created place:", newPlace);
      res.status(201).json(newPlace);
    } catch (error) {
      console.error("Error creating place:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
});

app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    console.log(await Place.find({ owner: id }));

    res.json(await Place.find({ owner: id }));
  });
});

app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extrainfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
      const placeDoc = await Place.findById(id);
      if (!placeDoc) {
        return res.status(404).json({ error: "Place not found" });
      }

      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          photos,
          description,
          perks,
          extrainfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        await placeDoc.save();
        res.json(placeDoc);
      } else {
        res.status(403).json({ error: "Unauthorized action" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
});

app.get("/places", async (req, res) => {
  const places = await Place.find({});
  res.json(places);
});

function getUserDataFromReq(req){
  return new Promise((resolve,reject)=>{
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if(err)
      {
        throw err;
      }
      resolve(userData);
    })
  })
}

app.post("/booking", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, Name, noOfGuests, phone, price } = req.body;

  const bookingDoc = await Booking.create({
    place,
    checkIn,
    checkOut,
    name: Name,
    noOfGuests,
    user: userData.id,
    phone,
    price,
  });

  res.json(bookingDoc);
});


app.get("/booking",async (req,res)=>{
  const userData = await getUserDataFromReq(req);

  res.json(await Booking.find({user:userData.id}).populate("place"));
})

app.listen(4000);
