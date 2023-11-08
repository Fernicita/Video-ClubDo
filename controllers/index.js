const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function home(req, res, next){
    res.render('index', { title: 'Express' });
}

function login(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const JwKey = "e062dcb0bf3b2ab1bb1d1365a6fc81ed"//la de internet
    User.finOne({"_email": email}).then(user=>{
        console.log(user._id);
        if(user){
            bcrypt.hash(password, user.salt, (err,hash)=>{
                if (err){
                    //regresar error 
                    res.status(403).json({
                        msg:"Usuario y/o contraseña incorrecto",
                        obj: err
                    });

                }
                if (hash == user.password){
                    const token = jwt.sign(
                        {
                            id: user.id,  
                            data: user.data,
                            exp: Math.floor(Date.now() / 1000) + 240
                        },
                        JwtKey //aqui da la de interactuar, lo de arriba se cambia por falta de tiempo
                        
                    );

                    user.token = token;
                    
                    res.status(200).json({
                        msg: "login success",
                        obj: user,  // Devuelve el objeto del usuario
                        token: token 
                    });
                    /*res.status(200).json({
                        msg:"Login ok",
                        obj: jwt.sign({data:user.data, exp:Math.floor(Date.now()/1000)+60},JwKey)
                    });*/
                }else{
                    res.status(403).json({
                        msg:"Usuario y/o contraseña incorrecto",
                        obj: null
                    });
                }
            });
        }else{
            res.status(403).json({
                msg:"Usuario y/o contraseña incorrecto",
                obj:null
            });
        }
    }).catch(e=> res.status(403).json({
        msg:"Usuario y/o contraseña incorrecto",
        obj:e
    }));
}

module.exports = {
    home,
    login
}

