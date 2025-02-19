import './TopBar.less';
import {Button} from '../../components/button/Button';

export let TopBar = ({ table, myself, myTeamName, streak, setGameData }) => {
    let replay = () => {
        fetch(`/gomoku/replay?userId=${myself.id}&tableCode=${table.code}`).then(response => response.json()).then((data) => {
            setGameData(data);
        });
    };

    let leaveTable = () => {
        fetch(`/gomoku/leave-table?userId=${myself.id}`).then(response => response.json()).then((data) => {
            setGameData(data);
        });
    };

    return (
        <div class="TopBar">
            <div class="table-info">Table <b>{table.code}</b> &middot; {table.moveDuration}s/m</div>
            <div class="player-info">
                <span><b>{myself.name}</b> &middot; {myTeamName}</span>
            </div>
            <div class="actions">
                {streak !== null && (
                    <Button type="button" size="small" onClick={() => replay()}>Replay</Button>
                )}
                <Button type="button" size="small" onClick={() => leaveTable()}>Leave</Button>
            </div>
        </div>
    );
};
