const mongoose = require("mongoose");

// local connection
// mongoose
//   .connect(process.env.MONGO_LOCAL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .catch((e) => {
//     console.error("Connection error", e.message);
//   });

// qa connection
mongoose
  .connect(process.env.MONGO_QA, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
