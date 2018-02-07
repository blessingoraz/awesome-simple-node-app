const Note = require('../models/notes');
const notes = require('../controllers/notes');

module.exports = (app) => {

    app.post('/users/:userId/notes', notes.create);

    app.get('/notes', notes.findAll);

    app.get('/users/:userId/notes', notes.findAllByUser);

    app.get('/notes/:noteId', notes.findOne);

    app.put('/users/:userId/notes/:noteId', notes.update);

    app.delete('/users/:userId/notes/:noteId', notes.delete);
};
