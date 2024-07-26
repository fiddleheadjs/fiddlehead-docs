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

export let datePlus = (startDateString, additionalDays) => {
    let date = new Date(startDateString);
    date.setDate(date.getDate() + additionalDays);
    return dateStringify(date);
};

export let dateStringify = (date) => {
    let y = date.getFullYear();
    let m = (date.getMonth() + 1).toString().padStart(2, '0');
    let d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export let reformatDate = (dateString) => {
    let date = new Date(dateString);
    let d = date.getDate().toString().padStart(2, '0');
    let m = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${d}/${m}`;
};

export let isDateInRange = (dateString, startDateString, endDateString) => {
    let current = new Date(dateString).getTime();
    let start = new Date(startDateString).getTime();
    let end = new Date(endDateString).getTime();
    return start <= current && current <= end;
};

export let roundNameAt = (roundIndex) => `${roundIndex + 1}`;
