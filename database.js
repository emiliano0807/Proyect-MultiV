const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("Corriendo servidor en http://localhost:" + PORT);

})
const servidores=[
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'REGISTROS',
        port: '3306'
    }
]
const connection = mysql.createConnection(servidores[0]);
connection.connect((err)=>{
    if(err){
        //throw err
        console.error(err.message || "No se pudo conectar a la base de datos");
    }else{
        console.log("Conectado a la base de datos")
    }
})
//ACCEDER
app.get("/",(req, res)=>{
    connection.query(`SELECT * FROM usuarios`, (error, resul)=>{
        if(error) res.status(500).json({message:error.message || "Acceder A Datos"});
        else (res.status(200).json({resul}));
    })
})
//AGREGAR
app.post("/",(req, res)=>{
    const { nombre, apellidos, domicilio, numero_telefono } = req.body;
    const da1= `INSERT INTO usuarios (nombre, apellidos, domicilio, numero_telefono) VALUES (?, ?, ?, ?)`;
    connection.query(da1, [nombre, apellidos, domicilio, numero_telefono],(err, resul)=>{
        if(err) res.status(500).json({message:error.message || "NO se puede insertar datos"});
        else res.json(resul);
    })
})
//EDITAR
app.patch("/",(req, res)=>{
    const { id, nombre, apellidos, domicilio, numero_telefono} = req.body;
    connection.query(`UPDATE usuarios SET nombre="${nombre, apellidos, domicilio, numero_telefono}" WHERE id=${id}`, (error, resul)=>{
        if(error) res.status(500).json({message:error.message || "No se puede editar en este momento"});
        else res.json(resul);
    })
})
//ELIMINAR
app.delete("/", (req, res)=>{
    const {id} = req.body;
    connection.query(`DELETE FROM usuarios WHERE id=${id}`, (error, resul)=>{
        if(error) res.status(500).json({message:error.message || "NOse puede eliminar"});
        else res.json(resul);
    })
})