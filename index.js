var express = require('express');
const bodyParser= require('body-parser');
var app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(bodyParser.json());
const stripe = require('./utils/stripeModule');
const swaggerUi = require('swagger-ui-express');
const specs = require('./openapi');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const shippingRoute = require('./routes/shipping');

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



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

