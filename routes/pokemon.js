    const express = require('express');
    const pokemon = express.Router();
    const db = require('../config/database');
    
    /*Como obtener parametro de la url */
    pokemon.get("/", async(req, res, next) =>{
        const pkmn = await db.query("SELECT * FROM pokemon");
        console.log(pkmn);
        return res.status(200).send(pkmn);
    });

    pokemon.post('/', (req, res, next) => {
        res.status(200).send(req.body);
    }); 

    /*Lo que sigue despues del id es un RegEx que funciona como una condicional para los parametros recibidos por el usuario */
    pokemon.get('/:id', async(req, res, next) => {
        const id = Number(req.params.id);
        if(isNaN(id)){
            return next();
        }
        else{
            const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id =  ?", [id]);
            ( id >= 1 && id <= 722) ?
            res.status(200).send(pkmn) :
            res.status(404).send("Pokemon no encontrado");
        }
        
    })
    pokemon.get('/:name', async(req, res, next) => {
        const name = req.params.name.toLowerCase();
        (!/^[A-Za-z]+$/.test(name)) ? res.status(400).send("Pokemon no encontrado") : null;
        
        const pk = await db.query("SELECT * FROM pokemon WHERE pok_name = ?", [name]);
        (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemon no encontrado");
    }) 

    module.exports = pokemon;