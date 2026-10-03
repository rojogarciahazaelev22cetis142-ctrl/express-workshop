    const express = require('express');
    const pokemon = express.Router();
    const db = require('../config/database');
    

    pokemon.post('/', async (req, res, next) => {
        const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

        if(pok_name && pok_height && pok_weight && pok_base_experience){
            let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
            query += `VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

            const rows = await db.query(query);
            console.log(rows);

            if(rows.affectedRows === 1){
                return res.status(201).json({code: 201, message: "Pokemon agregado con exito"});
            }
            return res.status(500).json({code: 500, message: "Error al agregar el pokemon"});
        }
        return res.status(400).json({code: 400, message: "Datos incompletos"});

    }); 

    /*Metodo delete */

    pokemon.delete("/:id", async(req, res, next) => {
        const query = `DELETE FROM pokemon WHERE pok_id = ${req.params.id}`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1 ){
            return res.status(200).json({code: 200, message: "Pokemon eliminado con exito"});
        }
        return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
    });

    pokemon.put("/:id", async(req,res,next) => {
        const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

        if(pok_name && pok_height && pok_weight && pok_base_experience){
            let query = "UPDATE pokemon SET ";
            query += `pok_name = '${pok_name}', pok_height = ${pok_height}, pok_weight = ${pok_weight}, pok_base_experience = ${pok_base_experience} `;
            query += `WHERE pok_id = ${req.params.id}`;

            const rows = await db.query(query);

            if(rows.affectedRows === 1){
                return res.status(200).json({code: 200, message: "Pokemon actualizado con exito"});
            }
            return res.status(500).json({code: 500, message: "Error al actualizar el pokemon"});
        }
        return res.status(400).json({code: 400, message: "Datos incompletos"});
       
    });

      pokemon.patch("/:id", async(req,res,next) => {

        if(req.body.pok_name){
            let query = `UPDATE pokemon SET pok_name = '${req.body.pok_name}' WHERE pok_id = ${req.params.id}`;
            const rows = await db.query(query);
            if(rows.affectedRows === 1){
                return res.status(200).json({code: 200, message: "Pokemon actualizado con exito"});
            }
            return res.status(500).json({code: 500, message: "Error al actualizar el pokemon"});
        }
        return res.status(500).json({code: 500, message: "Datos incompletos"});
    });

    /*Como obtener parametro de la url */
    pokemon.get("/", async(req, res, next) =>{
        const pkmn = await db.query("SELECT * FROM pokemon");
        console.log(pkmn);
        return res.status(200).json({code: 200, message: pkmn});
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
            res.status(200).json({code : 200, message : pkmn}) :
            res.status(404).json({code: 404, message: "Pokemon no encontrado"});
        }
        
    })
    pokemon.get('/:name', async(req, res, next) => {
        const name = req.params.name.toLowerCase();
        (!/^[A-Za-z]+$/.test(name)) ? res.status(400).send("Pokemon no encontrado") : null;
        
        const pk = await db.query("SELECT * FROM pokemon WHERE pok_name = ?", [name]);
        (pk.length > 0) ? 
            res.status(200).json({code : 200, message : pk}) :
            res.status(400).send("Pokemon no encontrado")
    }) 

    module.exports = pokemon;