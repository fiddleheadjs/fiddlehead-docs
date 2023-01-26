let path = require('path');
let express = require('express');
let compression = require('compression');

let app = express();
let port = 3022;

app.use(compression());

app.use(express.static('public'));

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
