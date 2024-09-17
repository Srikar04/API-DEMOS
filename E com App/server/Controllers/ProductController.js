import Product from "../Components/Product.js";

class ProductController {
  constructor() {
    this.products = [];
  }

  createProduct(productData) {
    const { name, description, price, productStock } = productData;
    const id = this.products.length + 1;
    const newProduct = new Product(id, name, description, price, productStock);
    this.products.push(newProduct);
    return newProduct;
  }

  getAllProducts() {
    return this.products;
  }

  getProduct(productId) {
    return this.products.find((product) => product.getId() === productId);
  }

  purchaseProduct(productId) {
    const product = this.getProduct(productId);
    if (product) {
        const productStock = product.getProductStock();
        if (productStock > 0) {
            product.setProductStock(productStock - 1);
        }
      return product;
    }
    return null;
  }
    
}

export default ProductController;