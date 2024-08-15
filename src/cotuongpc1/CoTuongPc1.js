import './CoTuongPc1.less';
import {RoundsAndMatches} from './rounds-and-matches/RoundsAndMatches';
import {RankingTable} from './ranking-table/RankingTable';
import players from './data/players.json';
import matches from './data/matches.json';
import {Rules} from './rules/Rules';
import {createMatchId, datePlus, dateStringify, isDateInRange, roundNameAt} from './utils';
import {Banner} from './banner/Banner';

export let CoTuongPc1 = () => {
    // Matches
    let matchesById = {};
    let M = matches.length;

    for (let i = 0; i < M; i++) {
        let match = matches[i];
        matchesById[createMatchId(match.firstPlayerId, match.secondPlayerId)] = match;
        let sameMatch = {
            firstPlayerId: match.secondPlayerId,
            secondPlayerId: match.firstPlayerId,
            games: match.games.map(game => ({
                ...game,
                result: 2 - game.result
            })),
            date: match.date
        };
        matchesById[createMatchId(sameMatch.firstPlayerId, sameMatch.secondPlayerId)] = sameMatch;
    }

    // Rounds
    let rounds = [];
    let matchSchedules = {};

    let P = players.length;
    let R = P % 2 === 0 ? P - 1 : P;

    let line1 = [];
    let line2 = [];
    for (let i = 0; i < P / 2 - 1 / 2; i++) {
        line1.push(players[i]);
    }
    for (let i = P - 1; i > P / 2 - 1; i--) {
        line2.push(players[i]);
    }

    let firstStartDateString = '2024-07-01';

    for (let r = 0; r < R; r++) {
        if (r > 0 && r % (P - 1) === 0) {
            line1.push(line2.pop());
            line2.push(line1.shift());
        }
        let name = roundNameAt(r);
        let pairs = [];
        let startDate = datePlus(firstStartDateString, 7 * r);
        let endDate = datePlus(firstStartDateString, 6 + 7 * r);
        rounds.push({
            name,
            pairs,
            startDate,
            endDate
        });
        for (let i = 0; i < P / 2 - 1 / 2; i++) {
            let firstPlayer = line1[i];
            let secondPlayer = line2[i];
            pairs.push({firstPlayer, secondPlayer});
            let matchSchedule = {
                roundIndex: r,
                scheduledDate: datePlus(startDate, i)
            };
            matchSchedules[createMatchId(firstPlayer.id, secondPlayer.id)] = matchSchedule;
            matchSchedules[createMatchId(secondPlayer.id, firstPlayer.id)] = matchSchedule;
        }
        line1.splice(1, 0, line2.shift());
        line2.push(line1.pop());
    }

    let currentRoundIndex = -1;
    // let currentDate = dateStringify(new Date());
    // for (let r = 0; r < R; r++) {
    //     let {startDate, endDate} = rounds[r];
    //     if (isDateInRange(currentDate, startDate, endDate)) {
    //         currentRoundIndex = r;
    //         break;
    //     }
    // }

    return (
        <div class="CoTuongPc1">
            <Banner />
            <main>
                <h1>Giải VĐ Cờ Tướng PC1 2024</h1>
                <h2>Điều lệ giải đấu</h2>
                <Rules />
                <h2>Bảng xếp hạng</h2>
                <RankingTable
                    players={players}
                    matches={matches}
                    matchesById={matchesById}
                    matchSchedules={matchSchedules}
                    currentRoundIndex={currentRoundIndex}
                />
                <h2>Các vòng đấu</h2>
                <RoundsAndMatches
                    rounds={rounds}
                    matchesById={matchesById}
                />
            </main>
            <hr/>
            <p align="center">&copy; Giải vô địch Cờ tướng PC1 2024</p>
        </div>
    );
};
