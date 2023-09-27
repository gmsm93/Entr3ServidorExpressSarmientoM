// Servidor para consulta de productos desde el administrados de productos con un servidor Express
// Permite consultar toda la base de datos en formato JSON, filtrarla con un Limit y buscar productos por ID
// Creado por Gustavo Miguel Sarmiento Murillo

const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager();

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(Number(pid));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
