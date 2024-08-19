const mongoose = require('mongoose')

const bookSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },author: {
        type: String,
        required: true
    },publishYear: {
        type: String,
        required: true
    },title: {
        type: String,
        required: true
    }
},{
    timestamps: true
}
)

const Book= mongoose.model("BOOK", bookSchema)

module.exports= Book