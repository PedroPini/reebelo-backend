var express = require('express');
const bodyParser= require('body-parser');
var app = express();
const cors = require('cors');
require('dotenv').config()
let cache = require('apicache').middleware
var corsOptions = {
  origin: [process.env.FRONTEND_URL || 'http://localhost:3001', process.env.MY_MACHINE],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cache('10 minutes'))
const stripe = require('./utils/stripeModule');
const swaggerUi = require('swagger-ui-express');
const specs = require('./openapi');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const shippingRoute = require('./routes/shipping');
// Import the Swagger JSDoc file

app.use('/order', orderRoute);
app.use('/product', productRoute);
app.use('/shipping', shippingRoute);
// Add Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.post('/createUser', async (req, res) => {
    const { name, email } = req.body;
    const customer = await stripe.customers.create({
        name,
        email,
        description: `User ${name} and Email ${email} created sucessfully`,
      }, {
        idempotencyKey: 'tMVqhAYOa9PhLIXX',
      });
});



app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

