const bodyParser = require('body-parser');
const validator = require('./validator');
const veicoliUtils = require('./veicoli');

const express = require('express');
const dbHelper = require('./dbHelper');
const app = express();

const port = process.env.PORT || 3000;

let alive = 1;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

dbHelper.init();

app.get('/', (req, res) => {
    res.status(200).send("If you see this the app v1.0.0 (development branch) is working!\n");
});

app.get('/healthz', (req, res) => {
    if (alive) {
        res.status(200).send("ok\n");
    }
});

app.get('/kill', (req, res) => {
    alive = 0;
    res.status(200).send("killed\n");
});

app.post('/veicoli', function(req, res) {
    if (validator.controlloVeicolo(req).error) {
        res.status(400).send(validator.controlloVeicolo(req));
        return;
    };

    let promiseCreateVeicolo = veicoliUtils.createVeicolo(req.body);
    promiseCreateVeicolo.then((queryRes) => {
        res.status(201).send({ message: "Vehicle added" });
    }).catch((err) => {
        res.status(500).send({ error: true, message: err });
    });
});

app.put('/veicoli/:id', function(req, res) {
    let id = req.params.id;
    req.body.plate = id;
    if (validator.controlloVeicolo(req).error) {
        res.status(400).send(validator.controlloVeicolo(req));
        return;
    };

    if (!id) {
        res.status(400).send({ error: true, message: "License plate missing" })
        return;
    }

    let promiseEditVeicolo = veicoliUtils.editVeicolo(req.body, id);
    promiseEditVeicolo.then((queryRes) => {
        if (queryRes != 0) {
            res.status(200).send({ message: "Vehicle updated" });
        } else {
            res.status(404).send({ error: true, message: "Vehicle with license plate " + id + " not found" });
        }
    }).catch((err) => {
        res.status(500).send({ error: true, message: err });
    });

});

app.get('/veicoli', function(req, res) {

    let promiseVeicolo = veicoliUtils.getVeicoli();
    promiseVeicolo.then((queryRes) => {
        if (queryRes != 0) {
            res.status(200).send(queryRes);
        } else {
            res.status(404).send({ error: true, message: "No vehicle found" });
        }
    }).catch((err) => {
        res.status(500).send({ error: true, message: err });
    });
});


app.get('/veicoli/:id', function(req, res) {

    let id = req.params.id

    if (!id) {
        res.status(400).send({ error: true, message: "License plate missing" })
        return;
    }

    let promiseVeicolo = veicoliUtils.getVeicolo(id);
    promiseVeicolo.then((queryRes) => {
        if (queryRes != 0) {
            res.status(200).send(queryRes);
        } else {
            res.status(404).send({ error: true, message: "Vehicle with license plate " + id + " not found" });
        }
    }).catch((err) => {
        res.status(500).send({ error: true, message: err });
    });
});

app.get('/veicoli/:id/status/', function(req, res) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({ error: true, message: "License plate missing" });
        return;
    }

    let promiseStatusVeicolo = veicoliUtils.getStatus(id);

    promiseStatusVeicolo.then((queryRes) => {
        if (queryRes != 0) {
            res.status(200).send(queryRes);
        } else {
            res.status(404).send({ error: true, message: "Vehicle with license plate " + id + " not found" });
        }
    }).catch((err) => {
        res.status(500).send({ error: true, message: err });
    });

});


app.delete('/veicoli/:id', function(req, res) {
    let id = req.params.id;

    if (!id) {
        res.status(400).send({ error: true, message: "License plate missing" });
        return;
    }

    let promiseDeleteVeicolo = veicoliUtils.deleteVeicolo(id);
    promiseDeleteVeicolo.then((queryRes) => {
        if (queryRes.affectedRows > 0) {
            res.status(200).send({ message: "Vehicle deleted" });
        } else {
            res.status(404).send({ error: true, message: "Vehicle with license plate " + id + " not found" });
        }
    }).catch((err) => {
        res.status(500).send({ error: true, message: err });
    });

});

app.listen(port, function() {
    console.log('Server running on port ', port);
});