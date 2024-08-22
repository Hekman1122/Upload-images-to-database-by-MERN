const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// const db = mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// db.then(() => {
//   console.log("MongoDB connected");
// }).catch((err) => {
//   console.log(err);
// });
const connection = {};

async function dbConnection() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_URL);
  connection.isConnected = db.connections[0].readyState;
  return db;
}

module.exports = dbConnection;
