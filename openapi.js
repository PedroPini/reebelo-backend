const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config()
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
        url: process.env.FRONTEND_URL || 'http://localhost:3000',
      },
    ],
  },
  apis: ['./docs/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
