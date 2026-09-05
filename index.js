    const express = require('express');
    const app = express();
    const { pokemon } = require('./pokedex.json')
    /*
    verbos HTTP
    GET: Solicita datos de un recurso específico.
    POST: Envía datos para crear un nuevo recurso.
    PUT: Actualiza un recurso existente con nuevos datos.
    DELETE: Elimina un recurso específico.
    PATCH: Actualiza parcialmente un recurso existente.

    */
    app.get("/", (req, res, next) =>{
        res.status(200);
        res.send("Bienvenido al Pokedex"); 
    })
    /*Como obtener parametro de la url */
    app.get("/:pokemon/all", (req, res, next) =>{
        res.status(200); 
        res.send(pokemon);
    });

    /*Lo que sigue despues del id es un RegEx que funciona como una condicional para los parametros recibidos por el usuario */
    app.get('/pokemon/:id', (req, res, next) => {
        const id = req.params.id;
        if(isNaN(id)){
            return next();
        }
        else{
            if( id >= 0 && id <= 150)
            {
                res.status(200);
                return res.send(pokemon[req.params.id - 1]);   
            }
            res.status(404);
            res.send("Pokemon no encontrado");
        }
        
    })

    app.get('/pokemon/:name', (req, res, next) => {
        for(let i = 0; i < pokemon.length; i++){
            if( pokemon[i].name == req.params.name){
                res.status(200);
                res.send(pokemon[i]);
            } 
        }
        res.status(404);
        res.send("Pokemon no encontrado");
    }) 

    app.listen(process.env.PORT || 3000,()  => {  
        console.log('Server is running on port 3000');
    });



