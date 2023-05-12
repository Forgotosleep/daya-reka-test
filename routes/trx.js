var express = require('express');
var router = express.Router();
const db = require("../models");
const TransactionController = require('../controllers/trx')

// TRX ROUTES
router.get("/", TransactionController.get);  // available queries minPrice, maxPrice, menu, orderByCustomerName (ASC/DESC)
router.post("/new", TransactionController.create);

module.exports = router;
