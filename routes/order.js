/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders.
 * 
 * /order/all:
 *   get:
 *     summary: Get all invoices and invoice items from Stripe
 *     tags: [Orders]
 *     description: Retrieve a list of invoices and invoice items from Stripe.
 *     responses:
 *       200:
 *         description: Successful response with invoice and invoice item data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Array of invoices from Stripe.
 *                   items:
 *                     type: object
 *                     description: Invoice object from Stripe.
 *                     # Add more details about the properties in the Stripe invoice object here if needed.
 *                 items:
 *                   type: array
 *                   description: Array of invoice items from Stripe.
 *                   items:
 *                     type: object
 *                     description: Invoice item object from Stripe.
 *                     # Add more details about the properties in the Stripe invoice item object here if needed.
 *       500:
 *         description: Internal server error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the issue.
 *                   example: An error occurred while processing the order.
 * /order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               quantity:
 *                 type: number
 *               product_id:
 *                 type: string
 *             example:
 *               customer_id: cus_OO6QqWOYBmZBrx
 *               quantity: 2
 *               product_id: prod_OOA0ARNhKAzKkE
 *               price_id: price_1NbNgeFiq7mJBxF3iilgzAE8
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 * 
 * /order/update:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_id:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               invoice_id: in_1NbLc3Fiq7mJBxF30S5LBeHv
 *               status: paid
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 * 
 *              
 *               
 */

const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripeModule');



  


router.post('/create', async (req, res) => {
    try {
      const { customer_id, price_id, quantity, product_id } = req.body;
        
      const invoiceItem = await stripe.invoiceItems.create({
        customer: customer_id,
        price: price_id,
        quantity: quantity
      });
      // Create a new order using Stripe API
      const Invoice = await stripe.invoices.create({
        customer: customer_id,
        metadata: {
            'invoiceItem': invoiceItem.id
        }
                
      });
      
      
      const product = await stripe.products.retrieve(
        product_id
      );
      const product_update = await stripe.products.update(""+product_id+"",{metadata: {'stock': product.metadata.stock - quantity}}
      );
  
      // Respond with the order confirmation
      res.status(200).json({ clientSecret: product_update.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the order.' });
    }
  });

  router.put('/update', async (req, res) => {
    try {
      const { invoice_id, status } = req.body;
      //finalizeInvoice finalize, pay, send
      // Create a new order using Stripe API
      const paymentLink = await stripe.invoices.update(""+invoice_id+"",{
        status: status
        
      });
  
      // Respond with the order confirmation
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the order.' });
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
      res.status(500).json({ error: 'An error occurred while processing the order.' });
    }
  });

  
  
  module.exports = router;