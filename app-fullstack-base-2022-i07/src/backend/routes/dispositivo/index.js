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
    const dispositivoId = req.params.id;

    pool.query('SELECT * FROM Log_Riegos WHERE dispositivoId = ?', [dispositivoId], function(err, result, fields) {
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


module.exports = routerDispositivo