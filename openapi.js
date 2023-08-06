const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reebelo Backend',
      version: '1.0.0',
      description: 'API to retrieve products, orders and shipment information',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update with your server URL
      },
    ],
  },
  apis: ['./docs/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
