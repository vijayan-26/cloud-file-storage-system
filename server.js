require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const connectDB = require("./config/db");
const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "cloudstoragesecret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/files", fileRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Cloud File Storage System Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});