let path = require('path');
let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/aimba.html'));
});

router.get('/integration-demo', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/aimbalpdemo.html'));
});

module.exports = router;
