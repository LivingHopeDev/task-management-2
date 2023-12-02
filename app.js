require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/DB");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started, port:${process.env.PORT}`);
});
