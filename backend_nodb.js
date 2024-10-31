var express = require('express');
var app = express();

// let comments = []; // define a list to store values. DB in this practice.
const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite' //path to db file that will be created
});

const Comments = sequelize.define(
  'Comments',
  {
    // Model attributes are defined here
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  },
);
async function asyncFunction (){
await Comments.sync();
console.log('The table for the Comment model was just (re)created!');
}
asyncFunction();

// `sequelize.define` also returns the model
console.log(Comments === sequelize.models.Comments); // true

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
// index page
app.get('/', async function(req, res) {
  const comments = await Comments.findAll();
  res.render('frontend_db', {comments: comments}); // object transferred to frontend (key, value)
});

app.get('/comment', function(req, res) {
  console.log(req.query)
  res.send('get method')
});

app.post('/comment', async function(req, res) {
  // console.log(req.body)
  const comment = req.body.comment
  // comments.push(comment)
  // Create a new user
  const ID = await Comments.create({ contents: comment });
  console.log("Auto-generated ID:", ID.id);
  //console.log(comments)
  // res.send('post method')
  res.redirect('/')
});

app.listen(3000);
console.log('Server is listening on port 3000');






