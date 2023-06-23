const mongoose = require("mongoose");
const {Schema} = mongoose;

const QuestionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    description: {
        type: String,
        required: true,
    },
    answered: {
        type: Boolean,
        required: true,
    },
    comments: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Question = mongoose.model("questions",QuestionSchema);
module.exports = Question;