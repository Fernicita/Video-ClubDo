const Sequelize = require('sequelize');

const directorModel=require('./models/director'); //ruta relativa
//establecer conexión con la base de datos estos elementos son los que se van a utilizar traer la imagen
/*
    1)Nombre de la base de datos
    2)Usuario de la base de datos
    3)Contraseña de la base de datos
    4)Objeto de configuración de nuesto ORM
*/
const sequelize= new Sequelize('Video-clubDo', 'root', '123', {
    host: '172.17.0.2', //aqui no supe que show
    dialect: 'mysql'
});

const Director= directorModel(sequelize, Sequelize);
sequelize.sync({
    force:true
}). then (()=>{
    console.log('Base de datos sincronizada');
});
module.exports = {Director};