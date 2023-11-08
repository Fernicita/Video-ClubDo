const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name:String,
    _lastName:String,
    _email:String,
    _password:String,
    _salt:String,
    _permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission'
        }
    ]
    //phone
})

class User {
    constructor(name, lastName, email, password, salt, permissions){
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._salt =salt;
        this._permissions = permissions;
    }

    get name(){ return this._name; }
    set name(v){ this._name = v; }

    get lastName() { return this._lastName; } 
    set lastName(v) { this._lastName = v; }

    get email() { return this._email; }
    set email(v) { this._email = v; }

    get password() {return this._password; }
    set password(v) {this._password = v; }

    get salt() {return this._salt; }
    set salt(v) {this._salt = v; }

    get permissions() { return this._permissions; }
    set permissions(v) { this._permissions = v; }
}

schema.loadClass(User);
module.exports = mongoose.model('User', schema);