    const express = require('express');
    const user= express.Router();
    const db = require('../config/database');
    

    user.post('/', async (req,res, next) => {
        const {user_name,user_mail,user_pasword} = req.body;

        if(user_name && user_mail && user_pasword){

            let query = "INSERT INTO users (user_name, user_mail, user_pasword) ";
            query += `VALUES ('${user_name}', '${user_mail}', '${user_pasword}')`;

            const rows = await db.query(query);

            if(rows.affectedRows == 1){
                return res.status(201).json({code: 201, message: "Usuario agradodo con extito"});
            }
            return res.status(500).json({code : 500, message: "Ocurrio un error"});
        }
        return res.status(500).json({code: 500, message: "Datos incompletos"});
        
    });

    user.get("/", async (req, res, next) => {
        const query = "SELECT * FROM users";
        const rows = await db.query(query);

        return res.status(200).json({code: 200, message: rows});
    });


    module.exports = user;