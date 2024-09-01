import './Matches.less';
import {Player} from '../player/Player';
import {TableResponsive} from '../table-responsive/TableResponsive';
import {reformatDate, getMatchResult} from '../utils';

const resultLabels = {
    '-2': <>&mdash; x &mdash;</>,
    '-1': <>&mdash; <span><sup>V</sup>/<sub>S</sub></span> &mdash;</>,
    '0': <>thua</>,
    '1': <>hòa</>,
    '2': <>thắng</>,
};

export let Matches = ({ pairs, matchesById, latestMatchDate }) => {
    return (
        <div class="Matches">
            <TableResponsive>
                <table>
                    {pairs.map(({firstPlayer, secondPlayer}) => {
                        let matchId = `${firstPlayer.id}-${secondPlayer.id}`;
                        let matchOrEmpty = matchesById[matchId];
                        let result = getMatchResult(matchOrEmpty);
                        if (!(firstPlayer.active && secondPlayer.active)) {
                            result = -2;
                        }
                        let resultLabel = resultLabels[result];
                        let date;
                        let resultDetails;
                        if (matchOrEmpty != null) {
                            date = matchOrEmpty.date;
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
                            <tr key={matchId} class={date === latestMatchDate ? 'recent-match' : ''}>
                                <td align="right">
                                    <Player player={firstPlayer} align="right" />
                                </td>
                                <td align="center">
                                    <div class="match-info">
                                        {date && (
                                            <div class="date">{reformatDate(date)}</div>
                                        )}
                                        <div class="result" data-result={result}>{resultLabel}</div>
                                        {resultDetails && (
                                            <div class="result-details">{resultDetails}</div>
                                        )}
                                    </div>
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
    );
};