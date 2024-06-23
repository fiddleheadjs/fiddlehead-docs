import './CoTuongPc1.less';
import {RoundsAndMatches} from './rounds-and-matches/RoundsAndMatches';
import {RankingTable} from './ranking-table/RankingTable';
import players from './data/players.json';
import matches from './data/matches.json';
import {Rules} from './rules/Rules';
import {createMatchId, datePlus} from './utils';

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
            }))
        };
        matchesById[createMatchId(sameMatch.firstPlayerId, sameMatch.secondPlayerId)] = sameMatch;
    }

    // Rounds
    let rounds = [];
    let roundIndexesByMatchId = {};

    let P = players.length;
    let R = P % 2 === 0 ? P - 1 : P;
    
    let line1 = [];
    let line2 = [];
    for (let i = 0; i < P/2 - 1/2; i++) {
        line1.push(players[i]);
    }
    for (let i = P - 1; i > P/2 - 1; i--) {
        line2.push(players[i]);
    }

    let firstStartDateString = '2024-07-01';
    
    for (let r = 0; r < R; r++) {
        if (r > 0 && r % (P - 1) === 0) {
            line1.push(line2.pop());
            line2.push(line1.shift());
        }
        let pairs = [];
        rounds.push({
            name: `Vòng ${r + 1}`,
            pairs,
            startDate: datePlus(firstStartDateString, 7 * r),
            endDate: datePlus(firstStartDateString, 6 + 7 * r)
        });
        for (let i = 0; i < P/2 - 1/2; i++) {
            let firstPlayer = line1[i];
            let secondPlayer = line2[i];
            pairs.push({ firstPlayer, secondPlayer });
            roundIndexesByMatchId[createMatchId(firstPlayer.id, secondPlayer.id)] = r;
            roundIndexesByMatchId[createMatchId(secondPlayer.id, firstPlayer.id)] = r;
        }
        line1.splice(1, 0, line2.shift());
        line2.push(line1.pop());
    }

    return (
        <div class="CoTuongPc1">
            <h1>Giải vô địch Cờ tướng PC1 2024</h1>
            <h2>Điều lệ giải đấu</h2>
            <Rules />
            <h2>Bảng xếp hạng</h2>
            <RankingTable players={players} matches={matches} matchesById={matchesById} roundIndexesByMatchId={roundIndexesByMatchId} />
            <h2>Các vòng đấu</h2>
            <RoundsAndMatches rounds={rounds} matchesById={matchesById} />
        </div>
    );
};
