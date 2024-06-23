import {Player} from '../player/Player';
import {TableResponsive} from '../table-responsive/TableResponsive';
import {getMatchResult} from '../utils';
import './RoundsAndMatches.less';

const resultLabels = {
    '-1': '- v/s -',
    '0': 'thua',
    '1': 'hòa',
    '2': 'thắng',
};

export let RoundsAndMatches = ({rounds, matchesById}) => {
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
                                let matchOrEmpty = matchesById[matchId];
                                let result = getMatchResult(matchOrEmpty);
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
