//Using postman to check responses from route
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'super_secret_unbreakable_token', (err, authData) => {
    if (err) {
      res.status(403).json({
        message: "Token is invalid"
      });
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});  

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'John Doe',
    email: 'johndoe@gmail.com'
  }
  jwt.sign({user}, 'super_secret_unbreakable_token', (err,token) => {
    res.json({
      token
    })
  })
})

//FORMA OF TOKEN
//Authorization: Bearer <access_token>
//Verify Token

function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers['authorization'];

  //Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({
      message: 'Authentication token is missing!'
    })
  }
}

app.listen(5000, () => console.log('Server started on port 5000'));