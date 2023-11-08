const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');
const { checkPermission } = require('../acl');

router.post('/', bookingController.create);
router.get('/', bookingController.list);
router.get('/:id', bookingController.index);
router.put('/:id', bookingController.replace);
router.patch('/:id', bookingController.update);
router.delete('/:id', bookingController.destroy);

module.exports = router;
