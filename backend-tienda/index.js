const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

/* CONEXIÓN MYSQL */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda_bolsas'
});

db.connect(err => {
    if (err) {
        console.log('Error conexión:', err);
    } else {
        console.log('Conectado a MySQL');
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

//productos por id
app.get('/productos/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result[0]);
    });
});

//insertar producto
app.post('/productos', (req, res) => {
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

//insertar mensaje
app.post('/mensajes', (req, res) => {
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