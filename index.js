
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length

/* BEGIN - create routes here */
app.use(bodyParser.json()
)
// GET all
app.get('/users', (req, res) => {
  console.log("this is a get all request")
  res.json(users)
})
// GET user id
app.get('/users/:userId', (req, res) =>{
  console.log("this requests a user by ID")
  console.log(req.params.userId)
  // the .some method returns false if no user._id matches the requests's userID
  if(!users.some(user => user._id == req.params.userId)){
    res.status(400).json({ msg: `No user with an ID of ${req.params.userId}`})
    // the .filter method returns the element[s] of the users array that pass the test
  } else res.json(users.filter(user => user._id == req.params.userId))
})
// POST
app.post('/users', (req, res) =>{
  console.log('this adds a user')
  console.log(req.body)
  // New objects must have a name, occupation, and avatar.
  // If the body doesn't include these things, the response in a 400.
  if (!req.body.name || !req.body.occupation || !req.body.avatar) {
    return res.status(400).json({ msg: "Please include a name, occupation, and avatar."})
  }
  // counter's sole purpose is assigning a new ID to each POST
  counter++
  // We create a new object,  declare keys, and use values from req.body
  const newUser = {
    _id: counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  console.log(newUser)
  // We push the newly created object to the users array and return
  // the newly created object as a response.
  users.push(newUser)
  res.json(users.filter(user => user._id == counter))
})
// PUT
app.put('/users/:userId', (req, res) =>{
  console.log("this updates a user's data")
  // Trying to alter data
  users[req.params.userId - 1]
  res.json(users.filter(user => user._id == req.params.userId))
})
// DELETE
app.delete('/users/:userId', (req, res) =>{
  console.log('this deletes a user')
  res.send('deleted!')
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))