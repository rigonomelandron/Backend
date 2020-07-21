const express = require('express');
const Usuario = require('../models/usuario');//modelo del 

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const bcrypt = require('bcryptjs');// encryptar contraseña
const _ = require('underscore');

const app = express();




app.get('/usuario', verificaToken,(req, res)=> {

    // la request(req) que recibo es la que me envia verificaToken
    let desde = req.query.desde || 0;
     desde = Number(desde);

     let limite = req.query.limite || 5;
     limite = Number(limite);
    
        Usuario.find({estado:true},'nombre email role estado googgle img')
               .skip(desde)
               .limit(limite)
               .exec((err, usuarios)=>{
                    if (err) {

                        return res.status(400).json({
                            ok: false,
                            err

                        });
                    }

                    Usuario.countDocuments({estado:true},(err,conteo)=>{
                         res.json({
                         ok: true,
                         usuarios,
                         Numero_usuarios: conteo
                        });

                    });
                 

                });




})
app.post('/usuario', [verificaToken, verificaAdmin_Role], function (req, res) {

    //capturo las entrada del body
    let body = req.body;

    let usuario = new Usuario({
         nombre: body.nombre,
         email: body.email,
         password: bcrypt.hashSync(body.password, 10),
         role: body.role

    });

    usuario.save((err,usuarioDB)=>{

        if(err){

            return res.status(400).json({
                ok:false,
                err

            });
        }

        res.json({

            ok: true,
            usuario: usuarioDB
        })

    });

   

})
app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function (req, res) {

    //capturar el parametro id para usarlos
    let id = req.params.id;

    //usamos uNderscore que definimos arriba con el guion bajo y su metodo pick para
    //decirle que campos queremos que se puedan actualizar .
    let body = _.pick(req.body, ['name', 'email','img', 'role', 'estado'] );

    Usuario.findByIdAndUpdate(id, body, { new:true, runValidators: true }, (err, usuarioDB)=>{
if(err){

    return res.status(400).json({

        ok: false,
        err
    });
}
       res.json({
           ok: true,
           usuario: usuarioDB

       });
    });

    
})
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function (req, res) {
    let id = req.params.id;

    let cambiarEstado = {
        estado:false
    };
  
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true}, (err, usuarioBorrado)=>{
        if (err) {

            return res.status(400).json({

                ok: false,
                err
            });
        }
        if(!usuarioBorrado){
            return res.status(400).json({

                ok: false,
                err:{
                
                    message: 'Usuario no encontrado'
                }
            });


        }
        res.json({
           ok:true,
           usuario: usuarioBorrado

        });

    });
})

module.exports = app;