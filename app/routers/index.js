const express = require("express");

const router = express.Router();

const _personaController = require("../controllers/personas/personas.controller");

router
.get("/personas/:id", _personaController.getPersona)
.get("/personas", _personaController.getPersonas)
.post("/personas", _personaController.createPersona)
.post("/personas", _personaController.crearReportePersonas)

module.exports = router;