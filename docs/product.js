/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               stock_quantity:
 *                 type: integer
 *             required:
 *               - name
 *               - price
 *               - stock_quantity
 *     responses:
 *       200:
 *         description: Product created/updated successfully!
 *       500:
 *         description: Something went wrong.
 */

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns a list of products and prices
 *       500:
 *         description: Something went wrong.
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product Fetched successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     metadata:
 *                       type: object
 *                       properties:
 *                         stock:
 *                           type: integer
 *                     active:
 *                       type: boolean
 *                 price:
 *                   type: integer
 *       500:
 *         description: Something went wrong.
 */

/**
 * @swagger
 * /product/stock:
 *   put:
 *     summary: Update product stock quantity
 *     tags: [Products]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *               stock_quantity:
 *                 type: integer
 *             required:
 *               - product_id
 *               - stock_quantity
 *     responses:
 *       200:
 *         description: Product stock updated successfully!
 *       500:
 *         description: Something went wrong.
 */

/**
 * @swagger
 * /product/price:
 *   put:
 *     summary: Update product price
 *     tags: [Products]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               new_price:
 *                 type: number
 *             required:
 *               - price_id
 *               - product_id
 *               - new_price      
 *     responses:
 *       200:
 *         description: Product updated successfully!
 *       500:
 *         description: Something went wrong.
 */
