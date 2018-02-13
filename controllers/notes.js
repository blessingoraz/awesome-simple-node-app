const Note = require('../models/notes');
const User = require('../models/users');

exports.create = (req, res) => {
    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty" });
    }
    let note = new Note({
        _creator: req.params.userId,
        text: req.body.text,
        category: req.body.category,
    });
    note.save(function (err, note) {
        if (err) res.status(500).send({ message: "An error occurred while creating a note." });
        User.findById(note._creator, (err, user) => {
            if(err) res.status(500).send({ message: "An error occurred while getting a user id." });
            user.notes.push(note);
            user.save((err, user) => {
                if(err) res.status(500).send({ message: "Can not save." });
                res.status(201);
                res.send(note);
            });
        })
    });
};

exports.findAll = (req, res) => {
    Note.find((err, notes) => {
        if (err) res.status(500).send({ message: "An error occurred while trying to retrieve notes" });
        res.send(notes);
    });
};

exports.findAllByUser = (req, res) => {
    Note.where('_creator').equals(req.params.userId).exec((err, notes) => {
        if (err) res.status(500).send({ message: "An error occurred while trying to retrieve notes" });
        res.send(notes);
    });
};

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId, (err, note) => {
        if(err) res.status(500).send({message: "Ann error occured"});
        res.send(note);
    });
};

exports.update = (req, res) => {
    User.where('_creator').equals(req.params.userId).exec((err) => {
        if(err) res.status(500).send({ message: `User is not found` });
        Note.findById(req.params.noteId, (err, note) => {
            if (err) res.status(500).send({ message: `An error occurred` });
            note.text = req.body.text;
            note.category = req.body.category;

            note.save(function (err, note) {
                if (err) res.status(500).send({ message: `Could not update note` });
                res.send(note);
            });

        });
    });
};

exports.delete = (req, res) => {
    User.where('_id').equals(req.params.userId).exec((err) => {
        if(err) res.status(500).send({ message: `User is not found` });
            Note.remove({ _id: req.params.noteId }, (err, note) => {
            if (err) res.status(500).send({ message: `Unable to delete note with id ${req.params.noteId}` });
            res.send({ message: "Note deleted successfully!" });
        });
    });
};
