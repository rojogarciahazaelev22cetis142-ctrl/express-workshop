    const express = require('express');
    const morgan = require('morgan');
    const app = express();
    const pokemon = require('./routes/pokemon');

    app.use(express.json());
    app.use(express.urlencoded( { extended : true}));
    app.use(morgan('dev')); // se encarga de mostrar en consola las peticiones que se hacen al servidor

    /*

    verbos HTTP
    GET: obtener recursos
    POST: almacenar un recurso
    PUT: modificar un recurso
    DELETE: Elimina un recurso específico.
    PATCH: modificar una parte de un recurso ya existente.

    */
    app.get("/", (req, res, next) =>{
        return res.status(200).json({code: 1, mesagge: "Bienvenido al Pokedex"}); 
    });

    app.use('/pokemon', pokemon);

    app.use((req, res, next) => {
        return res.status(404).json({ code: 404, mesagge: "URL no encontrada"});
    });

    app.listen(process.env.PORT || 3000,()  => {  
        console.log('Server is running on port 3000');
    });





