/**
 * @swagger
 * tags:
 *   name: Shipping
 *   description: Endpoints related to Stripe payment and shipping functionalities
 */

/**
 * @swagger
 * /shipping/create:
 *   post:
 *     summary: Create a new order and calculate shipping rates
 *     tags: [Shipping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_id:
 *                 type: string
 *                 description: The ID of the invoice associated with the order.
 *             example:
 *               invoice_id: "invoice_12345"
 *     responses:
 *       200:
 *         description: Returns the client secret for the created order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   description: The client secret for the created order.
 *                   example: "sk_test_abcdefghijklmnopqrstuvwxyz"
 *       500:
 *         description: An error occurred while processing the order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 *                   example: "An error occurred while processing the order."
 */