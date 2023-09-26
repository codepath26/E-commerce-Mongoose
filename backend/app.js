const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const errorController = require('./controllers/error');


const User = require('./models/user');


const app = express();
app.use(cors());

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findById('6512d63a89c88275712492df')
    .then(user => {
       req.user = user;
      console.log('user created',req.user)
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);
const dbURI = 'mongodb+srv://user:user123@mynew.ixwflah.mongodb.net/shop?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>{
  // if no argument is given then findone method give the first data of the database
  User.findOne().then(user =>{
    if(!user){
      const user = new User({
        name : "Parth",
        email : "text@gamil.com",
        cart : {
          items : []
        }
      });
      
        user.save();

    }
  })


  console.log('Connected to MongoDB');
   app.listen(4000);
 }).catch(err=>
  {console.log("err",err)});





