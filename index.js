const express = require("express");
const mongoose = require("mongoose");
const Book = require("../backend/models/BookModel");
const cors = require("cors");
const booksRoute= require('../backend/routes/booksRoute')
const app = express();
const PORT = 5555;
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(cors())
app.use(express.json());
app.use('/books', booksRoute)

mongoose
  .connect("mongodb://127.0.0.1:27017/elibrary")
  .then(() => console.log("connected succesfully"))
  .catch((err) => {
    console.log(err);
  });
