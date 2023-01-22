const { Schema, model, default: mongoose } = require("mongoose");

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  image: String,
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebrity'
  }]
}, {
  timestamps: true
})

const Movie = model("Movie", movieSchema);

module.exports = Movie;

