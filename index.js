
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.use(bodyParser.json()
)

app.get('/users', (req, res) => {
  console.log("this is a get all request")
  res.json(users)
})
app.get('/users/1', (req, res) =>{
  console.log("this requests the first user")
  res.json(users[0])
})
app.post('/users', (req, res) =>{
  console.log('this adds a user')
  console.log(req.body)
  users.push(req.body)
  res.json(users[users.length - 1])
})
app.put('/users/1', (req, res) =>{
  console.log('this updates user 1 data')
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))