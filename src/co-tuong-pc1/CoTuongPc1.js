import {RoundsAndMatches} from './rounds-and-matches/RoundsAndMatches';
import players from './data/players.json';
import matches from './data/matches.json';
import {RankingTable} from './ranking-table/RankingTable';

export let CoTuongPc1 = () => {

    return (
        <div class="CoTuongPc1">
            <h1>Giải vô địch Cờ tướng PC1 2024</h1>
            <RankingTable players={players} matches={matches} />
            <RoundsAndMatches players={players} matches={matches} />
        </div>
    );
};
