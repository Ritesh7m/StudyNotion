const express = require("express")
const router = express.Router()
const { contactUsController } = require('../controllers/ContactUS')

router.post("/contact", contactUsController)

module.exports = router
