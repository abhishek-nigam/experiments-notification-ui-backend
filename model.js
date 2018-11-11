const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    author_name: {
        type: String,
        required: true
    },
    author_image: {
        type: String,
        required: true
    },
    author_action: {
        type: String,
        required: true
    },
    unread: {
        type: Boolean,
        default: true
    },
    dismissed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Notification', notificationSchema);