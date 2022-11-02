let express = require('express');
let path = require('path');

let app = express();
let port = 3022;

app.use(express.static('public'));

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
