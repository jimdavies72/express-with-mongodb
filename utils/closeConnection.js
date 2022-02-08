const mongoose = require("mongoose");

const closeConnection = () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection is closed");
  });
};

closeConnection();
