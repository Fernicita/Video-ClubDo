const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
/* GET users listing.
la jerarquia importa CUIDADO*/
router.get('/',controller.list );

router.get('/:id', controller.index);

router.post('/', controller.create);

router.put('/:id', controller.replace);

router.patch('/:id', controller.update);

router.delete('/:id', controller.destroy);


module.exports = router;

//middleware
//ciclo de vida, los controles funcionan como de aplicación, direccionador= por qué metodo y con qué ruta y pasa la responsabilidad a otro para que peuda contestar
//hay de manejo de errores y se encargan de monetorizar si hay un error de enrutamiento o de la aplicación, ninguna petición debe quedarse en transe o sin respuesta
//recursos estáticos= permite servir recursos estáticos y son aquellos que el servidor web esta dando, estructura o directiorio y a partir de ese dominio lo entrega
//frontend todo lo que se ejecuta del lado del navegador es el cliente parte que interactua con el usuario html, css y js (interactuar con el usuario final)
//backend escrito en un lenguaje de programación más duro y es toda aquella capa de la aplicación donde la capa de binessmodem será la encargada de procesar toda la informacióñ
//tener toda la información base de datos. de fornt a back luego a bases u otros servicios. js nodejs
//middleware de terceros aquellos que inicializan una libreia, no se encuentra de manera natural ni en express de manera nativa y al agregar una libreria se utiliza


