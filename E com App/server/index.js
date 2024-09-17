import express from 'express';
import bodyParser from 'body-parser';
import ProductController from './Controllers/ProductController.js';
import UserController from './Controllers/UserController.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const productController = new ProductController();
const userController = new UserController();

app.get("/products", (req, res) => {
  const products = productController.getAllProducts();
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productController.getProduct(productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/products", (req, res) => {
    const newProduct = productController.createProduct(req.body);
    res.status(201).json(newProduct);
});

app.post("/products/:id/purchase", (req, res) => {
    const productId = parseInt(req.params.id);
    const userId = req.body.userId;
    const user = userController.getUser(userId);
    if (user) {
        const purchasedProduct = productController.purchaseProduct(productId);
        if (purchasedProduct) {
            res.status(200).json(purchasedProduct);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.post("/users", (req, res) => {
  const newUser = userController.createUser(req.body);
  res.status(201).json(newUser);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userController.getUser(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
