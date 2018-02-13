"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

const UserModel = require('../../../models/users');

describe('User controller testing', () => {
    describe('Post test', () => {
        it('Should save todo', function (done) {
			var userMock = sinon.mock(new UserModel({
                name: "Test todo from mock",
                email: "nffbbff",
                password: "rhfhhfhf"
            }));
			var user = userMock.object;

			userMock
			.expects('save')
			.yields(null, 'SAVED');

			user.save(function(err, result) {
				userMock.verify();
				userMock.restore();
				should.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});
    });

    describe('Get all Todo test', function () {
		it('Should call find once', function (done) {
			var UserMock = sinon.mock(UserModel);
			UserMock
			.expects('find')
			.yields(null, 'USERS');

			UserModel.find(function (err, result) {
				UserMock.verify();
				UserMock.restore();
				should.equal('USERS', result, "Test fails due to unexpected result")
				done();
			});
		});
    });

    describe('Get by Id', () => {
        it('should get a user', (done) => {
            let userMock = sinon.mock(UserModel);
            userMock
            .expects('findById')
            .withArgs({_id: 12344})
            .yields(null, 'USER')

            UserModel.findById({_id: 12344}, (err, result) => {
                userMock.verify();
                userMock.restore();
                should.equal('USER', result, "Error here ")
                done();
            })
        })
    })

    describe('Delete todo test', function () {
		it('Should delete todo of gived id', function (done) {
			var UserMock = sinon.mock(UserModel);

			UserMock
			.expects('remove')
			.withArgs({_id: 12345})
			.yields(null, 'DELETED');

			UserModel.remove({_id: 12345}, function(err, result){
				UserMock.verify();
				UserMock.restore();
				done();
			})
		});
    });

    describe('Update a todo', function () {
		it('Should update the todo with new value', function (done) {
			var userMock = sinon.mock(new UserModel({ todo: 'Save new todo from mock'}));
			var user = userMock.object;

			userMock
			.expects('save')
			.withArgs({_id: 12345})
			.yields(null, 'UPDATED');

			user.save({_id: 12345}, function(err, result){
				userMock.verify();
				userMock.restore();
				done();
			})

		});
	});
})
