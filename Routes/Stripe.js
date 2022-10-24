import {Router} from "express"
import stripe from "stripe"

const stripeRouter  = Router()

const stripeKey = stripe("sk_test_51KhkygGTaC45i0AutbATOMW0uxWsIA1d1uCFdWcgJsJ9wHvO4BLXfVSa1dRyZrA3mJkmQKzumzDenpzZ64c5K6HH00PaoOEog2")

stripeRouter.post("/",async (req, res) => {
  stripeKey.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default stripeRouter;