"use strict";

var should = require('should'),
    request = require('supertest'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    agent = request.agent(app);

describe('Todo CRUD integration testing', function () {
    describe('Get all users', function () {

        before(function (done) {
            var newUser = { name: "Todo from hooks", email: "djfdjfbfddfdfbdfdbf" };
            agent
                .post('/users')
                .send(newUser)
                .end(function () {
                    done();
                })
        });

        it('Should get status equal success and array of todo', function (done) {
            agent
                .get('/users')
                .expect(200)
                .end(function (err, results) {
                    results.status.should.equal(200);
                    done();
                });
        });

    });

    describe('Post a todo', function () {
        it('Should allow post to post a todo and return _id', function (done) {
            var params = { name: "Todo eerrer testing", email: "deeeew@gmail.com", password: "rerere" };
            agent
                .post('/users')
                .send(params)
                .expect(200)
                .end(function (err, results) {
                    results.body.email.should.equal('deeeew@gmail.com');
                    results.body.should.have.property('_id');
                    done();
                });
        });
    });

    describe('Delete a todo', function () {
        var id;
        before(function (done) {
            var params = { name: "Todo from hooks to", email: "wweew@gmail.com", password: "ererre" };
            agent
                .post('/users')
                .send(params)
                .end(function (err, result) {
                    id = result.body._id;
                    done();
                })
        });

        it('Should delete the todo by _id', function (done) {
            agent
                .delete(`/users/${id}`)
                .end(function (err, result) {
                    result.body.message.should.equal('User deleted successfully!');
                    done();
                })

        });

    });

    describe('Update a todo', function () {
        var id;
        before(function (done) {
            var newTodo = { name: "Todo from h", email: "weweew@gmail.com", password: "dfdffd" };
            agent
                .post('/users')
                .send(newTodo)
                .end(function (err, result) {
                    id = result.body._id;
                    done();
                })
        });

        it('Should update the completed status of todo by _id to true', function (done) {
            var params = { email: 'lovelove@gmail.com', password: "ddssdsds" };
            agent
                .put(`/users/${id}`)
                .send(params)
                .end(function (err, result) {
                    result.body.email.should.equal('lovelove@gmail.com');
                    done();
                })
        })
    })
})
