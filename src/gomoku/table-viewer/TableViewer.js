import './TableViewer.less';
import {useMemo} from 'fiddlehead';
import {Button} from '../../components/button/Button';
import {Board} from '../board/Board';
import {findStreak, getTeamName, isInMatrix, isMatrixEmpty, sendPost} from '../utils';
import {UserName} from '../user-name/UserName';

export let TableViewer = ({table, users, myself, now, setGameData}) => {
    let {moveDuration, state, teams} = table;

    let streak = useMemo(() => findStreak(state.matrix), [String(state.matrix)]);

    let isTeamThinking = (teamId) => (
        teamId === state.thinkingTeamId &&
        teams[teamId].length > 0 &&
        streak === null
    );

    let userId = myself.id;
    let tableCode = table.code;

    let enterTable = () => {
        sendPost('enter-table', {userId, tableCode}, setGameData);
    };

    let removeTable = () => {
        sendPost('remove-table', {userId, tableCode}, setGameData);
    };

    let resetTable = () => {
        sendPost('reset-table', {userId, tableCode}, setGameData);
    };

    let isNobodyHere = table.teams.every(userIds => userIds.every(
        userId => users[userId].playingTableCode !== table.code
    ));

    let hasSomeOneEntered = table.teams.some(userIds => userIds.length > 0);

    let isTableDirty = hasSomeOneEntered || !isMatrixEmpty(table.state.matrix);

    let showsReset = isNobodyHere && isTableDirty;

    let showsRemove = isNobodyHere && !isTableDirty;

    let myTeamId = [0, 1].find(teamId => table.teams[teamId].includes(myself.id));

    let hasMyTeamMoved = myTeamId != null && isInMatrix(myTeamId, table.state.matrix);

    let listTeamMembers = team => team.map(
        userId => users[userId]
    ).filter(
        user => user.playingTableCode === table.code
    ).map((user, index) => [
        index > 0 && ', ',
        <UserName user={user} now={now} />
    ]);

    return (
        <div class="TableViewer">
            <div class="headline">
                <div class="code">Table <b>{tableCode}</b> &middot; {moveDuration}s/m</div>
                <div class="actions">
                    {showsReset && (
                        <Button type="button" size="small" onClick={() => resetTable()}>Reset</Button>
                    )}
                    {showsRemove && (
                        <Button type="button" size="small" onClick={() => removeTable()}>Remove</Button>
                    )}
                    <Button type="button" size="small" disabled={hasMyTeamMoved} onClick={() => enterTable()}>
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
            <Board
                remoteMatrix={state.matrix}
                remoteMoveSequence={state.moveSequence}
            />
        </div>
    );
};
