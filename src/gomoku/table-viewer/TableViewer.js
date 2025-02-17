import './TableViewer.less';
import {useMemo} from 'fiddlehead';
import {Button} from '../../components/button/Button';
import {Board} from '../board/Board';
import {findStreak, getTeamName} from '../utils';

export let TableViewer = ({table, users, enterTable}) => {
    let {code, state, teams} = table;

    let streak = useMemo(() => findStreak(state.matrix), [String(state.matrix)]);

    let listTeamMembers = team => team.map(userId => users[userId].name).join(', ');

    let isTeamThinking = (teamId) => (
        teamId === state.thinkingTeamId &&
        teams[teamId].length > 0 &&
        streak === null
    );

    return (
        <div class="TableViewer">
            <div class="headline">
                <span class="code">Table <b>{code}</b></span>
                <Button type="button" onClick={() => enterTable(code)}>Play</Button>
            </div>
            <div class="headline">
                <div class="team align-left" data-team={0}>
                    <span class={`name ${isTeamThinking(0) ? 'thinking' : ''}`}>{getTeamName(0)}</span>
                    <span class="members">{listTeamMembers(teams[0])}</span>
                </div>
                <div class="team align-right" data-team={1}>
                    <span class="members">{listTeamMembers(teams[1])}</span>
                    <span class={`name ${isTeamThinking(1) ? 'thinking' : ''}`}>{getTeamName(1)}</span>
                </div>
            </div>
            <Board
                remoteMatrix={state.matrix}
                isMyTurn={false}
                tableCode={null}
                teamId={null}
                userId={null}
                setGameData={null}
            />
        </div>
    );
};
