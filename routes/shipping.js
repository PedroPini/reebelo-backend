const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripeModule');

//Constants
const FIXED_SHIPPING_AMOUNT = 500;
const SHIPPING_CURRENCY = 'aud';
const SHIPPING_CITY = 'Melbourne';
const SHIPPING_STATE = 'VIC';
const SHIPPING_ZIP = '3000';
const SHIPPING_COMPANY = 'DHL';
const SHIPPING_TYPE = 'fixed_amount';
const SHIPPING_ESTIMATE_DAYS = {
    minimum: { unit: "business_day", value: 5 },
    maximum: { unit: "business_day", value: 7 },
  };

function DateEstimate(date){
const now = new Date();

// Add 7 days to the current date
const DaysLater = new Date(now);
DaysLater.setDate(now.getDate() + date);

// Format the result
return DaysLater.toISOString().slice(0, 10);

}

router.post('/create', async (req, res) => {
try {
    const { invoice_id } = req.body;


    const shipping = await stripe.shippingRates.create({
    display_name: SHIPPING_COMPANY,
    type: SHIPPING_TYPE,
    fixed_amount: {amount: FIXED_SHIPPING_AMOUNT, currency: SHIPPING_CURRENCY},
    delivery_estimate: SHIPPING_ESTIMATE_DAYS,
    metadata: {city: SHIPPING_CITY, state: SHIPPING_STATE, zip:SHIPPING_ZIP}
    });
    
    
    
    const invoice = await stripe.invoices.update(""+invoice_id+"",{
    metadata: {id:shipping.id, active: shipping.active, delivery_estimate: DateEstimate(shipping.delivery_estimate.maximum.value), courier: shipping.display_name, amount:shipping.fixed_amount.amount, city:shipping.metadata.city, state:shipping.metadata.state, zip:shipping.metadata.zip}
    
    });

    // Respond with the order confirmation
    res.status(200).json({ message: 'Shipping created successfully!' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the order.' });
}
});  




module.exports = router;