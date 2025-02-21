export let scheduleInterval = setInterval;

export let cancelInterval = clearInterval;

export let getTeamName = (teamId) => teamId === 0 ? 'O' : 'X';

export let findStreak = (matrix) => {
    let size = matrix.length;
    for (let r = 0; r < size; r++) {
        let previous = 0;
        let count = 0;
        for (let c = 0; c < size; c++) {
            let current = matrix[r][c];
            if (current === previous) {
                count++;
                if (count === 5 && current !== 2) {
                    return [
                        [r, c - 4],
                        [r, c - 3],
                        [r, c - 2],
                        [r, c - 1],
                        [r, c],
                    ];
                }
            } else {
                previous = current;
                count = 1;
            }
        }
    }

    for (let c = 0; c < size; c++) {
        let previous = 0;
        let count = 0;
        for (let r = 0; r < size; r++) {
            let current = matrix[r][c];
            if (current === previous) {
                count++;
                if (count === 5 && current !== 2) {
                    return [
                        [r - 4, c],
                        [r - 3, c],
                        [r - 2, c],
                        [r - 1, c],
                        [r, c],
                    ];
                }
            } else {
                previous = current;
                count = 1;
            }
        }
    }

    for (let half = 0; half < 2; half++) {
        for (let start = 0; start < size; start++) {
            let previous = 0;
            let count = 0;
            for (
                let r = half === 0 ? 0 : start, c = half === 0 ? start : 0;
                r < size && c < size;
                r++, c++
            ) {
                let current = matrix[r][c];
                if (current === previous) {
                    count++;
                    if (count === 5 && current !== 2) {
                        return [
                            [r - 4, c - 4],
                            [r - 3, c - 3],
                            [r - 2, c - 2],
                            [r - 1, c - 1],
                            [r, c],
                        ];
                    }
                } else {
                    previous = current;
                    count = 1;
                }
            }
        }
    }

    for (let half = 0; half < 2; half++) {
        for (let start = 0; start < size; start++) {
            let previous = 0;
            let count = 0;
            for (
                let r = half === 0 ? start : size - 1, c = half === 0 ? 0 : start;
                r >= 0 && c < size;
                r--, c++
            ) {
                let current = matrix[r][c];
                if (current === previous) {
                    count++;
                    if (count === 5 && current !== 2) {
                        return [
                            [r + 4, c - 4],
                            [r + 3, c - 3],
                            [r + 2, c - 2],
                            [r + 1, c - 1],
                            [r, c],
                        ];
                    }
                } else {
                    previous = current;
                    count = 1;
                }
            }
        }
    }

    return null;
};

export let getWonTeamId = (streak, matrix) => {
    if (streak === null) {
        return null;
    }
    let [row, column] = streak[0];
    return matrix[row][column];
};

export let isUserDisconnected = (user, now) => {
    return now - user.lastPingAt > 4000;
};

export let isUserInactive = (user, now) => {
    return now - user.lastPingAt > 60000;
};

export let getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export let isInMatrix = (value, matrix) => {
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

export let isMatrixEmpty = (matrix) => {
    let size = matrix.length;
    for (let rx = 0; rx < size; rx++) {
        for (let cx = 0; cx < size; cx++) {
            if (matrix[rx][cx] !== 2) {
                return false;
            }
        }
    }
    return true;
};

let XHR = XMLHttpRequest;
let navSendBeacon = navigator.sendBeacon.bind(navigator);

let createSearchString = (data) => {
    let queryParams = [];
    for (let [name, value] of Object.entries(data)) {
        queryParams.push([
            encodeURIComponent(name),
            encodeURIComponent(value)
        ].join('='));
    }
    if (queryParams.length === 0) {
        return '';
    }
    let query = queryParams.join('&');
    return `?${query}`;
};

let createUrl = (path, data) => {
    let search = createSearchString(data);
    return `/gomoku/${path}${search}`;
};

export let sendRequest = (path, data, onSuccess) => {
    let xhr = new XHR();
    xhr.open('GET', createUrl(path, data));
    xhr.onload = () => {
        if (xhr.status >= 100 && xhr.status < 400) {
            onSuccess(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);
};

export let sendBeacon = (path, data) => {
    navSendBeacon(createUrl(path, data));
};
