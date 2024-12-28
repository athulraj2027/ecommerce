const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.nou() + "-" + file.originalname);
  },
});
const upload = multer({storage})

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//   ENVIRONMENT VARIABLES

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

//   GLOBAL MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//   VIEW ENGINE

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//   DATABASE CONNECTION

mongoose.connect(MONGO_URI).then(console.log("DB connected"));

//   IMPORTING MIDDLEWARES
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log("BestDeals is running"));
