import './RankingTable.less';
import {Player} from '../player/Player';
import {TableResponsive} from '../table-responsive/TableResponsive';
import {createMatchId, getGameScore, getMatchResult} from '../utils';

export let RankingTable = ({players, matchesById, matchSchedules}) => {
    let resultsByPlayerId = {};
    let matchesPerPlayer = players.length - 1;
    for (let player of players) {
        resultsByPlayerId[player.id] = {
            rank: 0,
            matchScore: 0,
            headToHeadScore: 0,
            gameScore: 0,
            competitorsScore: 0,
            matches: 0,
            winGames: 0,
            history: new Array(matchesPerPlayer).fill(-1),
            loserIds: [],
            drawerIds: []
        };
    }

    for (let [matchId, { roundIndex, firstPlayer, secondPlayer }] of Object.entries(matchSchedules)) {
        let firstPlayerResult = resultsByPlayerId[firstPlayer.id];
        let secondPlayerResult = resultsByPlayerId[secondPlayer.id];
        
        if (!(firstPlayer.active && secondPlayer.active)) {
            firstPlayerResult.history[roundIndex] = -2;
            secondPlayerResult.history[roundIndex] = -2;
            continue;
        }
        
        let matchOrEmpty = matchesById[matchId];
        let matchResult = getMatchResult(matchOrEmpty);
        if (matchResult < 0) {
            continue;
        }

        let {firstPlayerGameScore, secondPlayerGameScore} = getGameScore(matchOrEmpty);

        firstPlayerResult.matches++;
        secondPlayerResult.matches++;

        firstPlayerResult.matchScore += matchResult;
        secondPlayerResult.matchScore += 2 - matchResult;

        firstPlayerResult.gameScore += firstPlayerGameScore;
        secondPlayerResult.gameScore += secondPlayerGameScore;

        firstPlayerResult.history[roundIndex] = matchResult;
        secondPlayerResult.history[roundIndex] = 2 - matchResult;

        switch (matchResult) {
            case 0:
                secondPlayerResult.loserIds.push(firstPlayer.id);
                break;
            case 1:
                firstPlayerResult.drawerIds.push(secondPlayer.id);
                secondPlayerResult.drawerIds.push(firstPlayer.id);
                break;
            case 2:
                firstPlayerResult.loserIds.push(secondPlayer.id);
                break;
        }

        for (let game of matchOrEmpty.games) {
            switch (game.result) {
                case 0:
                    secondPlayerResult.winGames++;
                    break;
                case 2:
                    firstPlayerResult.winGames++;
                    break;
            }
        }
    }

    // Calculate competitors score
    for (let playerResult of Object.values(resultsByPlayerId)) {
        let competitorsScore = 0;
        for (let loserId of playerResult.loserIds) {
            competitorsScore += 2 * resultsByPlayerId[loserId].matchScore;
        }
        for (let drawerId of playerResult.drawerIds) {
            competitorsScore += resultsByPlayerId[drawerId].matchScore;
        }
        playerResult.competitorsScore = competitorsScore;
    }
    
    // Calculate head-to-head score (for groups of three or more players who have the same match score)
    let scoreToPlayerIds = {};
    for (let [playerId, { matchScore }] of Object.entries(resultsByPlayerId)) {
        if (scoreToPlayerIds[matchScore] === undefined) {
            scoreToPlayerIds[matchScore] = [];
        }
        scoreToPlayerIds[matchScore].push(playerId);
    }
    for (let playerIds of Object.values(scoreToPlayerIds)) {
        if (playerIds.length < 3) {
            continue;
        }
        for (let i = 0; i < playerIds.length; i++) {
            for (let j = i + 1; j < playerIds.length; j++) {
                let firstPlayerId = playerIds[i];
                let secondPlayerId = playerIds[j];
                let firstPlayerResult = resultsByPlayerId[firstPlayerId];
                let secondPlayerResult = resultsByPlayerId[secondPlayerId];

                let matchId = createMatchId(firstPlayerId, secondPlayerId);
                let matchOrEmpty = matchesById[matchId];
                let matchResult = getMatchResult(matchOrEmpty);
                if (matchResult < 0) {
                    continue;
                }

                firstPlayerResult.headToHeadScore += matchResult;
                secondPlayerResult.headToHeadScore += 2 - matchResult;
            }
        }
    }

    let rankedPlayers = players.map(player => ({
        ...player,
        equalsToPrevious: false
    }));

    rankedPlayers.sort((player1, player2) => {
        let p1__p2 = -1;
        let p2__p1 = 1;

        let result1 = resultsByPlayerId[player1.id];
        let result2 = resultsByPlayerId[player2.id];
        
        // Who has a higher match score?
        if (result2.matchScore > result1.matchScore) {
            return p2__p1;
        }
        if (result1.matchScore > result2.matchScore) {
            return p1__p2;
        }

        // Who has a higher head-to-head score?
        if (result2.headToHeadScore > result1.headToHeadScore) {
            return p2__p1;
        }
        if (result1.headToHeadScore > result2.headToHeadScore) {
            return p1__p2;
        }
        
        // Who won the match between them?
        let matchId = createMatchId(player1.id, player2.id);
        let matchOrEmpty = matchesById[matchId];
        let matchResult = getMatchResult(matchOrEmpty);
        if (matchResult === 2) {
            return p1__p2;
        }
        if (matchResult === 0) {
            return p2__p1;
        }

        // Who has a higher game score?
        if (result2.gameScore > result1.gameScore) {
            return p2__p1;
        }
        if (result1.gameScore > result2.gameScore) {
            return p1__p2;
        }

        // Who has a higher competitors score?
        if (result2.competitorsScore > result1.competitorsScore) {
            return p2__p1;
        }
        if (result1.competitorsScore > result2.competitorsScore) {
            return p1__p2;
        }

        // Who won more games?
        if (result2.winGames > result1.winGames) {
            return p2__p1;
        }
        if (result1.winGames > result2.winGames) {
            return p1__p2;
        }

        // Who has played?
        if (result2.matches > 0 && result1.matches === 0) {
            return p2__p1;
        }
        if (result1.matches > 0 && result2.matches === 0) {
            return p1__p2;
        }

        // They should have the same rank
        player1.equalsToPrevious = true;
        return p2__p1;
    });

    let currentRank = 0;
    for (let {id, equalsToPrevious} of rankedPlayers) {
        if (!equalsToPrevious) {
            currentRank++;
        }
        let result = resultsByPlayerId[id];
        if (result.matches > 0) {
            result.rank = currentRank;
        }
    }

    return (
        <div class="RankingTable">
            <TableResponsive>
                <table>
                    <thead>
                        <tr>
                            <th align="center">#</th>
                            <th align="left">Kỳ thủ</th>
                            <th align="center">Các trận đấu</th>
                            <th align="right">Đ</th>
                            <th align="right">H1</th>
                            <th align="right">H2</th>
                            <th align="right">H3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedPlayers.map((player) => {
                            let {rank, matchScore, gameScore, competitorsScore, winGames, history} = resultsByPlayerId[player.id];
                            return (
                                <tr>
                                    <td align="center">
                                        <div class="rank" data-rank={rank}>
                                            {rank > 0 ? rank : '#'}
                                        </div>
                                    </td>
                                    <td align="left">
                                        <Player player={player} />
                                    </td>
                                    <td align="center">
                                        <div class="history">
                                            {history.map(result => <span data-result={result} />)}
                                        </div>
                                    </td>
                                    <td align="right">{matchScore}</td>
                                    <td align="right">{gameScore}</td>
                                    <td align="right">{competitorsScore}</td>
                                    <td align="right">{winGames}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableResponsive>
            <br />
            <details>
                <summary>Ghi chú xếp hạng</summary>
                <p><b>Đ</b>: Điểm = Tổng điểm các trận đấu. Mỗi trận thắng được 2 điểm, hòa 1 điểm, thua 0 điểm.</p>
                <p><b>H1</b>: Hệ số phụ 1 = Tổng điểm các ván cờ. Mỗi ván thắng được 2 điểm, hòa 1 điểm, thua 0 điểm.</p>
                <p><b>H2</b>: Hệ số phụ 2 = 2 x (tổng điểm của các đối phương mà kỳ thủ đã thắng) + (tổng điểm của các đối phương mà kỳ thủ đã hòa).</p>
                <p><b>H3</b>: Hệ số phụ 3 = Tổng số các ván cờ mà kỳ thủ đã thắng.</p>
                <p>Thứ tự ưu tiên khi xếp hạng:</p>
                <ol>
                    <li>Điểm</li>
                    <li>Kết quả đối đầu</li>
                    <li>Hệ số phụ 1</li>
                    <li>Hệ số phụ 2</li>
                    <li>Hệ số phụ 3</li>
                </ol>
            </details>
        </div>
    );
};
