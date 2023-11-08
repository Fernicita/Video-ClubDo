const acl = require('acl');
const {mongoose } = require('mongoose');
// Se importa al acl y el mongoose 
//acl se instala con npm install acl

const url= "mongodb://localhost:27017/Video-clubDo";
mongoose.connect(url);
// hace de nuevo la conexión 

const dbInstance = mongoose.connection
aclInstance = new acl(new acl.memoryBackend());
//Esto es como para obtener de la base y configurar acl


function checkPermission(permission) {
  return (req, res, next) => {
    const userId = req.auth.id; 
    //Este fue un valor ingresado para comprobar porque no lo tomaba

    aclInstance.isAllowed(userId, 'movies', permission, (err, allowed) => {
      if (err) {
        return res.status(500).json({ message: 'Error de autorización', error: err });
      }

      if (allowed) {
        next(); 
      } else {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
    });
  };
}
module.exports = { checkPermission }; 
/*
Para empezar esta separado porque al ponerlo al mismo 
tiempo en el de app.js había un problema al exportarlo,
ya lo que hace esta función es que toma un permiso como arguemnto
y se utilizará para ver si el usuario tiene permiso para relaizar 
la acción todo esto checado en user
*/
