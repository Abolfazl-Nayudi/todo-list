const express = require("express");
const connectDB = require("./db/connect");
const route = require("./routes/route");
const logger = require("./middleware/logger");
require("dotenv").config();
const cors = require("cors");
const app = express();

//mddleware
app.use(logger);
app.use(express.json());

app.use(cors());

app.use("/todos", route);

const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`the server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
