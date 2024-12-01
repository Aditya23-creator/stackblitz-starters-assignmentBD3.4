const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let obj = { productId, name, price, quantity };
  cart.push(obj);
  res.json({ cartItems: cart });
});

//Endpoint 2: Edit Quantity of an Item in the Cart

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  for (let item of cart) {
    if (item.productId === productId) {
      item.quantity = quantity;
      break;
    }
  }
  res.json({ cartItems: cart });
});

//Endpoint 3: Delete an Item from the Cart

app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);
  cart = cart.filter((item) => item.productId !== productId);
  res.json({ cartItems: cart });
});

//Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = 0;
  for (let item of cart) {
    totalQuantity += item.quantity;
  }
  res.json({ totalQuantity: totalQuantity });
});

//Endpoint 6: Calculate Total Price of Items in the Cart

app.get('/cart/total-price', (req, res) => {
  let totalPrice = 0;
  for (let item of cart) {
    totalPrice += item.price * item.quantity;
  }
  res.json({ totalPrice: totalPrice });
});
