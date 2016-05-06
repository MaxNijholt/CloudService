var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

var app = require('express')();
var users = require('../routes/Users');
app.use('/', users);

function makeRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

describe('Testing users route', function(){
	describe('without params', function(){
		it('should return correct json', function(done){

			makeRequest('/', 200, function(err, res){
				if(err){ return done(err); }
				res.body.forEach(function(item){
                    expect(item).to.have.property('_id');
                    expect(item).to.have.property('username');
                });
				done();
			});
		});
	});
    
    describe('with invalid params', function(){
		it('should return 400 when username is invalid', function(done){
			makeRequest('/Sukkel', 400, done);
		});
        it('should return 400 when username is invalid', function(done){
			makeRequest('/Sukkel/Buddies', 400, done);
		});
	});
    
    describe('with valid params', function(){
		it('should return the right user', function(done){
			makeRequest('/Max%20Nijholt', 200, function(err, res){
				if(err){ return done(err); }

				res.body.forEach(function(item){
                    expect(item).to.have.property('_id');
                    expect(item).to.have.property('username');
                    expect(item.username).to.equal('Max Nijholt');
                });
				done();
			});
		});
	});
    
    describe('with valid params', function(){
		it('should return a list of buddies from the right user', function(done){
			makeRequest('/Bram%20Hendriks/Buddies', 200, function(err, res){
				if(err){ return done(err); }
                
                res.body.forEach(function(item){
                    expect(item).to.have.property('name');
                    expect(item).to.have.property('champion');
                    expect(item).to.have.property('username');
                    expect(item.username).to.equal('Bram Hendriks');
                });
				done();
			});
		});
	});
});

