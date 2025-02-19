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
    lastPingAt: new Date().getTime(),
    playingTableCode: null
});

let createTable = (code, moveDuration) => ({
    code: code.substring(0, 20),
    moveDuration: Math.max(parseInt(moveDuration) || 8, 1),
    teams: [[], []],
    state: {
        startTeamId: 0,
        thinkingTeamId: 0,
        thinkingUserIndexes: [0, 0],
        matrix: createMatrix(),
        moveSequence: []
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

let isInMatrix = (value, matrix) => {
    let size = matrix.length;
    for (let rx = 0; rx < size; rx++) {
        for (let cx = 0; cx < size; cx++) {
            if (matrix[rx][cx] === value) {
                return true;
            }
        }
    }
    return false;
};

let resetToDefaultData = () => {
    users = {};
    tables = {
        '1': createTable('1'),
        '2': createTable('2'),
        '3': createTable('3')
    };
};

let getNow = () => new Date().getTime();

let isUserDisconnected = (user, now) => now - user.lastPingAt > 4000;

let isUserInactive = (user, now) => now - user.lastPingAt > 60000;

let getUsersOutOfTablesIfInactive = (now) => {
    for (let user of Object.values(users)) {
        if (isUserInactive(user, now)) {
            user.playingTableCode = null;
        }
    }
};

let substituteThinkingUsersIfDisconnected = (now) => {
    for (let table of Object.values(tables)) {
        let {teams, state} = table;
        let thinkingTeam = teams[state.thinkingTeamId];
        let index = state.thinkingUserIndexes[state.thinkingTeamId];
        let substitutionUserIndex = null;
        let count = 0;
        while (count < thinkingTeam.length) {
            if (index > thinkingTeam.length - 1) {
                index = 0;
                continue;
            }
            count++;
            let userId = thinkingTeam[index];
            let user = users[userId];
            if (user != null) {
                if (user.playingTableCode === table.code && !isUserDisconnected(user, now)) {
                    if (substitutionUserIndex === null) {
                        substitutionUserIndex = index;
                    }
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
};

let filterPlayingMembers = (userIds, tableCode) => userIds.map(userId => users[userId]).filter(
    user => user.playingTableCode === tableCode
);

let isNobodyInTheTable = table => table.teams.every(memberIds => memberIds.every(
    memberId => users[memberId].playingTableCode !== table.code
));

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/gomoku.html'));
});

router.get('/add-user', (req, res) => {
    let {userId: inputUserId, userName: inputUserName} = req.query;
    let user = createUser(inputUserId, inputUserName);
    if (users.hasOwnProperty(user.id)) {
        res.sendStatus(400);
        return;
    }
    users[user.id] = user;
    res.send(getResData());
});

router.get('/add-table', (req, res) => {
    let {userId, tableCode: inputTableCode, moveDuration: inputMoveDuration} = req.query;
    let user = users[userId];
    if (user == null) {
        res.sendStatus(400);
        return;
    }
    
    let tableCount = Object.keys(tables).length;
    if (tableCount >= 32) {
        res.sendStatus(400);
        return;
    }

    let table = createTable(inputTableCode, inputMoveDuration);
    if (tables.hasOwnProperty(table.code)) {
        res.sendStatus(400);
        return;
    }

    tables[table.code] = table;
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
    if (!isNobodyInTheTable(table)) {
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
        res.sendStatus(400);
        return;
    }
    
    let myTeamId = [0, 1].find(teamId => table.teams[teamId].includes(user.id));
    if (myTeamId != null) {
        let hasMyTeamMoved = isInMatrix(myTeamId, table.state.matrix);
        if (hasMyTeamMoved) {
            res.sendStatus(400);
            return;
        }
    }

    if (myTeamId == null) {
        let teamZeroSize = filterPlayingMembers(table.teams[0], table.code).length;
        let teamOneSize = filterPlayingMembers(table.teams[1], table.code).length;
        let teamId = teamZeroSize > teamOneSize ? 1 : 0;
        table.teams[teamId].push(user.id);
        myTeamId = teamId;
    }
    user.playingTableCode = table.code;
    res.send(getResData());
});

router.get('/leave-table', (req, res) => {
    let {userId} = req.query;
    let user = users[userId];
    if (user == null) {
        res.sendStatus(400);
        return;
    }
    user.playingTableCode = null;
    res.send(getResData());
});

router.get('/reset-table', (req, res) => {
    let user = users[req.query.userId];
    let table = tables[req.query.tableCode];
    if (user == null || table == null) {
        res.sendStatus(400);
        return;
    }
    if (!isNobodyInTheTable) {
        res.sendStatus(400);
        return;
    }
    let relica = createTable(table.code, table.moveDuration);
    tables[relica.code] = relica;
    res.send(getResData());
});

router.get('/replay', (req, res) => {
    let user = users[req.query.userId];
    let table = tables[req.query.tableCode];
    if (user == null || table == null) {
        res.sendStatus(400);
        return;
    }

    let {teams, state} = table;
    
    for (let teamId of [0, 1]) {
        let playingMembers = filterPlayingMembers(teams[teamId], table.code);
        teams[teamId] = playingMembers.map(user => user.id);
    }

    state.startTeamId = state.startTeamId === 0 ? 1 : 0;
    state.thinkingTeamId = state.startTeamId;
    state.thinkingUserIndexes = [0, 0];
    state.matrix = createMatrix();
    state.moveSequence = [];
    
    res.send(getResData());
});

router.get('/move', (req, res) => {
    let user = users[req.query.userId];
    let table = tables[req.query.tableCode];
    if (user == null || table == null) {
        res.sendStatus(400);
        return;
    }

    let {teams, state, code} = table;
    if (user.playingTableCode !== code) {
        res.sendStatus(400);
        return;
    }
    
    let teamId = [0, 1].find(tId => teams[tId].includes(user.id));
    if (teamId !== state.thinkingTeamId ||
        state.thinkingUserIndexes[teamId] !== teams[teamId].indexOf(user.id)
    ) {
        res.sendStatus(400);
        return;
    }

    let row = Number(req.query.row);
    let column = Number(req.query.column);
    state.matrix[row][column] = teamId;
    state.moveSequence.push([row, column]);
    if (state.thinkingUserIndexes[state.thinkingTeamId] < teams[state.thinkingTeamId].length - 1) {
        state.thinkingUserIndexes[state.thinkingTeamId]++;
    } else {
        state.thinkingUserIndexes[state.thinkingTeamId] = 0;
    }
    state.thinkingTeamId = teamId === 0 ? 1 : 0;

    res.send(getResData());
});

router.get('/game-data', (req, res) => {
    let now = getNow();
    let {userId} = req.query;
    let user = users[userId];
    if (user != null) {
        user.lastPingAt = now;
    }
    getUsersOutOfTablesIfInactive(now);
    substituteThinkingUsersIfDisconnected(now);
    res.send(getResData());
});

router.get('/reset-all-as-admin', (req, res) => {
    resetToDefaultData();
    res.send(getResData());
});

resetToDefaultData();

module.exports = router;
