# reebelo-backend

## Introduction

This project is built using Node.js, Express.js, and other related technologies.

## Installation

### 1. Clone the repository:

   ```git clone https://github.com/PedroPini/reebelo-backend.git```
   
### 2. Install required NPM packages: 
   
```npm install```

### 3. Create a .env file: 
   Some parameters are
```FRONTEND_URL, MY_MACHINE, STRIPE_KEY, PORT, RENDER_URL```

```MY_MACHINE, FRONTEND_URL``` are to allow cors to you local PC when acessing swagger ```localhost:300/api-docs``` and to the exposed frontend URL being able to fetch the data from NODE JS

```RENDER_URL ``` is to be the url that swagger will use it for api-docs requests

### 2. Start the project: 
   
```npm start```
