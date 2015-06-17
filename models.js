var mongoose = require('mongoose');
mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test');

var movieQuoteSchema = mongoose.Schema({
  movie: String,
  quote: String,
  last_touch: Date
});

exports.MovieQuote = mongoose.model('MovieQuote', movieQuoteSchema);
