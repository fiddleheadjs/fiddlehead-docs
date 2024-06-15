import './RankingTable.less';

export let RankingTable = ({ players, matches }) => {
    let results = {};

    let P = players.length;
    for (let i = 0; i < P; i++) {
        results[players[i].id] = {
            score: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            history: []
        };
    }

    let M = matches.length;
    for (let i = 0; i < M; i++) {
        const { firstPlayerId, secondPlayerId, result } = matches[i];
        switch (result) {
            case 0:
                results[firstPlayerId].losses++;
                results[secondPlayerId].wins++;
                results[secondPlayerId].score += 2;
                break;
            case 1:
                results[firstPlayerId].draws++;
                results[firstPlayerId].score += 1;
                results[secondPlayerId].draws++;
                results[secondPlayerId].score += 1;
                break;
            case 2:
                results[firstPlayerId].wins++;
                results[firstPlayerId].score += 2;
                results[secondPlayerId].losses++;
                break;
        }
        results[firstPlayerId].history.push(result);
        results[secondPlayerId].history.push(2 - result);
    }

    const rankedPlayers = [...players];
    rankedPlayers.sort((player1, player2) => {
        return results[player2.id].score - results[player1.id].score;
    });

    return (
        <table class="RankingTable">
            <thead>
                <tr>
                    <th align="right">#</th>
                    <th align="left">Kỳ thủ</th>
                    <th align="left">Nhóm</th>
                    <th align="right">Thắng</th>
                    <th align="right">Hòa</th>
                    <th align="right">Thua</th>
                    <th>Lịch sử</th>
                    <th align="right">Điểm</th>
                </tr>
            </thead>
            <tbody>
                {rankedPlayers.map((player, index) => {
                    const { score, wins, draws, losses, history } = results[player.id];
                    return (
                        <tr>
                            <td align="right">{index + 1}</td>
                            <td align="left">{player.name}</td>
                            <td align="left">{player.group}</td>
                            <td align="right">{wins}</td>
                            <td align="right">{draws}</td>
                            <td align="right">{losses}</td>
                            <td>
                                <div class="history">                                
                                    {history.map(result => <span data-result={result}/>)}
                                </div>
                            </td>
                            <td align="right">{score}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
