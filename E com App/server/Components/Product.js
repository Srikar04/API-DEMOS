class Product {
  constructor(id, name, description, price, productStock) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.productStock = productStock;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPrice() {
    return this.price;
  }

  getProductStock() {
    return this.productStock;
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setPrice(price) {
    this.price = price;
  }

  setProductStock(productStock) {
    this.productStock = productStock;
  }
}

export default Product;