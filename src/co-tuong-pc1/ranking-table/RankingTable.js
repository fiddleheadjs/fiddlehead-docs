import {Player} from '../player/Player';
import {TableResponsive} from '../table-responsive/TableResponsive';
import {createMatchId, getGameScore, getMatchResult} from '../utils';
import './RankingTable.less';

export let RankingTable = ({ players, matches, matchesById, roundIndexesByMatchId }) => {
    let resultsByPlayerId = {};

    let P = players.length;    
    let matchesPerPlayer = P - 1;
    for (let i = 0; i < P; i++) {
        resultsByPlayerId[players[i].id] = {
            rank: 0,
            matchScore: 0,
            gameScore: 0,
            competitorsScore: 0,
            winGames: 0,
            loserIds: [],
            drawerIds: [],
            history: new Array(matchesPerPlayer).fill(-1),
        };
    }

    let M = matches.length;
    for (let i = 0; i < M; i++) {
        let match = matches[i];
        let { firstPlayerId, secondPlayerId } = match;
        let matchResult = getMatchResult(match);
        if (matchResult === -1) {
            continue;
        }

        let {firstPlayerGameScore, secondPlayerGameScore} = getGameScore(match);
        let roundIndex = roundIndexesByMatchId[createMatchId(firstPlayerId, secondPlayerId)];

        let firstPlayerResult = resultsByPlayerId[firstPlayerId];
        let secondPlayerResult = resultsByPlayerId[secondPlayerId];

        firstPlayerResult.matchScore += matchResult;
        secondPlayerResult.matchScore += 2 - matchResult;
        
        firstPlayerResult.gameScore += firstPlayerGameScore;
        secondPlayerResult.gameScore += secondPlayerGameScore;

        firstPlayerResult.history[roundIndex] = matchResult;
        secondPlayerResult.history[roundIndex] = 2 - matchResult;

        switch (matchResult) {
            case 0:
                secondPlayerResult.loserIds.push(firstPlayerId);
                break;
            case 1:
                firstPlayerResult.drawerIds.push(secondPlayerId);
                secondPlayerResult.drawerIds.push(firstPlayerId);
                break;
            case 2:
                firstPlayerResult.loserIds.push(secondPlayerId);
                break;
        }

        for (let game of match.games) {
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

        // They should have the same rank
        player1.equalsToPrevious = true;
        return p2__p1;
    });

    let currentRank = 0;
    for (let {id, equalsToPrevious} of rankedPlayers) {
        if (!equalsToPrevious) {
            currentRank++;
        }
        resultsByPlayerId[id].rank = currentRank;
    }

    return (
        <div class="RankingTable">
            <TableResponsive>
                <table>
                    <thead>
                        <tr>
                            <th align="right">#</th>
                            <th align="left">Kỳ thủ</th>
                            <th align="center">Các trận đấu</th>
                            <th align="right">H3</th>
                            <th align="right">H2</th>
                            <th align="right">H1</th>
                            <th align="right">Đ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedPlayers.map((player) => {
                            let { rank, matchScore, gameScore, competitorsScore, winGames, history } = resultsByPlayerId[player.id];
                            return (
                                <tr>
                                    <td align="right">{M === 0 ? '' : rank}</td>
                                    <td align="left">
                                        <Player player={player} />
                                    </td>
                                    <td align="center">
                                        <div class="history">                                
                                            {history.map(result => <span data-result={result}/>)}
                                        </div>
                                    </td>
                                    <td align="right">{winGames}</td>
                                    <td align="right">{competitorsScore}</td>
                                    <td align="right">{gameScore}</td>
                                    <td align="right"><b>{matchScore}</b></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableResponsive>
            <br/>
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
