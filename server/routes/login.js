


const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.post('/login',(req, res)=>{
 // capturamos el cuerpo 
    let body = req.body;
// le decimos que nos busque uno que coincida en el email que nos entra por el body
    Usuario.findOne({email: body.email}, (err, usuarioDB)=>{
       // manejamos el error

       if(err){
           return res.status(500).json({
                ok: false,
                err

           });
          
       }

      // ahora manejamos que no exista dicho email de usuario

      if(!usuarioDB){
         return res.status(400).json({
                 ok:false,
                 err:{
                     message:'(Usuario) o contraseña invalidos'
                 }

         });

      }

      // siguiente paso comprobar que la contraseña es correcta para eso usamos una fucion de bcrypt
       
      if(!bcrypt.compareSync(body.password, usuarioDB.password)){

          return res.status(400).json({
                ok: false,
                err:{
                    message: ' Usuario o (contraseña) incorrectas'
                }

          });
      }

      // generar un token

      let token = jwt.sign({
           usuario: usuarioDB
      },process.env.SEED, {expiresIn:60 * 60 * 24 * 30});


       res.json({
         ok: true,
         usuario: usuarioDB,
         token

       });

    });


})



module.exports = app;