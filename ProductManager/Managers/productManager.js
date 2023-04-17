//inicializar mi paquete json con npm init -y y agregandole el type module
//para poder manejar archivos con file sistem
//ya puedo importar fileSistem con el comando import fs from 'fs'

import { log } from "console";
import fs from "fs";

// fs comandos:

// un comando importantisimo es:
//const data = fs.existsSync(this.path)->para verificar si existe algun archivo en la ruta.
//si existe lo podemos leer y sino podemos devolver un array vacio por ejemplo

//fs.promises.writeFile(this.path,JSON.stringify("array q quiero pasar o crear"),null,'\t') ->
//para crear un documento o sobreescribirlo

//const info = fs.promises.readFile(this.path,"utf-8")->
//traerme la informacion q se encuentra en un lugar especifico
//con esa info la parseo para leerla como json
// const x = JSON.parce(info)

//como nos vamos a majar en un entorno asyncrono debemos usar el async await en las funciones para esperar
//los resultados y el try catch para capturar los errores

//crear la clase/molde que va a crear mis productos y lo exportamos para poder usarlo en otro lado
export default class ProductManager {
  constructor() {
    this.path = "./products.json"; //ruta donde se va a alojar mi archivo
  }

  getProducts = async () => {
    //con el get product voy a verificar si existe un archivo q contenga los datos
    try {
      //-> en el try ejecuto todo lo que quiero hacer y probar
      const data = fs.existsSync(this.path);
      if (data) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(info);

        return products;
      } else {
        console.log("leyendo desde pmanager");
        return [];
      }
    } catch (error) {
      console.log(error); //en el catch consologueo el error
    }
  };
  addProduct = async ({ title, description, thumnail, code, price }) => {
    //parametros que va a recibir mi objeto
    try {
      //voy a agregar un producto nuevo o voy a crear uno
      const products = await this.getProducts(); //->espero los productos y los guardo en una variable
      //si no hay productos me va a devolver un array vacio.
      const product = {
        //creamos el molde del producto q vamos a recibir
        title: title,
        description: description,
        thumnail: thumnail,
        code: code,
        price: price,
      };
      if ((!title, !description, !thumnail, !code, !price)) {
        //verificamos que todos los campos esten completos sino devolvemos el error
        console.log("complete todos los campos");
        return null;
      }
      if (products.length === 0) {
        //le decimos q si el array productos esta vacio agregue la propiedad
        //id al objeto producto con el valor 1
        product.id = 1;
      } else {
        //le decimos q si el array productos no esta vacio encuentre el
        //ultimo objeto del array busque su id y le sume 1
        product.id = products[products.length - 1].id + 1;
      }
      products.push(product); // insertamos el objeto en el array

      fs.promises.writeFile(this.path, JSON.stringify(products), null, "\t");
      //creo el archivo o agrego el producto en el directorio q pase
    } catch (error) {
      console.log(error);
    }
  };
  updateProduct = async (id, elem) => {
    try {
      // vamos a pasar el id y el elemento del producto q queremos modificar
      const products = await this.getProducts(); //->espero los productos y los guardo en una variable

      const newProduct = products.map((p) =>
        p.id === id ? { ...p, ...elem } : p
      );
      // en esta linea le decimos que cree un nuevo objeto con el obj con el id asignado
      //y pise el elemento indicado modificandolo

      fs.promises.writeFile(this.path, JSON.stringify(newProduct), null, "\t");
      //creo el archivo o agrego el producto en el directorio q pase
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (id) => {
    //vamos a pasar el id del elemento d q queremos eliminar
    const products = await this.getProducts(); //->espero los productos y los guardo en una variable
    const newProduct = products.find((p) => p.id != id);
    //le decimos que busque en productos los productos diferentes al id q pasamos
    fs.promises.writeFile(this.path, JSON.stringify(newProduct), null, "\t");
  };
}
//manejarlos mediante node creando archivos -------checked!------------
