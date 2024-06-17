import './CoTuongPc1.less';
import {RoundsAndMatches} from './rounds-and-matches/RoundsAndMatches';
import {RankingTable} from './ranking-table/RankingTable';
import players from './data/players.json';
import matches from './data/matches.json';
import {Rules} from './rules/Rules';

export let CoTuongPc1 = () => {

    return (
        <div class="CoTuongPc1">
            <h1>Giải vô địch Cờ tướng PC1 2024</h1>
            <h2>Điều lệ giải đấu</h2>
            <Rules />
            <h2>Bảng xếp hạng</h2>
            <RankingTable players={players} matches={matches} />
            <h2>Các vòng đấu</h2>
            <RoundsAndMatches players={players} matches={matches} />
        </div>
    );
};
