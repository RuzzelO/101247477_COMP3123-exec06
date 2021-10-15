const express = require('express');
const router = express.Router();
const noteModel = require('../models/NotesModel.js');

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes',  async (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    let newNote = new noteModel(req.body)
    try{
        await newNote.save();
        res.send(newNote);
    } catch (err) {
        res.status(500).send(err);
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', (req, res) => {
    //TODO - Write your code here to returns all note
    noteModel.find({},(err,notes) => {
        if(err) res.send({"error": err.toString()})
        res.send(notes)
    })
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', (req, res) => {
    //TODO - Write your code here to return onlt one note using noteid
    noteModel.findById(req.params.noteId,(err,notes) => {
        if(err) res.send({"error": err.toString()})
        res.send(notes)
    })
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndUpdate(req.params.noteId, req.body, (err,notes) => {
        if(err) res.send({"error": err.toString()})
        res.send(notes)
    })
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', async (req, res) => {
    // Validate request
    //TODO - Write your code here to delete the note using noteid
    try{
        const note = await noteModel.findByIdAndDelete(req.params.noteId)
        if (!note)res.status(404).send("No item found")
        res.status(200).send("item deleted")
    } catch(err){
        res.status(500).send(err)
    }
});

module.exports = router;
