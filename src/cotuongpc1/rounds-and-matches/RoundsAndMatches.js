import './RoundsAndMatches.less';
import {reformatDate} from '../utils';
import {Matches} from '../matches/Matches';

export let RoundsAndMatches = ({rounds, matchesById, latestMatchDate}) => {
    return (
        <div class="RoundsAndMatches">
            {rounds.map(({pairs, startDate, endDate, name}) => (
                <div key={name}>
                    <h3>Vòng {name}</h3>
                    <p>Thời gian: {reformatDate(startDate)} - {reformatDate(endDate)}</p>
                    <Matches
                        pairs={pairs}
                        matchesById={matchesById}
                        latestMatchDate={latestMatchDate}
                    />
                </div>
            ))}
        </div>
    );
};
