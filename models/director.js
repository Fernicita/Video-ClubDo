const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
schema.plugin(mongoosePaginate); //Paginar los resultados
module.exports = mongoose.model('Director', schema);