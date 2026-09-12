    const express = require('express');
    const bodyparser = require('body-parser');
    const app = express();
    const { pokemon } = require('./pokedex.json')
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    /*

    verbos HTTP
    GET: obtener recursos
    POST: almacenar un recurso
    PUT: modificar un recurso
    DELETE: Elimina un recurso específico.
    PATCH: modificar una parte de un recurso ya existente.

    */
    app.get("/", (req, res, next) =>{
        return res.status(200).send("Bienvenido al Pokedex"); 
    })
    /*Como obtener parametro de la url */
    app.get("/pokemon", (req, res, next) =>{
        return res.status(200).send(pokemon);
    });

    app.post('/pokemon', (req, res, next) => {
        res.status(200).send(req.body);
    }); 

    /*Lo que sigue despues del id es un RegEx que funciona como una condicional para los parametros recibidos por el usuario */
    app.get('/pokemon/:id', (req, res, next) => {
        const id = req.params.id;
        if(isNaN(id)){
            return next();
        }
        else{
            ( id >= 0 && id <= 150) ?
            res.status(200).send(pokemon[req.params.id - 1]) :
            res.status(404).send("Pokemon no encontrado");
        }
        
    })
    app.get('/pokemon/:name', (req, res, next) => {
        const name = req.params.name;
        
        (!/^[A-Za-z]+$/.test(name)) ? res.status(400).send("Pokemon no encontrado") : null;
        
        const pk = pokemon.filter((p) => {
            return(p.name.toUpperCase() == name.toUpperCase()) && p;
        }); 
        (pk.length > 0) ? res.status(200).send(pk[0]) : res.status(404).send("Pokemon no encontrado");
    }) 

    app.listen(process.env.PORT || 3000,()  => {  
        console.log('Server is running on port 3000');
    });





