    const express = require('express');
    const morgan = require('morgan');
    const app = express();
    const pokemon = require('./routes/pokemon');
    const user = require('./routes/user');
    const auth = require('./middlewere/auth');
    const notFound = require('./middlewere/notFound');
    const index = require('./middlewere/index'); 
    const cors = require('./middlewere/cors');
    

    app.use(cors);
    app.use(morgan('dev')); // se encarga de mostrar en consola las peticiones que se hacen al servidor
    app.use(express.json());
    app.use(express.urlencoded( { extended : true}));

    /*

    verbos HTTP
    GET: obtener recursos
    POST: almacenar un recurso
    PUT: modificar un recurso
    DELETE: Elimina un recurso específico.
    PATCH: modificar una parte de un recurso ya existente.

    */

    app.get("/", index);
    app.use("/user", user);
    app.use(auth);
    app.use('/pokemon', pokemon);
    app.use(notFound);
    
    app.listen(process.env.PORT || 3000,()  => {  
        console.log('Server is running on port 3000');
    });





