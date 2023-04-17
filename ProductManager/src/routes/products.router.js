import { Router } from "express";

const router = Router();

export default router;

router.get(`/`, async (req, res) => {
  //busco los productos en la db y respondo con ellos
  const allProducts = await products; // creo una constante q guarde los productos q traigo con el pmanager
  res.send(allProducts); //envio o respondo con los productos
});

router.post(`/`, async (req, res) => {
  try {
    const allProducts = await products; // creo una constante q guarde los productos q traigo con el pmanager
    const newContent = req.body; // el body q le voy a pasar en postman va a ser = a el archivo a pushear
    //agregar productos a mi archivo
    allProducts.push(newContent); //  envio el objeto a mi array
    res.send({ status: "succes", message: "product posted" }); //envio una respuesta al servidor de que la peticion fue exitosa
  } catch (error) {
    console.log(error);
  }
});

router.put(`/:pId`, async (req, res) => {
  //modificar productos en mi archivo
  const allProducts = await products;
  const id = req.params.pId; //->guardo en una constante el id del prod q quiero modificar
  const newContent = req.body; // el body q le voy a pasar en postman va a ser = a el archivo a pushear para modificar
  const productIndex = allProducts.findIndex((p) => p.id == id); //busco el index del producto a modificar
  if (productIndex === -1) {
    return res.status(404).send({ status: "error", error: "not found" }); //si no lo encuentra retorna error
  }
  allProducts[productIndex] = newContent;
  res.send({ status: "succes", message: "product updated" }); //si lo encuentra retorna exito
});
router.delete("/:pId", async (req, res) => {
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
