//All dependencies here.....
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const Message = require('./model/message');

//App initialization
const app = express();

//mongoose connection here
const remoteURI =
  'mongodb+srv://linux:roshan@cluster0.gvnig.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const localURI = 'mongodb://127.0.0.1:27017/contacts';
mongoose
  .connect(remoteURI)
  .then(() => {
    console.log('Connection Established Successfully');
  })
  .catch((e) => {
    console.log(e);
  });

//Setting up view enjine as ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//All middlewares here
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
const checkPassword = async (req, res) => {
  const { username, password } = req.body;
  if (username === 'roshan' && password === 'machinegun') {
    const messages = await Message.find({});
    res.render('admin/index', { messages });
  } else {
    res.send('Invalid Password');
  }
};

//All routes here
app.get('/', (req, res) => {
  res.render('client/index');
});

app.post('/contact', async (req, res) => {
  const newMessage = new Message(req.body);
  await newMessage
    .save()
    .then(() => {
      console.log('Saved!!!');
    })
    .catch((e) => {
      console.log(e);
    });
  res.redirect('/');
});

app.get('/admin', async (req, res) => {
  res.render('admin/auth');
});

app.post('/auth', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  res.redirect('admin/index');
});
app.get('/admin/index', checkPassword, async (req, res) => {});
//App is listening to http://localhost:3000/
app.listen(3000, () => {
  console.log('Listening to port 3000');
});
