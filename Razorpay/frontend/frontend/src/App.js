import React, { Component } from 'react'
import Axios from 'axios'
export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }

  }

  async razorPayPaymentHandler() {
    console.log("In razorpay");
    const API_URL = `http://localhost:8080/razorpay/`
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    console.log("App -> razorPayPaymentHandler -> data", data)
    
    const options = {
      key: 'rzp_test_W9Fe00KWuI137O',
      name: "Krutika",
      description: "Payment for testing",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await Axios.post(url)
         const successObj = JSON.parse(captureResponse.data)
         const captured = successObj.captured;
         console.log("App -> razorPayPaymentHandler -> captured", successObj)
         if(captured){
             console.log('success')
             const body ={
               "payment_id": successObj.id,
               "amount": successObj.amount,
               "order_id": successObj.order_id,
               "email": successObj.email,
               "contact": successObj.contact
             };
             const savedetail = "http://localhost:8080/create/";
             const resDataSql = await Axios.post(savedetail,body);
             console.log(resDataSql);
            //  const redisUrl = "https://localhost:8080/create/redis";
            //  const redisreply = await Axios.post(redisUrl,body);
            //  console.log("Redis :",redisreply);
         }
         
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  
  render() {
    return (
      <div>
        <button 
        onClick={this.razorPayPaymentHandler}
        className="btn btn-primary">
          Pay Now
        </button>
      </div>
    )
  }
}

export default App