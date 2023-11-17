import './Gomoku.less';
import {useEffect, useState} from 'fiddlehead';
import {AddUser} from './add-user/AddUser';
import {Board} from './board/Board';
import {Team} from './team/Team';

export let Gomoku = () => {
    let [gameData, setGameData] = useState(null);

    useEffect(() => {
        let refresh = () => {
            let userId = localStorage.getItem('userId');
            fetch(`/gomoku/game-data?userId=${userId}`).then(res => res.json()).then(setGameData);
        };
        refresh();
        let intervalId = setInterval(refresh, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if (gameData === null) {
        return 'Loading game data...';
    }

    let {users, teams, state, now} = gameData;

    let myUserId = localStorage.getItem('userId');
    let myself = users[myUserId];

    if (!myself) {
        return <AddUser setGameData={setGameData} />
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
                    now={now}
                />
                <Board
                    remoteMatrix={state.matrix}
                    teamId={state.thinkingTeamId}
                    userId={myself.id}
                    isMyTurn={isMyTurn}
                    setGameData={setGameData}
                />
                <Team
                    teamName="X"
                    users={users}
                    team={teams[1]}
                    thinking={state.thinkingTeamId === 1}
                    thinkingUserIndex={state.thinkingUserIndexes[1]}
                    now={now}
                />
            </div>
        </div>
    );
};
