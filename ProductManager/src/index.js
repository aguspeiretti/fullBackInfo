import ProductManager from "../Managers/productManager.js";

const productManager = new ProductManager();

const pr2 = {
  title: "pantalon",
  description: "short",
  price: 200,
  stock: 10,
  code: 123,
};
const pr1 = {
  title: "remera",
  description: "mc",
  price: 200,
  stock: 10,
  code: 1232,
};

//
// productManager.addProduct(pr1);
// productManager.updateProduct(1, { title: "si se cambio" });
// productManager.getProductById(3)
// productManager.deleteProduct(1);
productManager.getProducts();
