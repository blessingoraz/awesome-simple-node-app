const User = require('../models/users');

exports.create = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty" });
    }
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function (err, user) {
        if (err) res.status(500).send({ message: "An error occurred while creating the user.", err });
        res.status(201);
        res.send(user);
    });
};

exports.findAll = (req, res) => {
    User.find((err, users) => {
        if (err) res.status(500).send({ message: "An error occurred while trying to retrieve users" });
        res.send(users);
    });
};

exports.login = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) res.status(500).send({ message: "User can not be found" });;
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) res.status(500).send({ message: "Incorrect password" });
            res.send({message: 'Successfully logged in'});
        });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId).populate('notes').exec((err, user) => {
        if (err) res.status(500).send({ message: `Can not retrieve user with id ${req.params.userId}` });
        res.send(user);
    });
};

exports.update = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) res.status(500).send({ message: `Could not retrieve user with id ${req.params.userId}` });

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function (err, user) {
            if (err) res.status(500).send({ message: `Could not update user with id ${req.params.userId}` });
            res.send(user);
        });
    });
};

exports.delete = (req, res) => {
    User.remove({ _id: req.params.userId }, (err, user) => {
        if (err) res.status(500).send({ message: `Unable to delete user with id ${req.params.userId}` });
        res.send({ message: "User deleted successfully!" });
    });
};
