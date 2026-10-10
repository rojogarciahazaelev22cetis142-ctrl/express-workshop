    const express = require('express');
    const user= express.Router();
    const db = require('../config/database');
    const jwt = require('jsonwebtoken');

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

    user.post("/login", async (req, res, next) => {
        const {user_mail, user_pasword} = req.body;

        if(user_mail && user_pasword){
            const query = `SELECT * FROM users WHERE user_mail = '${user_mail}' AND user_pasword = '${user_pasword}'`;
            const rows = await db.query(query);

            if(rows.length == 1){
                const token = jwt.sign({
                    user_id: rows[0].user_id,
                    user_mail: rows[0].user_mail
                }, "debugkey");
                return res.status(200).json({code: 200, message: token});
            }
            else{
                return res.status(401).json({code: 401, message: "Usuario o contraseña incorrectos"});
            }
        }
        return res.status(400).json({code: 400, message: "Datos incompletos"});
    });

    user.get("/", async (req, res, next) => {
        const query = "SELECT * FROM users";
        const rows = await db.query(query);

        return res.status(200).json({code: 200, message: rows});
    });


    module.exports = user;