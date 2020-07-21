const jwt = require('jsonwebtoken');




//=====================
//Verificar token
//=====================

let verificaToken = (req,res,next)=>{

  // primero capturo el token que me entra por el header en una variable
  // la palabra token no es una palabra reservada es el nombre con la que 
  // yo meto el token en el header y que puede ser cualquiera
  let token = req.get('token');

  jwt.verify(token, process.env.SEED, (err, decoded)=>{

          if(err){

            return  res.status(401).json({
                ok:false,
                err:{
                  message: "Token no válido"
                }

            });
          }
 //lo que hacemos a continuación es meter el payload en el request(req)
 // esta request es la que va a recibir las peticiones get, post etc
          req.usuario = decoded.usuario;
          
// tenemos que poner la función next para que continue con la petición
          next();

  });

};

//=====================================
// Verificar el role del usuario
//=====================================

let verificaAdmin_Role = (req, res, next)=>{

     let usuario = req.usuario;
     
   if( usuario.role === 'ADMIN_ROLE'){
         next();

   }else{

    return res.json({

        ok: false,
        err:{
          message: "El usuario no es administrador"
        }

     });
    }
}
module.exports = {
    verificaToken,
    verificaAdmin_Role

};