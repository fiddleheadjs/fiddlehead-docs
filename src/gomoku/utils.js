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
                        `${r}:${c - 4}`,
                        `${r}:${c - 3}`,
                        `${r}:${c - 2}`,
                        `${r}:${c - 1}`,
                        `${r}:${c}`,
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
                        `${r - 4}:${c}`,
                        `${r - 3}:${c}`,
                        `${r - 2}:${c}`,
                        `${r - 1}:${c}`,
                        `${r}:${c}`,
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
            for (let r = half === 0 ? 0 : start, c = half === 0 ? start : 0; r < size && c < size; r++, c++) {
                let current = matrix[r][c];
                if (current === previous) {
                    count++;
                    if (count === 5 && current !== 2) {
                        return [
                            `${r - 4}:${c - 4}`,
                            `${r - 3}:${c - 3}`,
                            `${r - 2}:${c - 2}`,
                            `${r - 1}:${c - 1}`,
                            `${r}:${c}`,
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
            for (let r = half === 0 ? start : size - 1, c = half === 0 ? 0 : start; r > 0 && c < size; r--, c++) {
                let current = matrix[r][c];
                if (current === previous) {
                    count++;
                    if (count === 5 && current !== 2) {
                        return [
                            `${r + 4}:${c - 4}`,
                            `${r + 3}:${c - 3}`,
                            `${r + 2}:${c - 2}`,
                            `${r + 1}:${c - 1}`,
                            `${r}:${c}`,
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
    let [row, column] = streak[0].split(':').map(Number);
    return matrix[row][column];
};

export let isUserDisconnected = (user, now) => {
    return now - user.lastPingAt > 4000;
};
