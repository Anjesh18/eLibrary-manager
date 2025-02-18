const express= require('express')
const router=express.Router()
const Book=require('../models/BookModel')
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res
          .status(400)
          .send({ message: "Send all the fields: title, author, publishYear" });
      }
      /* const newBook= {
              title: req.body.title,
              author: req.body.author,
              publishYear: req.body.publishYear
          }
          const book= await Book.create(newBook)*/
      const { title, author, publishYear } = req.body;
      const newBook = await Book.create({
        title: title,
        author: author,
        publishYear: publishYear,
      });
      res.status(201).send(newBook);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //Route to get all books from database
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      res.status(200).json({count: books.length,
        data: books
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //Route to get one book from database by id
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const singleBook = await Book.findById(id);
      res.status(200).json(singleBook);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //Route to update a book
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res
          .status(400)
          .send({
            message: "Send all the required fields: title, author, publishYear",
          });
      }
      
      const updateBook = await Book.findByIdAndUpdate(id, req.body);
      if (!updateBook) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(200).send({ message: "Book updated successfully" });
    } catch (error) {}
  });
  
  //Route to delete a book
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteBook = await Book.findByIdAndDelete(id);
      if (!deleteBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(deleteBook);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

 module.exports= router