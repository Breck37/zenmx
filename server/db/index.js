const mongoose = require("mongoose");

// local connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/modernmoto", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((e) => {
//     console.error("Connection error", e.message);
//   });

// qa connection
mongoose
  .connect(
    "mongodb+srv://breck:7txucedDy2TDJHt@modernmotoqa.3elg2.mongodb.net/modernmotoqa?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
