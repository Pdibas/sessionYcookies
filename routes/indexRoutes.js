const express = require('express');
const router = express.Router();

let controllers = require('../controllers/datosController')

const { check } = require('express-validator')

let form_validations = [
    check("nombre")
    .notEmpty().withMessage("El nombre es obligatorio"),

    check("fondo")
    .notEmpty().withMessage("El fondo es obligatorio"),

    check("mail")
    .notEmpty().withMessage("El email es obligatorio").bail()
    .isEmail().withMessage("Debe ser un email valido"),

    check("edad")
    .notEmpty().withMessage("La edad es obligatoria").bail()
    .isInt().withMessage("La edad solo admite numeros")
]

router.get('/', controllers.index);
router.post('/', form_validations, controllers.post_form)

router.get('/saludo', controllers.saludo)
router.get('/volver', controllers.volver)

module.exports = router;