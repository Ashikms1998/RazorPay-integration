const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require('crypto')
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

console.log("ansnd",process.env.RAZORPAY_KEY_ID,"akskd",process.env.RAZORPAY_SECRET_KEY)

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }
    res.json(order);
  } catch (err) {
    console.log("error in razorpay", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});


app.post('/order/validate',async(req,res)=>{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body

  const sha = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY)
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
  const digest = sha.digest('hex')
  if(digest!=razorpay_signature){
    return res.status(400).json({msg:"Transaction is not legit!"})
  }
   return res.status(200).json({ msg: "Payment verified successfully!" });
})

app.listen(PORT, () => {
  console.log("Listning in 5000 port");
});
