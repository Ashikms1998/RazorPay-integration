import phone from '/smartphone-NVTJBMY2U6.svg'
const Product = () => {

const payNow = async(e)=>{

const amount = 15000000
const currency = "INR"
const receiptId = '55asdad55qw'


const response = await fetch('http://localhost:5000/order', {
  method: "POST",
  body: JSON.stringify({
    amount,
    currency,
    receipt: receiptId,
  }),
  headers: {
    "Content-Type": "application/json",
  },
})
   const order = await response.json()
    console.log(order)

var options = {
    "key": "rzp_test_yeL2dUJ4nZYpET", // Enter the Key ID generated from the Dashboard
    amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency,
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": async function (response){
        const body = {
          ...response
        }
        const validateResponse = await fetch("http://localhost:5000/order/validate",{
          method:"POST",
          body:JSON.stringify(body),
          headers:{
            "Content-Type":"application/json"
          }
        })
        const jsonRes = await validateResponse.json()
        console.log("💀",jsonRes)
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Don Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
console.log("🦹‍♀️",options)
var rzp1 = new window.Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
})
 rzp1.open();
    e.preventDefault();
}



  return (
    <>
    <h2>Mobile Phone</h2>
    <p>Samsung S25 Ultra Pro Max</p>
    <img src={phone}></img>
    <button onClick={payNow}>Pay Now</button>
    </>
  )
}

export default Product