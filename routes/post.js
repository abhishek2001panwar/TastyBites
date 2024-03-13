

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Reference to the user who created the post
    title: { type: String, required: true },
    description: { type: String, required: true },
    name:String,
    image: { type: String }, // You can store the URL of the image

    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('post', postSchema);


