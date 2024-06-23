export let createMatchId = (firstPlayerId, secondPlayerId) => {
    return `${firstPlayerId}-${secondPlayerId}`;
};

export let getMatchResult = (matchOrEmpty) => {
    if (matchOrEmpty == null) {
        return -1;
    }
    let G = matchOrEmpty.games.length;
    if (G === 0) {
        return -1;
    }
    let gameScore = 0;
    for (let i = 0; i < G; i++) {
        let {result} = matchOrEmpty.games[i];
        gameScore += result;
    }
    let halfScore = G;
    if (gameScore > halfScore) {
        return 2;
    }
    if (gameScore < halfScore) {
        return 0;
    }
    return 1;
};

export let getGameScore = (match) => {
    let G = match.games.length;
    let firstPlayerGameScore = 0
    for (let i = 0; i < G; i++) {
        let {result} = match.games[i];
        firstPlayerGameScore += result;
    }
    let totalScore = 2 * G;
    let secondPlayerGameScore = totalScore - firstPlayerGameScore;
    return {firstPlayerGameScore, secondPlayerGameScore};
};

export let datePlus = (originalDate, additionalDays) => {
    let newDate = new Date(originalDate);
    newDate.setDate(newDate.getDate() + additionalDays);
    return newDate.toLocaleDateString('vi-VN');
};
