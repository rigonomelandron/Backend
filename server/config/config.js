


//===================================
//            PUERTOS
//===================================

process.env.PORT = process.env.PORT || 3000;

//==================
// Entorno
//==================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//==================
// Base de datos
//==================

let urlDB;

//if (process.env.NODE_ENV === 'dev') {

    //urlDB = 'mongodb://localhost:27017/cafe';
//} else {


urlDB ='mongodb+srv://cafe-user:anaisabel18@cluster0-svxzh.mongodb.net/cafe?retryWrites=true&w=majority';

//}
process.env.URLDB = urlDB;
