const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./models');
const sql_routes = require('./routes/payment_sql');
const razorpay_routes = require('./routes/razorpay_routes');
const methodOverride = require('method-override');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to server" });
});
app.use('/create',sql_routes);
app.use('/razorpay',razorpay_routes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
