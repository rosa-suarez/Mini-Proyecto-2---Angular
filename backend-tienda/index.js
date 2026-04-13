const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

/* CONEXIÓN MYSQL */
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'tienda_bolsas'
// });

const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect(err => {
    if (err) {
        console.log('Error conexión:', err);
    } else {
        console.log('Conectado a PostgreSQL');
    }
});

/* RUTA PRUEBA */
app.get('/', (req, res) => {
    res.send('API funcionando');
});


// get productos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

app.get('/productos/:id', (req, res) => {
    const id = req.params.id;

    console.time('query');

    db.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
        console.timeEnd('query');

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
});


const validarProducto = (req, res, next) => {
    const { nombre, precio, stock } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({
            error: 'Nombre y precio son obligatorios'
        });
    }

    if (precio <= 0) {
        return res.status(400).json({
            error: 'El precio debe ser mayor a 0'
        });
    }

    if (stock < 0) {
        return res.status(400).json({
            error: 'Stock no puede ser negativo'
        });
    }

    next();
};

const validarMensaje = (req, res, next) => {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        });
    }

    if (!correo.includes('@')) {
        return res.status(400).json({
            error: 'Correo inválido'
        });
    }

    next();
};

//insertar producto
app.post('/productos', validarProducto, (req, res) => {
    const data = req.body;

    if (!data.nombre || !data.precio) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const sql = `
        INSERT INTO productos
        (nombre, categoria, marca, precio, stock, imagen, descripcion, disponible)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.nombre,
        data.categoria,
        data.marca,
        data.precio,
        data.stock,
        data.imagen,
        data.descripcion,
        data.disponible
    ], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ mensaje: 'Producto agregado' });
    });
});

// actualizar producto 
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const sql = `
        UPDATE productos
        SET nombre = ?, categoria = ?, marca = ?, precio = ?, stock = ?, imagen = ?, descripcion = ?, disponible = ?
        WHERE id = ?
    `;

    db.query(sql, [
        data.nombre,
        data.categoria,
        data.marca,
        data.precio,
        data.stock,
        data.imagen,
        data.descripcion,
        data.disponible,
        id
    ], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({ mensaje: 'Producto actualizado' });
    });
});

//insertar mensaje
app.post('/mensajes', validarMensaje, (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
        return res.status(400).json({ error: 'Campos obligatorios' });
    }

    const sql = `
        INSERT INTO mensajes (nombre, correo, asunto, mensaje)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nombre, correo, asunto, mensaje], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ mensaje: 'Mensaje guardado' });
    });
});



/* SERVIDOR */
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});