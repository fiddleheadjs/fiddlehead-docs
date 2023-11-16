let path = require('path');
let express = require('express');
let router = express.Router();

let createMatrix = () => {
    let size = 20;
    let matrix = [];
    for (let r = 0; r < size; r++) {
        let row = [];
        for (let c = 0; c < size; c++) {
            row[c] = 2;
        }
        matrix[r] = row;
    }
    return matrix;
};

let users = {};
let teams = [[], []];
let state = {
    startTeamId: 0,
    thinkingTeamId: 0,
    thinkingUserIndexes: [0, 0],
    matrix: createMatrix()
};

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/gomoku.html'));
});

router.get('/add-user', (req, res) => {
    let user = {
        id: req.query.userId,
        name: req.query.userName,
        teamId: Object.keys(users).length % 2 === 0 ? 0 : 1
    };
    if (users.hasOwnProperty(user.id)) {
        res.sendStatus(208);
        return;
    }
    users[user.id] = user;
    teams[user.teamId].push(user.id);
    res.sendStatus(200);
});

router.get('/move', (req, res) => {
    let teamId = Number(req.query.teamId);
    let row = Number(req.query.row);
    let cell = Number(req.query.cell);

    state.matrix[row][cell] = teamId;
    if (state.thinkingUserIndexes[state.thinkingTeamId] < teams[state.thinkingTeamId].length - 1) {
        state.thinkingUserIndexes[state.thinkingTeamId]++;
    } else {
        state.thinkingUserIndexes[state.thinkingTeamId] = 0;
    }
    state.thinkingTeamId = teamId === 0 ? 1 : 0;

    let data = {
        users,
        teams,
        state
    };

    res.send(JSON.stringify(data));
});

router.get('/game-data', (req, res) => {
    let data = {
        users,
        teams,
        state
    };

    res.send(JSON.stringify(data));
});

router.get('/replay', (req, res) => {
    state.startTeamId = state.startTeamId === 0 ? 1 : 0;
    state.thinkingTeamId = state.startTeamId;
    state.thinkingUserIndexes = [0, 0];
    state.matrix = createMatrix();
    
    let data = {
        users,
        teams,
        state
    };

    res.send(JSON.stringify(data));
});

router.get('/reset', (req, res) => {
    users = {};
    teams = [[], []];
    state = {
        startTeamId: 0,
        thinkingTeamId: 0,
        thinkingUserIndexes: [0, 0],
        matrix: createMatrix()
    };

    let data = {
        users,
        teams,
        state
    };

    res.send(JSON.stringify(data));
});

module.exports = router;
