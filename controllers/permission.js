const mongoose = require('mongoose');
/* aquí ya se define el esquema de permisos */
const permissionSchema = new mongoose.Schema({
  description: String,
  type: {
    type: String,
    enum: ['Read', 'Create', 'Update', 'Delete'],
  },
});

module.exports = mongoose.model('Permission', permissionSchema); 