const { Sequelize } = require("sequelize");

module.exports = (Sequelize, type) => {
    const MovieActor = Sequelize.define('movies_actors', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        movieId: type.INTEGER,
        actorId: type.INTEGER
        
    });
    return MovieActor;
}