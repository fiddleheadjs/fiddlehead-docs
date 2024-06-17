import './CoTuongPc1.less';
import {RoundsAndMatches} from './rounds-and-matches/RoundsAndMatches';
import {RankingTable} from './ranking-table/RankingTable';
import players from './data/players.json';
import matches from './data/matches.json';

export let CoTuongPc1 = () => {

    return (
        <div class="CoTuongPc1">
            <h1>Giải vô địch Cờ tướng PC1 2024</h1>
            <RankingTable players={players} matches={matches} />
            <RoundsAndMatches players={players} matches={matches} />
        </div>
    );
};
