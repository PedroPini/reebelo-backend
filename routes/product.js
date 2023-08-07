const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripeModule');

// POST /products/create
router.post('/create', async (req, res) => {
    try {
      const { name, price, description, stock_quantity } = req.body;
      
      const product = await stripe.products.create({
        name,
        description: description,
        metadata: {
            'stock': stock_quantity
        }
      });
  
      await stripe.prices.create({
        product: product.id,
        unit_amount: price * 100, // Stripe expects the amount in cents, so multiply by 100
        currency: 'aud', 
      });
  
      res.json({ message: 'Product created successfully!' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });

  // GET /products/all
  router.get('/all', async (req, res) => {
    try {
      const products = await stripe.products.list({
        limit: 3,
        active: true
      });
      const prices = await stripe.prices.list({
        limit: 3,
        active: true
      });
      res.json({ message: products, prices });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });

  // GET /products/:id
  router.get('/:id', async (req, res) => {
    try {
      const product_id  = req.params.id;
      
    
      const product = await stripe.products.retrieve(
        product_id
      );
      const price = await stripe.prices.search({
        query: `active:\'true\' AND product:"${product_id}"`,
      });
  
      res.json({ message: 'Product Fetched successfully!', data:product, price: price.data[0].unit_amount});
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });

  
// PUT /products/stock
router.put('/stock', async (req, res) => {
  try {
    const { product_id, stock_quantity } = req.body;
    
  
    const product = await stripe.products.update(""+product_id+"",{metadata: {'stock': stock_quantity}}
    );

    

    res.json({ message: 'Product stock updated successfully!' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong.' });
  }
});
  
// PUT /products/price
router.put('/price', async (req, res) => {
  try {
    const { price_id, product_id, new_price } = req.body;
      
    await stripe.prices.update(""+price_id+"",{
      
      active: false
    });

    await stripe.prices.create({
      product: product_id,
      unit_amount: new_price * 100, // Stripe expects the amount in cents, so multiply by 100
      currency: 'aud', 
    });

    res.json({ message: 'Product Price updated successfully!' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


  module.exports = router;