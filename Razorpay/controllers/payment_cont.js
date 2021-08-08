const db = require('../models');
const payment = db.payment;
const Op = db.Sequelize.Op;

// Redis
const redis = require('redis');

// Create Redis Client
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to Redis...');
});

exports.create = (req,res) =>{
  console.log(req.body);
    if (!req.body.payment_id) {
        res.status(400).send({
          message: "Payment Id can not be empty!"
        });
        return;
      }

      const new_payment = {
        payment_id: req.body.payment_id,
        amount: req.body.amount,
        order_id : req.body.order_id,
        email : req.body.email,
        contact : req.body.contact,
        date: Date.now()
      };
      console.log(new_payment);

      payment.create(new_payment)
        .then(data => {
            console.log(data);
          res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Tutorial."
            });
          });
};

exports.create_using_redis = (req,res) =>{
    if (!req.body.payment_id) {
        res.status(400).send({
          message: "Payment Id can not be empty!"
        });
        return;
    }
    
    const payment_id = req.body.payment_id;
    const amount = req.body.amount;
    const date= Date.now();
    const order_id = req.body.order_id;
    const email = req.body.email;
    const contact = req.body.contact;
  
    
    client.hmset(payment_id, [
        'amount', amount,
        'date', date,
        'order_id',order_id,
        'email' , email,
        'contact',contact
    ], function(err, reply){
        if(err){
            console.log(err);
        }
        console.log(reply);
        res.send(200).send(reply);
    });

};