const Sequelize = require('sequelize');

const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');

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

const Director = directorModel(sequelize,Sequelize);
const Genre = genreModel(sequelize,Sequelize);
const Movie = movieModel(sequelize,Sequelize);
const Actor = actorModel(sequelize,Sequelize);
const Member = memberModel(sequelize,Sequelize);
const MovieActor = movieActorModel(sequelize,Sequelize);

//****************ESTABLECEMOS LAS RELACIONES ENTRE TABLAS **********
//un genero puede tener muchas peliculas 
Genre.hasMany(Movie,{as: 'movies'}); //objeto que pide un atributo 'as' para nosotros darle un nombre de como se va a llamar el atributo de la llave foranea 

//una pelicula tiene un genero 
Movie.belongsTo(Genre,{as: 'genre'})

//un director puede tener muchas peliculas
Director.hasMany(Movie,{as:'movies'});

//una pelicula tiene un director 
Movie.belongsTo(Director,{as:'director'});

// 1 actor participa en muchas peliculas  para poderlo mapear vamos a necesitar un  ... intermedio 
MovieActor.belongsTo(Movie,{Movie:'movieId'});

// En 1 pelicula participan muchos actores
MovieActor.belongsTo(Actor,{foreignKey:'actorId'});

//belongs to many ayuda a hacer el cierre del otro lado de la relacion 
Movie.belongsToMany(Actor,{
        foreignKey: 'actorId',
        as: 'actors',
        through:'movies_actors'
});

Actor.belongsToMany(Movie,{
        foreignKey:'movieId',
        as:'movies',
        through:'movies_actors'
});

//sincroniza lo que tengamos en nuestro modelo hacia la base de datos 
sequelize.sync({
        force: true 
}).then(()=>{
        console.log('Base de datos actualizada ')
});

//se exportar todos los modelos que tengamos en un objeto 

module.exports= {
        Director,
        Genre,
        Movie,
        Actor,
        Member
};