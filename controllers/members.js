const express = require('express');
const Member = require('../models/member');

function create(req, res, next){
    let name = req.body.name;
    let lastName =  req.body.lastName;
    let phone = req.body.phone;

    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;

    let member = new Member({
        name:name,
        lastName: lastName,
        phone: phone,
        address:address

    });

    member.save().then(obj => res.status(200).json({
        msg: "Socio creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo crear un socio",
        obj:ex
    }));

}

function list (req, res, next) {
    res.send('Users list');
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