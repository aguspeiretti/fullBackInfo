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

// EXPRESS ROUTER

//nos va a servir para separar endpoints que tengan en comun una entidad

//creamos una carpeta routes
//creamos un archivo en el que vamos a colocar los endpoints ej products.router.js

// importamos route de express

// import { Router } from "express";

//inicializo con const router = Router()

//exporto el router export default router

//importe el router en mi app.js

// import ProductsRouter from "./routes/products.router.js";

//en el router en vez de poner app.get app,put vamos a cambiar todos por router que es la constante q creamos arriba

// inicializo app.use(express.urlencoded({extended:true}))

//app.use("/products", ProductsRouter)-> cuando te llegue peticion de products lo redirigis a ProductRouter

// una vez echo esto quitamos la palabra del router que tienen en comun para que no se repita /products/products

//SERVICIO DE ARCHIVOS ESTATICOS

//PARA PODER CARGAR ARCHIVOS

//en la carpeta src voy a crear la carpeta public
//aca voy a poner todas las imagenes ya sean cargadas por mi o por el usuario que quiero que se puedan acceder publicamente

//para esto voy a agregar app.use(express.static("./src/public"))-> y le vamos a pasar la ruta en la que vamos a permitir acceder

//puedo crear un archivo index.html para virtualizarlo y por ejemplo puedo agregar un formulario para ingresar los productos o lo que quiera

//creamos un servicio de ruta absoluta

//creamos un archivo utils.js a la altura de app.js y pegamos dentro el codigo

// import {fileURLToPath} from 'url';

// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = dirname(__filename);

// export default __dirname;

// minuto 1.04
