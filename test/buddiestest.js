var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

var app = require('express')();
var buddies = require('../routes/Buddies');
app.use('/', buddies);

function makeRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

describe('Testing buddies route', function(){
	describe('without params', function(){
		it('should return correct json', function(done){
			var expected = {
                options: {
                    limit: 25,
                    skip: 0
                }
            };

			makeRequest('/', 200, function(err, res){
				if(err){ return done(err); }
				expect(res.body).to.have.property('filter');
				expect(res.body).to.have.property('options');
                expect(res.body).to.have.property('data');
				expect(res.body.data).to.not.be.undefined;
				expect(res.body.filter).to.be.empty;
				expect(res.body.options.limit).to.equal(expected.options.limit);
				expect(res.body.options.skip).to.equal(expected.options.skip);
				done();
			});
		});
	});
    
    describe('with invalid params', function(){
		it('should return 400 when name is invalid', function(done){
			makeRequest('/Sukkel', 400, done);
		});
	});
    
    describe('with valid params', function(){
		it('should return the right buddy', function(done){
			makeRequest('/TestChamp', 200, function(err, res){
				if(err){ return done(err); }

				expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('champion');
				expect(res.body).to.have.property('username');
				expect(res.body).to.have.property('date');
				expect(res.body.date).to.equal('2016-05-03T09:02:26.837Z');
				done();
			});
		});
	});
});

