const express = require('express')

const routerDispositivo = express.Router()

var pool = require('../../mysql-connector');

routerDispositivo.get('/', function(req, res) {
    pool.query('SELECT * FROM Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerDispositivo.get('/medicion/:id', function(req, res) {
    const dispositivoId = req.params.id;

    pool.query('SELECT * FROM Mediciones WHERE dispositivoId = ?', [dispositivoId], function(err, result, fields) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(result);
    });
});

const query_disp_con_ultima_medicion=
`SELECT Dispositivos.dispositivoId, Dispositivos.nombre, Dispositivos.ubicacion, COALESCE(Mediciones.fecha, 'Sin mediciones') AS fecha_ultima_medicion, COALESCE(Mediciones.valor, 'Sin mediciones') AS valor_ultima_medicion
FROM Dispositivos, Mediciones
WHERE Dispositivos.dispositivoId = Mediciones.dispositivoId AND Mediciones.fecha = ( SELECT MAX(fecha)
                                                                                        FROM Mediciones
                                                                                        WHERE Mediciones.dispositivoId = Dispositivos.dispositivoId)
ORDER BY Dispositivos.dispositivoId;`

routerDispositivo.get('/ultima_medicion', function(req, res) {

    pool.query(query_disp_con_ultima_medicion, function(err, result, fields) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(result);
    });
});

routerDispositivo.get('/ultima_medicion_valor/:id', function(req, res) {
    const dispositivoId = req.params.id;

    pool.query('SELECT valor FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha DESC LIMIT 1', [dispositivoId], function(err, result, fields) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(result);
    });
});



routerDispositivo.get('/log-riegos/:id', function(req, res) {
    const evId = req.params.id;

    pool.query('SELECT * FROM Log_Riegos WHERE electrovalvulaId = ?', [evId], function(err, result, fields) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(result);
    });
});

routerDispositivo.get('/valvula/:id', function(req, res) {
    const dispositivoId = req.params.id;

    pool.query('SELECT electrovalvulaId FROM Dispositivos WHERE dispositivoId = ?', [dispositivoId], function(err, result, fields) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(result);
    });
});


routerDispositivo.post('/abrir', function(req,res) {
    const electrovalvulaId = req.body[0].electrovalvulaId;

    pool.query('INSERT INTO Log_Riegos (fecha, apertura, electrovalvulaId) VALUES (NOW(), 1, ?)', [electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.status(400).send(err);
            console.log('error al enviar datos de apertura');
            return;
        }
        res.send(result);
        console.log('datos de apertura enviados a DB');
    });
});

routerDispositivo.post('/cerrar', function(req,res) {
    const electrovalvulaId = req.body[0].electrovalvulaId;

    pool.query('INSERT INTO Log_Riegos (fecha, apertura, electrovalvulaId) VALUES (NOW(), 0, ?)', [electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.status(400).send(err);
            console.log('error al enviar datos de cierre');
            return;
        }
        res.send(result);
        console.log('datos de cierre enviados a DB');
    });
});

routerDispositivo.post('/cerrar_medicion', function(req,res) {
    const dispositivoId = req.body.dispositivoId;
    const valor = req.body.valor;

    pool.query('INSERT INTO Mediciones (fecha, dispositivoId, valor) VALUES (NOW(), ?, ?)', [dispositivoId, valor], function(err, result, fields) {
        if (err) {
            res.status(400).send(err);
            console.log('error al enviar datos de cierre de medición');
            return;
        }
        res.send(result);
        console.log('datos de cierre enviados a DB de medición');
    });
});

module.exports = routerDispositivo