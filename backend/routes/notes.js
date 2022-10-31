const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
// const User = require("../models/User");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: fetching all notes--------------------------------------------------------------------------
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2: Adding the notes-------------------------------------------------------------------------
router.post(
  "/addnote",
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description length should be 5 char").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        // user:req.user.id
      });
      //  console.log(req.user)
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

//--ROUTE 3--UPDATING THE NOTE-----------------------------------------------------------------------
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //creating NewNote object
  const newNotes = {};
  if (title) {
    newNotes.title = title;
  }
  if (description) {
    newNotes.description = description;
  }
  if (tag) {
    newNotes.tag = tag;
  }
  //find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }

  //   if (note.user.toString() !== req.user.id) {
  //     return res.status(401).send("not allowed")
  //   }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNotes },
    { new: true }
  );
  res.json({ note });
});

//--ROUTE 4--DELETING THE NOTE--------------------------------------------------------------------
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    //   if (note.user.toString() !== req.user.id) {
    //     return res.status(401).send("not allowed")
    //   }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted", note: note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
