const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// app.use(
//   cors({
//     origin: "https://fb-helpdesk-frontend.vercel.app/",
//     preflightContinue: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );

app.use(cors());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/auth", require("./routes/Auth"));
// app.use("/api/facebook", facebookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
