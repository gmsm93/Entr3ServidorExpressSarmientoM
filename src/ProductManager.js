// ADMINISTRADOR DE PRODUCTOS
// Permite agregar, consultar, modificar, eliminar y almacenar productos en un archivo JSON
// Creado por Gustavo Miguel Sarmiento Murillo

const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.path = './products.json';
    this.loadProductsFromFile();
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const codeExists = this.products.some((product) => product.code === code);

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("All fields are required");
    } else if (codeExists) {
      console.log("Code already exists");
    } else {
      const newProduct = {
        id: this.getNewID(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
      this.saveProductsToFile();
      console.log("Product was successfully saved");
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProductsToFile();
      console.log("Product updated successfully");
    } else {
      console.log("Product not found");
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProductsToFile();
      console.log("Product deleted successfully");
    } else {
      console.log("Product not found");
    }
  }

  getNewID() {
    if (this.products.length === 0) {
      return 1; // Si no existe ningún producto, comenzará con el ID 1
    } else {
      const maxID = Math.max(...this.products.map((product) => product.id));
      return maxID + 1; // Se incrementará el último ID registrado en 1 para el nuevo producto a registrar
    }
  }

  saveProductsToFile() {
    const productsJSON = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, productsJSON, 'utf-8');
  }

  loadProductsFromFile() {
    try {
      const fileExists = fs.existsSync(this.path);
      if (fileExists) {
        const productsJSON = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(productsJSON);
      } else {
        console.log("JSON File does not exist. It will be created.");
        fs.writeFileSync(this.path, '[]', 'utf-8');
      }
    } catch (err) {
      console.log("There is an error while reading file:", err.message);
      this.products = [];
    }
  }
  
  getProductById(id) {
    const productFound = this.products.find((product) => product.id === id);
    if (productFound) {
      return productFound;
    } else {
      return null;
    }
  }
}

module.exports = ProductManager;

const productManager = new ProductManager();
productManager.addProduct("Camiseta", "Camiseta Nike", 39, "shirt.jpg", "SHIRT001", 10);
productManager.addProduct("Jeans", "Jean Levis Clasico", 59, "pants.jpg", "PANTS001", 5);
productManager.addProduct('Celular','SAMSUNG Galaxy M13 128 GB',650,"url2","CEL12322",3) 
productManager.addProduct('Plancha','Plancha A Vapor OSTER 2122070',70,"url3","PL43221",6) 
productManager.addProduct('Plancha2','Plancha A Vapor2',70,"url3","PL457775",6) 
console.log(productManager.getProducts())

// Es importante tener en cuenta que solo registra productos que tenga diferente codigo en el campo "Code"
