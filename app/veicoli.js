const dbHelper = require('./dbHelper');

function getVeicoli(){
    sql = "SELECT * FROM vehicle"

    return new Promise(function(resolve, reject) {
        dbHelper.query(sql, [], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(res);
        });
    });
}

function createVeicolo(body) {
    sql = "INSERT INTO vehicle(license_plate, vehicle_type, model, production_year) VALUES (?, ?, ?, ?)";
    
    return new Promise(function(resolve, reject) {
        dbHelper.query(sql, [body.plate, body.type, body.model, body.year], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(res);
        });
    });
}

function editVeicolo(body, id) {
    sql = "UPDATE vehicle SET vehicle_type=?, model=?, production_year=? WHERE license_plate = ?"
    
    return new Promise(function(resolve, reject) {
        dbHelper.query(sql, [body.type, body.model, body.year, id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(res);
        });
    });
}

function getVeicolo(id) {
    sql = "SELECT * FROM vehicle WHERE license_plate = ?"

    return new Promise(function(resolve, reject) {
        dbHelper.query(sql, [id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(res);
        });
    });

}

function deleteVeicolo(id) {
    sql = "DELETE FROM vehicle WHERE license_plate = ?"

    return new Promise(function(resolve, reject) {
        dbHelper.query(sql, [id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(res);
        });
    });
}

function getStatus(id) {
    sql = "SELECT * FROM current_status WHERE id = ?"

    return new Promise(function(resolve, reject) {
        dbHelper.query(sql, [id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(res);
        });
    });
}


module.exports = {
    getVeicoli: getVeicoli,
    getVeicolo: getVeicolo,
    createVeicolo: createVeicolo,
    editVeicolo: editVeicolo,
    deleteVeicolo: deleteVeicolo,
    getStatus: getStatus
}