function isDate(input) {
    let dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g;
    return input.match(dateRegex);
}

function isTarga(input) {
    let targaRegex = /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/g;
    return input.match(targaRegex);
}

function isAnno(input) {
    let annoRegex = /^[0-9]{4}$/g;
    return input.match(annoRegex);
}

function controlloVeicolo(req) {
    if (!req.body.year) {
        return { error: true, message: "Year not given" };
    }
    if (!req.body.plate) {
        return { error: true, message: "License plate not given" };
    }
    if (!req.body.model) {
        return { error: true, message: "Model not given" };
    }
    if (!isTarga(req.body.plate)) {
        return { error: true, message: "License plate format is wrong" };
    }
    if (!isAnno(req.body.year)) {
        return { error: true, message: "Year format is wrong" };
    }
    if (req.body.type != "car" && req.body.type != "bike") {
        return { error: true, message: "Type needs to be either car or bike" };
    }
    return {};
}


module.exports = {
    isDate: isDate,
    isTarga: isTarga,
    isAnno: isAnno,
    controlloVeicolo: controlloVeicolo,
}