const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;

//   .then(() => console.log("Connected to th DB..."))
//   .catch((err) => console.log(err));
