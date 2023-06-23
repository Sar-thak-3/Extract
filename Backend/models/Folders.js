const mongoose = require("mongoose");
const {Schema} = mongoose;

const ImageSchema = new Schema({
    image: {
        type: String,
    },
    extracted: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})

const FolderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    foldername: {
        type: String,
        required: true,
    },
    images: [ImageSchema],
    public: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("folder",FolderSchema);