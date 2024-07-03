import './RoundsAndMatches.less';
import {Player} from '../player/Player';
import {TableResponsive} from '../table-responsive/TableResponsive';
import {getMatchResult} from '../utils';

const resultLabels = {
    '-1': <>&mdash; <span><sup>V</sup>/<sub>S</sub></span> &mdash;</>,
    '0': <>thua</>,
    '1': <>hòa</>,
    '2': <>thắng</>,
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
                                let resultDetails;
                                if (matchOrEmpty != null) {
                                    let gameResults = [];
                                    let counts = {};
                                    for (let game of matchOrEmpty.games) {
                                        if (counts[game.result] != null) {
                                            counts[game.result]++;
                                        } else {
                                            counts[game.result] = 1;
                                            gameResults.push(game.result);
                                        }
                                    }
                                    resultDetails = (
                                        <>{gameResults.map((gameResult) => (
                                            <> {counts[gameResult]} {resultLabels[gameResult]} </>
                                        ))}</>
                                    );
                                }

                                return (
                                    <tr key={matchId}>
                                        <td align="right">
                                            <Player player={firstPlayer} align="right" />
                                        </td>
                                        <td align="center">
                                            <div class="result" data-result={result}>{resultLabel}</div>
                                            {resultDetails && (
                                                <div class="result-details">{resultDetails}</div>
                                            )}
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
