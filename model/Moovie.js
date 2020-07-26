const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MooveiSchema = new Schema({
    title: {
        type: String,
        require: true,
        // unique: true
    },
    category: String,
    country : String,
    year : Number,
    director_id: Schema.Types.ObjectId,
    imdb_score: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('movie', MooveiSchema)