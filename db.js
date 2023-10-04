const Sequelize = require('sequelize');

const directorModel=require('./models/director'); //ruta relativa

const genreModel= require('./models/genre');

const movieModel = require('./models/movie');

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

const Genre= genreModel(sequelize, Sequelize);

const Movie = movieModel(sequelize, Sequelize);

//RELACIONES

//un genero puede tener muchas peliculas
Genre.hasMany(Movie, { as: 'movies'});
//una pelicula tiene un género
Movie.belongsTo(Genre, {as:'genre'});


// Un director puede tener muchas películas 
Director.hasMany(Movie, {as: 'movies'});

//una pelicula tiene un director 
Movie.belongsTo(Director, {as: 'director'});

sequelize.sync({
    force:true
}). then (()=>{
    console.log('Base de datos sincronizada');
});
module.exports = {Director, Genre, Movie};