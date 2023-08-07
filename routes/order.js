const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripeModule');
const INITIAL_ORDER_STATUS = 'processing'

router.post('/create', async (req, res) => {
    try {
      const { customer_id, price_id, quantity, product_id } = req.body;
        
      const invoiceItem = await stripe.invoiceItems.create({
        customer: customer_id,
        price: price_id,
        quantity: quantity
      });
      
      const Invoice = await stripe.invoices.create({
        customer: customer_id,
        metadata: {
            'invoiceItem': invoiceItem.id,
            'status': INITIAL_ORDER_STATUS
        }         
      });
      
      const product = await stripe.products.retrieve(
        product_id
      );
      const product_update = await stripe.products.update(""+product_id+"",{metadata: {'stock': product.metadata.stock - quantity}}
      );
  
      // Respond with the order confirmation
      res.status(200).json({ message: 'Order created successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the order.' });
    }
  });

  router.put('/update', async (req, res) => {
    try {
      const { invoice_id, status } = req.body;
      //I could have used finalizeInvoice finalize, pay, send from STRIPE
      // Create a new order using Stripe API
      const paymentLink = await stripe.invoices.update(""+invoice_id+"",{metadata: {'status': status}});
  
      // Respond with the order confirmation
      res.status(200).json({ message: 'Order updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the order.' });
    }
  });

  router.get('/all', async (req, res) => {
    try {
      const invoices = await stripe.invoices.list({
        limit: 100,
      });
      const invoiceItems = await stripe.invoiceItems.list({
        limit: 100,
      });
  
      // Respond with the order confirmation
      res.status(200).json({ data:invoices, items:invoiceItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching all the orders.' });
    }
  });

  
  
  module.exports = router;