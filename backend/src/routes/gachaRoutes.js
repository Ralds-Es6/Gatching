const express = require('express');
const router = express.Router();
const { wishHannyangi, wishJaeguri, getInventory } = require('../controllers/gachaController');

router.post('/wish/hannyangi', wishHannyangi);
router.post('/wish/jaeguri', wishJaeguri);
router.get('/inventory', getInventory);

module.exports = router;
