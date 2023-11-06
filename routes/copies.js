const express = require('express');
const router = express.Router();
const copyController = require('../controllers/copies');

router.post('/', copyController.create);
router.get('/', copyController.list);
router.get('/:id', copyController.index);
router.put('/:id', copyController.replace);
router.patch('/:id', copyController.update);
router.delete('/:id', copyController.destroy);
module.exports = router;
