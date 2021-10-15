const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    noteDescripition: {
        type: String
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default:'Low'
    },
    dateAdded: {
        type: Date,
        default: new Date()
    },
    dateUpdated: {
        type: Date
    }
})

module.exports = mongoose.model('Note', noteSchema)


//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated