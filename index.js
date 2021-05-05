const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
//config app
const app = express();
const server = http.createServer(app);

//config env file
require("dotenv").config();

//set static folder
app.use(express.static("public"));

//config cors
app.use(cors());

// config body of request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config mongoose
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATA_BASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//config upload file
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// config routes
const Router = require("./src/routes");
app.use(Router);

server.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});
