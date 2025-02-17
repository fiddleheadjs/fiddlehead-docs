import './Table.less';
import {Board} from '../board/Board';
import {Team} from '../team/Team';
import {TopBar} from '../top-bar/TopBar';
import {useMemo} from 'fiddlehead';
import {findStreak, getTeamName} from '../utils';

export let Table = ({ users, myTable, myself, setGameData, now }) => {
    let {teams, state} = myTable;

    let streak = useMemo(() => findStreak(state.matrix), [String(state.matrix)]);

    let myTeamId = [0, 1].find(tId => teams[tId].includes(myself.id));

    let myTeamName = getTeamName(myTeamId);

    let myIndex = teams[myTeamId].indexOf(myself.id);

    let isMyTurn = (
        state.thinkingTeamId === myTeamId &&
        state.thinkingUserIndexes[state.thinkingTeamId] === myIndex
    );

    return (
        <div class="Table">
            <div class="container">
                <TopBar
                    myTable={myTable}
                    myself={myself}
                    myTeamName={myTeamName}
                    setGameData={setGameData}
                />
                <div class="main">
                    <Team
                        users={users}
                        teamId={0}
                        teamMembers={teams[0]}
                        thinking={state.thinkingTeamId === 0}
                        thinkingUserIndex={state.thinkingUserIndexes[0]}
                        streak={streak}
                        now={now}
                        align="left"
                    />
                    <Board
                        remoteMatrix={state.matrix}
                        teamId={state.thinkingTeamId}
                        userId={myself.id}
                        tableCode={myTable.code}
                        isMyTurn={isMyTurn}
                        setGameData={setGameData}
                    />
                    <Team
                        users={users}
                        teamId={1}
                        teamMembers={teams[1]}
                        thinking={state.thinkingTeamId === 1}
                        thinkingUserIndex={state.thinkingUserIndexes[1]}
                        streak={streak}
                        now={now}
                        align="right"
                    />
                </div>
            </div>
        </div>
    );
};
