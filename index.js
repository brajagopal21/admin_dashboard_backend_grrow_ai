const express = require("express");
const bodyParser = require("body-parser");
const { configDotenv } = require("dotenv");
const AdminRoute = require("./Routes/admin-router");
const AuthRoute = require("./Routes/auth-router");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    methods: ["GET", "PUT", "DELETE", "POST"],
    origin: "http://localhost:3000",
  })
);
configDotenv();
const PORT = process.env.PORT;
app.use("/api/admin", AdminRoute);
app.use("/api/auth", AuthRoute);
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
