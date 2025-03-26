const express = requiere('express');

const router = express.Router();

router.get('/', function (req, res){
    res.send('Clientes OK')
});

module.exports = router;