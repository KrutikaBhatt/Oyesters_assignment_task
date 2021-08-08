const { sequelize } = require(".");

module.exports = (sequelize,Sequelize) =>{
    const payment = sequelize.define("payment",{
        payment_id :{
            type :Sequelize.STRING,
            allowNull: false
        },
        amount:{
            type:Sequelize.STRING,
            allowNull: false
        },
        order_id :{
            type:Sequelize.STRING,
            allowNull: false
        },
        email :{
            type:Sequelize.STRING,
            allowNull: false
        },
        contact :{
            type:Sequelize.STRING,
            allowNull: false
        },
        date:{
            type:Sequelize.DATE
        }

    });
    return payment;
};