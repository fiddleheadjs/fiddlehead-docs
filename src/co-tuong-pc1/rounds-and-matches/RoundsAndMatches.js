import {Player} from '../player/Player';
import {TableResponsive} from '../table-responsive/TableResponsive';
import './RoundsAndMatches.less';

const resultLabels = {
    '-1': '- vs -',
    '0': 'thua',
    '1': 'hòa',
    '2': 'thắng',
};

let datePlus = (originalDate, additionalDays) => {
    let newDate = new Date(originalDate);
    newDate.setDate(newDate.getDate() + additionalDays);
    return newDate.toLocaleDateString('vi-VN');
};

export let RoundsAndMatches = ({players, matches}) => {
    let M = matches.length;

    let matchesById = {};
    
    for (let i = 0; i < M; i++) {
        let match = matches[i];
        matchesById[`${match.firstPlayerId}-${match.secondPlayerId}`] = match;
        let sameMatch = {
            firstPlayerId: match.secondPlayerId,
            secondPlayerId: match.firstPlayerId,
            result: 2 - match.result
        };
        matchesById[`${sameMatch.firstPlayerId}-${sameMatch.secondPlayerId}`] = sameMatch;
    }
    
    let P = players.length;
    
    let line1 = [];
    let line2 = [];
    for (let i = 0; i < P/2 - 1/2; i++) {
        line1.push(players[i]);
    }
    for (let i = P - 1; i > P/2 - 1; i--) {
        line2.push(players[i]);
    }
    
    let rounds = [];
    let R = P % 2 === 0 ? P - 1 : P;
    
    for (let r = 0; r < R; r++) {
        if (r > 0 && r % (P - 1) === 0) {
            line1.push(line2.pop());
            line2.push(line1.shift());
        }
        let pairs = [];
        rounds.push({
            name: `Vòng ${r + 1}`,
            pairs,
            startDate: datePlus('2024-07-01', 7 * r),
            endDate: datePlus('2024-07-07', 7 * r)
        });
        for (let i = 0; i < P/2 - 1/2; i++) {
            let firstPlayer = line1[i];
            let secondPlayer = line2[i];
            pairs.push({ firstPlayer, secondPlayer });
        }
        line1.splice(1, 0, line2.shift());
        line2.push(line1.pop());
    }

    return (
        <div class="RoundsAndMatches">
            {rounds.map(({pairs, startDate, endDate, name}) => (
                <div key={name}>
                    <h3>{name}</h3>
                    <p>Thời gian: {startDate} - {endDate}</p>
                    <TableResponsive>
                        <table>
                            {pairs.map(({firstPlayer, secondPlayer}) => {
                                let matchId = `${firstPlayer.id}-${secondPlayer.id}`;
                                let match = matchesById[matchId];
                                let result = match?.result ?? -1;
                                let resultLabel = resultLabels[result];
                                return (
                                    <tr key={matchId}>
                                        <td align="right">
                                            <Player player={firstPlayer} align="right" />
                                        </td>
                                        <td align="center">
                                            <span class="result" data-result={result}>{resultLabel}</span>
                                        </td>
                                        <td align="left">
                                            <Player player={secondPlayer} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </TableResponsive>
                </div>
            ))}
        </div>
    );
};
