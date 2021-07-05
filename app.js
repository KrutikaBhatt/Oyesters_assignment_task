const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

require('./config/passport-local')(passport);


// DB connection
const db = require('./config/db.config').CONNECTION_URL;
mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify',false);

// Middleware
app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({secret: 'secret',resave: true,saveUninitialized: true})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// Routes
app.use('/',require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api',require('./routes/api'));
app.use('/task',require('./routes/task'));

const PORT =process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Node server running on PORT ${PORT}`);
})