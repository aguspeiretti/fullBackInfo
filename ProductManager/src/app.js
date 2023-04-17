//manejar los archivos mediante postman

//lo primero que tenemos que hacer es instalar express y nodemon en la terminal con el comando
//npm install nodemon
//npm install express
//una vez instalado lo inicializamos con

import express from "express";

//lo inicializamos con

const app = express();
//le desimos que tipo de archivo vamosa a tratar con
app.use(express.json());

// y escuchamos el puerto con

app.listen(8080, () => {
  // le decimos a express que escuche el puerto 8080 y que nos devuelva en callback un listening...
  console.log("listening..");
});
//esto puede ir al final

import ProductManager from "../Managers/productManager.js"; //importamos el manager q hayamos creado

const productManager = new ProductManager();
// iniciamos un nuevo manager

const products = productManager.getProducts();
// utilizamos la funcion de nuestro manager para traer los productos del archivo

let productoPrueba = [
  {
    titulo: "hola",
    contenido: "chau",
  },
];

app.get(`/products/`, async (req, res) => {
  //busco los productos en la db y respondo con ellos
  const allProducts = await products; // creo una constante q guarde los productos q traigo con el pmanager
  res.send(allProducts); //envio o respondo con los productos
});

app.post(`/products/`, async (req, res) => {
  try {
    const allProducts = await products; // creo una constante q guarde los productos q traigo con el pmanager
    const newContent = req.body; // el body q le voy a pasar en postman va a ser = a el archivo a pushear
    //agregar productos a mi archivo
    allProducts.push(newContent); //  envio el objeto a mi array
    res.send({ status: "succes", message: "product posted" });
  } catch (error) {
    console.log(error);
  }
});

app.put(`/products/:pId`, async (req, res) => {
  //modificar productos en mi archivo
  const allProducts = await products;
  const id = req.params.pId; //->guardo en una constante el id del prod q quiero modificar
  const newContent = req.body; // el body q le voy a pasar en postman va a ser = a el archivo a pushear para modificar
  const productIndex = allProducts.findIndex((p) => p.id == id);
  if (productIndex === -1) {
    return res.status(404).send({ status: "error", error: "not found" });
  }
  allProducts[productIndex] = newContent;
  res.send({ status: "succes", message: "product updated" });
});
app.delete("/products/:pId", async (req, res) => {
  //eliminar productos en mi archivo
  const allProducts = await products;
  const id = req.params.pId; //->guardo en una constante el id del prod q quiero modificar
  const productIndex = allProducts.findIndex((p) => p.id == id);
  if (productIndex === -1) {
    return res.status(404).send({ status: "error", error: "not found" });
  }
  allProducts.splice(productIndex, 1);
  res.send({ status: "succes", message: "product deleted" });
});
