
// .netlify/functions/create-payment-intent
//load .env file, becuase we cannot access .env using import and export
//so we need dontenv package
require('dotenv').config()

//we pass our secret key from our environment varible doc so when we push into github we won't sharing our secret key 
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function(event,context){
    if(event.body){
    const {cart,shipping_fee,total_amount} = JSON.parse(event.body)

    console.log(cart)
    
    const calculateOrderAmount = ()=>{
        return shipping_fee + total_amount
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:calculateOrderAmount(),
            currency:'usd',
        })
        return {
            statusCode:200,
            body: JSON.stringify({clientSecret:paymentIntent.client_secret})
        }
    } catch (error) {
        return {
            statusCode:500,
            body:JSON.stringify({error:error.message})
        }
    }

    }

    return {
        statusCode:200,
        body:'Create payment Intent'
    }
}