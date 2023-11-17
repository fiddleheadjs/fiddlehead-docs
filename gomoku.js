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
        teamId: teams[0].length > teams[1].length ? 1 : 0,
        lastPingAt: new Date().getTime(),
    };
    if (users.hasOwnProperty(user.id)) {
        res.sendStatus(208);
        return;
    }
    users[user.id] = user;
    teams[user.teamId].push(user.id);
    
    res.send(JSON.stringify({
        users,
        teams,
        state,
        now: new Date().getTime()
    }));
});

router.get('/move', (req, res) => {
    let userId = req.query.userId;
    let user = users[userId];
    if (!user) {
        console.log(userId, users);
        res.status(400);
        return;
    }

    let teamId = user.teamId;
    if (teamId !== state.thinkingTeamId) {
        res.status(400);
        return;
    }
    if (state.thinkingUserIndexes[teamId] !== teams[teamId].indexOf(userId)) {
        res.status(400);
        return;
    }

    let row = Number(req.query.row);
    let cell = Number(req.query.cell);
    state.matrix[row][cell] = teamId;
    if (state.thinkingUserIndexes[state.thinkingTeamId] < teams[state.thinkingTeamId].length - 1) {
        state.thinkingUserIndexes[state.thinkingTeamId]++;
    } else {
        state.thinkingUserIndexes[state.thinkingTeamId] = 0;
    }
    state.thinkingTeamId = teamId === 0 ? 1 : 0;

    res.send(JSON.stringify({
        users,
        teams,
        state,
        now: new Date().getTime()
    }));
});

router.get('/game-data', (req, res) => {
    let now = new Date().getTime();

    let { userId } = req.query;
    let user = users[userId];
    if (user) {
        user.lastPingAt = now;
    }

    let thinkingTeam = teams[state.thinkingTeamId];
    let index = state.thinkingUserIndexes[state.thinkingTeamId];
    let substitutionUserIndex = null;
    let count = 0;
    while (count < thinkingTeam.length) {
        count++;
        let userId = thinkingTeam[index];
        let user = users[userId];
        if (!user) {
            continue;
        }
        if (now - user.lastPingAt < 4000) {
            if (substitutionUserIndex === null) {
                substitutionUserIndex = index;
            }
        }
        
        if (index < thinkingTeam.length - 1) {
            index++;
        } else {
            index = 0;
        }
    }
    if (substitutionUserIndex !== null) {
        state.thinkingUserIndexes[state.thinkingTeamId] = substitutionUserIndex;
    }

    res.send(JSON.stringify({
        users,
        teams,
        state,
        now: new Date().getTime()
    }));
});

router.get('/replay', (req, res) => {
    state.startTeamId = state.startTeamId === 0 ? 1 : 0;
    state.thinkingTeamId = state.startTeamId;
    state.thinkingUserIndexes = [0, 0];
    state.matrix = createMatrix();
    
    res.send(JSON.stringify({
        users,
        teams,
        state,
        now: new Date().getTime()
    }));
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

    res.send(JSON.stringify({
        users,
        teams,
        state,
        now: new Date().getTime()
    }));
});

module.exports = router;
