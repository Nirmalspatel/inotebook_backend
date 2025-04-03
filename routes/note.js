const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const routes = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

routes.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
        res.json(notes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
        
    }
});
routes.post('/addnotes',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
        
    
    const note = new Notes({
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag,
        user:req.user.id,
    });
    const savedNote = await note.save();
    res.json(savedNote);
}
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
        
    }
});
routes.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);

});
routes.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
   
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",note});

});
module.exports = routes;