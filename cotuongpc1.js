let path = require('path');
let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/cotuongpc1.html'));
});

module.exports = router;
