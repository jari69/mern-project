var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
});

var Books = mongoose.model('Book', bookSchema);

module.exports = Books;