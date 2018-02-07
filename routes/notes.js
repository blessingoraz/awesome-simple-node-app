const Note = require('../models/notes');
const notes = require('../controllers/notes');

module.exports = (app) => {

    app.post('/notes', notes.create);

    app.get('/notes', notes.findAll);

    app.get('/notes/:noteId', notes.findOne);

    app.put('/notes/:noteId', notes.update);

    app.delete('/notes/:noteId', notes.delete);
};
