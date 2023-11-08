const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');
const { checkPermission } = require('../acl'); 
/*esa es sólo para verificar los permisos del usuario y está
todas*/
/* GET movies listing. */
//la jerarquia importa, cuidado
router.post('/', checkPermission('Create'), controller.create);
/* Se define lo del post y es pues para crear una nueva pelicula pero primero
se verifica si el usuario tiene permiso "create" utilizando la
función checkPermission */
router.get('/', checkPermission('Read'), controller.list);

router.get('/:id', checkPermission('Read'),controller.index);

router.put('/:id', checkPermission('Update'),controller.replace);

router.patch('/:id', checkPermission('Update'),controller.update);

router.delete('/:id', checkPermission('Delete'),controller.destroy);
/*

router.post('/', controller.create);

router.get('/', controller.list);

router.get('/:id', controller.index);

router.put('/:id', controller.replace);

router.patch('/:id', controller.update);

router.delete('/:id', controller.destroy);
*/

module.exports = router;