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
            matchScore: 0,
            gameScore: 0,
            matches: 0,
            history: new Array(matchesPerPlayer).fill(-1)
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
        
        resultsByPlayerId[firstPlayerId].matches++;
        resultsByPlayerId[secondPlayerId].matches++;

        resultsByPlayerId[firstPlayerId].matchScore += matchResult;
        resultsByPlayerId[secondPlayerId].matchScore += 2 - matchResult;
        
        resultsByPlayerId[firstPlayerId].gameScore += firstPlayerGameScore;
        resultsByPlayerId[secondPlayerId].gameScore += secondPlayerGameScore;

        resultsByPlayerId[firstPlayerId].history[roundIndex] = matchResult;
        resultsByPlayerId[secondPlayerId].history[roundIndex] = 2 - matchResult;
    }

    let rankedPlayers = [...players];
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

        // Who has played less matches?
        if (result2.matches < result1.matches) {
            return p2__p1;
        }
        if (result1.matches < result2.matches) {
            return p1__p2;
        }

        // Who has a higher game score?
        if (result2.gameScore > result1.gameScore) {
            return p2__p1;
        }
        if (result1.gameScore > result2.gameScore) {
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
    });

    return (
        <div class="RankingTable">
            <TableResponsive>
                <table>
                    <thead>
                        <tr>
                            <th align="right">#</th>
                            <th align="left">Kỳ thủ</th>
                            <th align="center">Các trận đấu</th>
                            <th align="right">HS1</th>
                            <th align="right">Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedPlayers.map((player, index) => {
                            let { matchScore, gameScore, history } = resultsByPlayerId[player.id];
                            return (
                                <tr>
                                    <td align="right">{index + 1}</td>
                                    <td align="left">
                                        <Player player={player} />
                                    </td>
                                    <td align="center">
                                        <div class="history">                                
                                            {history.map(result => <span data-result={result}/>)}
                                        </div>
                                    </td>
                                    <td align="right">{gameScore}</td>
                                    <td align="right">{matchScore}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableResponsive>
        </div>
    );
};
