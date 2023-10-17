const mongoose = require('mongoose');

//Schema: representa la coleccion que se encuentra en la base de datos basada en documento
const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});

//Clase: Como lo vamos a mapear 
class Director{
    constructor(name, lastName){
        this._name = name;
        this._lastName = lastName;
    }

    get name(){
        return this._name;
    }
    set name(v){
        this._name=v;
    }
    get lastName(){
        return this._lastName;
    }
    set lastName(v){
        this._lastName=v;
    }
}

schema.loadClass(Director);
module.exports = mongoose.model('Director', schema);