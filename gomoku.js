let path = require('path');
let express = require('express');
let router = express.Router();

let users = {};
let tables = {};

let getResData = () => JSON.stringify({
    users,
    tables,
    now: new Date().getTime()
});

let createUser = (id, name) => ({
    id: id.substring(0, 36),
    name: name.substring(0, 20),
    lastPingAt: new Date().getTime()
});

let createTable = (code) => ({
    code: code.substring(0, 20),
    teams: [[], []],
    state: {
        startTeamId: 0,
        thinkingTeamId: 0,
        thinkingUserIndexes: [0, 0],
        matrix: createMatrix()
    }
});

let createMatrix = () => {
    let size = 15;
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

let resetToDefaultData = () => {
    users = {};
    tables = {
        '1': createTable('1'),
        '2': createTable('2'),
        '3': createTable('3')
    };
};

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/gomoku.html'));
});

router.get('/add-user', (req, res) => {
    let {userId, userName} = req.query;
    if (users.hasOwnProperty(userId)) {
        res.sendStatus(400);
        return;
    }
    users[userId] = createUser(userId, userName);
    res.send(getResData());
});

router.get('/add-table', (req, res) => {
    let {userId, tableCode} = req.query;
    let user = users[userId];
    if (user == null) {
        res.sendStatus(400);
        return;
    }
    
    if (tables.hasOwnProperty(tableCode)) {
        res.sendStatus(400);
        return;
    }

    let tableCount = Object.keys(tables).length;
    if (tableCount >= 32) {
        res.sendStatus(400);
        return;
    }

    tables[tableCode] = createTable(tableCode);
    res.send(getResData());
});

router.get('/remove-table', (req, res) => {
    let {userId, tableCode} = req.query;
    let user = users[userId];
    let table = tables[tableCode];
    if (user == null || table == null) {
        res.sendStatus(400);
        return;
    }
    let isNobodyHere = table.teams.every(members => members.length === 0);
    if (!isNobodyHere) {
        res.sendStatus(400);
        return;
    }
    delete tables[table.code];
    res.send(getResData());
});

router.get('/enter-table', (req, res) => {
    let user = users[req.query.userId];
    let table = tables[req.query.tableCode];
    if (user == null || table == null) {
        res.status(400);
        return;
    }
    
    let teamId = table.teams[0].length > table.teams[1].length ? 1 : 0;
    if (table.teams[teamId].includes(user.id)) {
        res.sendStatus(400);
        return;    
    }

    for (let table of Object.values(tables)) {
        for (let tId of [0, 1]) {
            table.teams[tId] = table.teams[tId].filter(uId => uId !== user.id);
        }
    }
    table.teams[teamId].push(user.id);
    res.send(getResData());
});

router.get('/leave-table', (req, res) => {
    let {userId} = req.query;
    let user = users[userId];
    if (user == null) {
        res.sendStatus(400);
        return;
    }
    for (let table of Object.values(tables)) {
        for (let tId of [0, 1]) {
            table.teams[tId] = table.teams[tId].filter(uId => uId !== user.id);
        }
    }
    res.send(getResData());
});

router.get('/move', (req, res) => {
    let user = users[req.query.userId];
    let table = tables[req.query.tableCode];
    if (user == null || table == null) {
        res.status(400);
        return;
    }

    let {teams, state} = table;
    let teamId = [0, 1].find(tId => teams[tId].includes(user.id));
    if (teamId !== state.thinkingTeamId ||
        state.thinkingUserIndexes[teamId] !== teams[teamId].indexOf(user.id)
    ) {
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

    res.send(getResData());
});

router.get('/game-data', (req, res) => {
    let now = new Date().getTime();

    let {userId} = req.query;
    let user = users[userId];
    if (user != null) {
        user.lastPingAt = now;
    }

    for (let table of Object.values(tables)) {
        let {teams, state} = table;
        let thinkingTeam = teams[state.thinkingTeamId];
        let index = state.thinkingUserIndexes[state.thinkingTeamId];
        let substitutionUserIndex = null;
        let count = 0;
        while (count < thinkingTeam.length) {
            // may happen after someone leaves
            if (index > thinkingTeam.length - 1) {
                index = 0;
                continue;
            }
            count++;
            let userId = thinkingTeam[index];
            let user = users[userId];
            if (user == null) {
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
    }

    res.send(getResData());
});

router.get('/replay', (req, res) => {
    let user = users[req.query.userId];
    let table = tables[req.query.tableCode];
    if (user == null || table == null) {
        res.status(400);
        return;
    }

    let {teams, state} = table;
    let isUserInTheTable = teams.some(members => members.includes(user.id));
    if (!isUserInTheTable) {
        res.status(400);
        return;
    }

    state.startTeamId = state.startTeamId === 0 ? 1 : 0;
    state.thinkingTeamId = state.startTeamId;
    state.thinkingUserIndexes = [0, 0];
    state.matrix = createMatrix();
    
    res.send(getResData());
});

router.get('/reset', (req, res) => {
    resetToDefaultData();
    res.send(getResData());
});

resetToDefaultData();

module.exports = router;
