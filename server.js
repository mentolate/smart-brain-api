const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'smartbrain',
    password : 'ballena',
    database : 'smartapi'
  }
});



const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.use(cors())
app.use(express.json());



app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, knex)})
app.put('/image', (req, res) => { image.handleImage(req, res, knex)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3001, () => {
	console.log('app is running on port 3001 wacho');
})