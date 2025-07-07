const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routers");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cookieParser());
//dynamic meta tag for seo
// run node js with chrome headless

app.use(
  cors({
    origin: process.env.URL_CLIENT || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// product environment
// const port = process.env.PORT || 8080;
const port = process.env.PORT || 5000;

//đọc api từ client gửi data từ json
app.use(express.json());
//đọc data từ form
app.use(express.urlencoded({ extended: true }));
dbConnect();
initRoutes(app);
// app.use('/', (req, res) => {res.send('SERVER ONNNNN')});

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
