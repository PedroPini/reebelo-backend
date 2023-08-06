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