import './TableViewer.less';
import {useMemo} from 'fiddlehead';
import {Button} from '../../components/button/Button';
import {Board} from '../board/Board';
import {findStreak, getTeamName, isInMatrix, isMatrixEmpty} from '../utils';

export let TableViewer = ({table, users, myself, setGameData}) => {
    let {code, moveDuration, state, teams} = table;

    let streak = useMemo(() => findStreak(state.matrix), [String(state.matrix)]);

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
        fetch(`/gomoku/remove-table?userId=${myself.id}&tableCode=${tableCode}`).then(res => res.json()).then((data) => {
            setGameData(data);
        });
    };

    let resetTable = () => {
        fetch(`/gomoku/reset-table?userId=${myself.id}&tableCode=${table.code}`).then(response => response.json()).then((data) => {
            setGameData(data);
        });
    };

    let listTeamMembers = team => team.map(userId => users[userId]).filter(
        user => user.playingTableCode === table.code
    ).map(user => user.name).join(', ');

    let isNobodyHere = table.teams.every(userIds => userIds.every(
        userId => users[userId].playingTableCode !== table.code
    ));

    let hasSomeOneEntered = table.teams.some(userIds => userIds.length > 0);

    let isTableDirty = hasSomeOneEntered || !isMatrixEmpty(table.state.matrix);

    let showsReset = isNobodyHere && isTableDirty;

    let showsRemove = isNobodyHere && !isTableDirty;

    let myTeamId = [0, 1].find(teamId => table.teams[teamId].includes(myself.id));

    let hasMyTeamMoved = myTeamId != null && isInMatrix(myTeamId, table.state.matrix);

    return (
        <div class="TableViewer">
            <div class="headline">
                <div class="code">Table <b>{code}</b> &middot; {moveDuration}s/m</div>
                <div class="actions">
                    {showsReset && (
                        <Button type="button" size="small" onClick={() => resetTable(code)}>Reset</Button>
                    )}
                    {showsRemove && (
                        <Button type="button" size="small" onClick={() => removeTable(code)}>Remove</Button>
                    )}
                    <Button type="button" size="small" disabled={hasMyTeamMoved} onClick={() => enterTable(code)}>
                        {myTeamId != null ? 'Go back' : 'Play now'}
                    </Button>
                </div>
            </div>
            <div class="headline">
                <div class="team align-left" data-team={0}>
                    <span class={`name ${isTeamThinking(0) ? 'thinking' : ''}`}>{getTeamName(0)}</span>
                    {' '}
                    <span class="members">{listTeamMembers(teams[0])}</span>
                </div>
                {hasSomeOneEntered && isNobodyHere && (
                    <div>(everyone has left)</div>
                )}
                <div class="team align-right" data-team={1}>
                    <span class="members">{listTeamMembers(teams[1])}</span>
                    {' '}
                    <span class={`name ${isTeamThinking(1) ? 'thinking' : ''}`}>{getTeamName(1)}</span>
                </div>
            </div>
            <Board remoteMatrix={state.matrix} />
        </div>
    );
};
