const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const facebookRoutes = require("./routes/Facebook");

const app = express();

// app.use(
//   cors({
//     origin: "https://fb-helpdesk-server.vercel.app/",
//     credentials: true,
//     optionSuccessStatus: 200,
//   })
// );

// app.use(
//   cors({
//     origin: "https://fb-helpdesk-frontend.vercel.app/",
//     preflightContinue: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );

app.use(cors());


// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/facebook", facebookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
