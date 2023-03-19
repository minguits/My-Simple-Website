const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.use(express.static('public'));

app.post('/register', (req, res) => {
  const { username, password, name, age } = req.body;
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    res.send('User already exists');
  } else {
    users.push({ username, password, name, age });
    res.send('Registration Successful');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.send(`Welcome ${user.name}. Your age is ${user.age}.`);
  } else {
    res.send('Invalid Username or Password');
  }
});

app.post('/logout', (req, res) => {
  res.send('You have been logged out');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
