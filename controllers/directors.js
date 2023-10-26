const express = require('express');
const Director = require ('../models/director');

function create(req, res, next){
    const name = req.body.name;
    const lastName= req.body.lastName;

    let director = new Director({
        name:name, lastName:lastName
    });

    director.save()
            .then(obj => res.status(200).json({
                message: "Director creado correctamente",
                obj:obj
            }))
            .catch(ex => res.status(500).json({
                message: "El servidor no pudo",
                obj:ex
            }));
}

function list(req, res, next){
    let page = req.params.page ? params.page:1;
    const options ={
        page: page,
        limit: 5
    };

    Director.paginate({},options)
            .then(objs => res.status(200).json({
                mssage:"Lista de directores ",
                obj:objs
            }))
            .catch(ex => res.status(500).json({
                msg: "No se pudo consultar la lista de directores",
                obj:ex
            }));
}

function index(req, res, next){
    const id =  req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Director con el id ${id}`, //las comitas para interpolar
        obj:obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo consultar el director",
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let director = new Object({ //es pq hacemos otro objeto  
        _name: name,
        _lastName: lastName
    });

    Director.findOneAndUpdate({"_id":id}, director, {new: true})//new hace de que si no esta lo va a crear
            .then(obj => res.status(200).json({
                msg:"Director reemplazado correctamente",
                obj:obj
            })).catch(ex => res.status(500).json({
                msg: "No se pudo reemplazar el director",
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName =  req.body. lastName;

    let director = new Object();

    if(name) director._name = name; 
    if(lastName) director._lastName = lastName;

    Director.findOneAndUpdate({"_id":id}, director)
            .then(obj => res.status(200).json({
                msg: "El director fue actualizado correctamente",
                obj:obj
            }))
            .catch(ex => res.status(500).json({
                msg: "No se pudo actualizar el director",
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: "Director eliminado correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo eliminar el director",
        obj:ex
    }));
}   

module.exports={create, list, index, update, replace, destroy}