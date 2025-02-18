import './TableViewer.less';
import {useMemo} from 'fiddlehead';
import {Button} from '../../components/button/Button';
import {Board} from '../board/Board';
import {findStreak, getTeamName} from '../utils';

export let TableViewer = ({table, users, myself, setGameData}) => {
    let {code, state, teams} = table;

    let streak = useMemo(() => findStreak(state.matrix), [String(state.matrix)]);

    let listTeamMembers = team => team.map(userId => users[userId].name).join(', ');

    let isTeamThinking = (teamId) => (
        teamId === state.thinkingTeamId &&
        teams[teamId].length > 0 &&
        streak === null
    );

    let enterTable = (tableCode) => {
        fetch(`/gomoku/enter-table?userId=${myself.id}&tableCode=${tableCode}`).then(res => res.json()).then((data) => {
            setGameData(data);
        });
    };

    let removeTable = (tableCode) => {
        if (confirm(`Are you sure you want to remove table ${tableCode}?`)) {
            fetch(`/gomoku/remove-table?userId=${myself.id}&tableCode=${tableCode}`).then(res => res.json()).then((data) => {
                setGameData(data);
            });
        }
    };

    let isNobodyHere = table.teams.every(members => members.length === 0);

    return (
        <div class="TableViewer">
            <div class="headline">
                <div class="code">Table <b>{code}</b></div>
                <div class="actions">
                    {isNobodyHere && (
                        <Button type="button" size="small" onClick={() => removeTable(code)}>Remove</Button>
                    )}
                    <Button type="button" size="small" onClick={() => enterTable(code)}>Play now</Button>
                </div>
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
