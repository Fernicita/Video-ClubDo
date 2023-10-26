const express = requiere('express');
const Director= require('../models/director');
const Movie = requiere('../models/movie');

 async function create(req, res, next){
    const title = req.body.title;
    const directorId= req.body.directorId;

    let director = await Director.findOne({"_id": directorId});
    let movie = new Movie({
        tite:title,
        director:director
    });

    movie.save().then(obj=>res.status(200).json({
        msg: "Pelicula almacenada correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear la pelicula",
        obj:ex
    }));
}

function list (req, res, next) {
    Movie.find().populate("_director").then(objs => res.status(200).json({
        msg:"Lista de peliculas",
        obj:objs
    })).catch(ex => res.status(500).json({
        msg: "No se pudo obtener la lista de peliculas",
        obj:ex
    }));
  }

function index(req,res,next){
    res.send('Users index');
};

function replace(req,res,next){
    res.send('Users replace');
};

function update(req,res,next){
    res.send('Users update');
};

function destroy(req,res,next){
    res.send('Users destroy');
};


module.exports={
    create, list, index, replace, update, destroy
};