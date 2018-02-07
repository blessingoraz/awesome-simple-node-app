const User = require('../models/users');

exports.create = (req, res) => {
    if(!req.body.email) {
        res.status(400).send({message: "Email can not be empty"});
    }
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // create_at: Date
    });
    user.save((err, data) => {
        console.log('is data here ======>', data);
        if(err) res.status(500).send({message: "An error occurred while creating the User."});
        res.status(201);
        res.send(data);
    });
};

exports.findAll = (req, res) => {

};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};
