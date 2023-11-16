import './Gomoku.less';
import {useEffect, useState} from 'fiddlehead';
import {AddUser} from './add-user/AddUser';
import {Board} from './board/Board';
import {Team} from './team/Team';

export let Gomoku = () => {
    let [gameData, setGameData] = useState(null);

    useEffect(() => {
        let intervalId = setInterval(() => {
            fetch(`/gomoku/game-data`).then(response => response.json()).then((data) => {
                setGameData(data);
            });
        }, 1000);
        return () => clearInterval(intervalId);
    });

    if (gameData === null) {
        return null;
    }

    let {users, teams, state} = gameData;

    let myUserId = sessionStorage.getItem('userId');
    let myself = users[myUserId];

    if (!myself) {
        return <AddUser onDone={() => {}} />
    }

    let myIndex = teams[myself.teamId].indexOf(myUserId);

    let isMyTurn = state.thinkingTeamId === myself.teamId && state.thinkingUserIndexes[state.thinkingTeamId] === myIndex;

    return (
        <div class="Gomoku">
            <div class="topbar">
                <div class="left">
                    <h4>Player: {myself.name} &ndash; Team: {myself.teamId === 0 ? 'O' : 'X'}</h4>
                    {isMyTurn && <div class="your-turn">Your turn!</div>}
                </div>
                <button onClick={() => {
                    if (confirm('Are you sure you want to replay?')) {
                        fetch(`/gomoku/replay`).then(response => response.json()).then((data) => {
                            setGameData(data);
                        });
                    }
                }}>Replay</button>
            </div>
            <div class="main">
                <Team
                    teamName="O"
                    users={users}
                    team={teams[0]}
                    thinking={state.thinkingTeamId === 0}
                    thinkingUserIndex={state.thinkingUserIndexes[0]}
                />
                <Board
                    remoteMatrix={state.matrix}
                    teamId={state.thinkingTeamId}
                    isMyTurn={isMyTurn}
                />
                <Team
                    teamName="X"
                    users={users}
                    team={teams[1]}
                    thinking={state.thinkingTeamId === 1}
                    thinkingUserIndex={state.thinkingUserIndexes[1]}
                />
            </div>
        </div>
    );
};
