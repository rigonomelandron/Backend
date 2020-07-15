
const mongoose  = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

// creamos dos tipos de roles validos
let rolesValidos = {
     values: ['ADMIN_ROLE', 'USER_ROLE'],
     message: '{VALUE} no es un rol válido'

};

// vamos a crear el esquema para usuario de la base de datos

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
      
     nombre:{

        type: String,
        required: [true, 'El nombre es necesario']
     },
     email: {
         type: String,
         unique: true,
         required: true
     },
     password:{
         type: String,
         required: [true, ' La contraseña es necesaria']

     },
     img:{
         type: String,
         required: false
     },
     role:{
         type: String,
         enum: rolesValidos,
         default: 'USER_ROLE'

     },
     estado:{
         type: Boolean,
         default: true
     },
     google:{
          type: Boolean,
          default: false
     }

});

// como no nos interesa devolver el json con el campo password para evitar hackeos lo eliminamos de la impresion

usuarioSchema.methods.toJSON = function(){

     let user = this;
     let userObject = user.toObject();
     delete userObject.password;
     return userObject;
}

usuarioSchema.plugin( uniqueValidator, { message: '{PATH}  debe ser único'});

module.exports = mongoose.model( 'Usuario', usuarioSchema);

