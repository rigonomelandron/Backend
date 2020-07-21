


//===================================
//            PUERTOS
//===================================

process.env.PORT = process.env.PORT || 3000;

//==================
// Entorno
//==================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==================
// caducidad token
//==================
 process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//==================
// SEED
//  creamos una variable de entorno en heroku así cuando subamos nuestro proyecto a github mantendremos en secreto la semilla
// o SEED que usaremos cuando el proyecto este en producción
//==================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//==================
// Base de datos
// MONGO_URI es una variable de entorno de heroku para mantener en secreto la URI de
// la base de datos de nuestro proyecto cuando esta en producción
//==================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
} else {


urlDB =process.env.MONGO_URI;

}
process.env.URLDB = urlDB;
