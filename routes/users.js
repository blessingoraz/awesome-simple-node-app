const User = require('../models/users');
const users = require('../controllers/users');

module.exports = (app) => {
    app.post('/users', users.create);

    app.get('/users', users.findAll);

    app.get('/users/:userId', users.findOne);

    app.put('/users/:userId', users.update);

    app.delete('/users/:userId', users.delete);
};
