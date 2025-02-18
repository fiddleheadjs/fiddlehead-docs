import './TopBar.less';
import {Button} from '../../components/button/Button';

export let TopBar = ({ myTable, myself, myTeamName, setGameData }) => {
    let replay = () => {
        if (confirm('Are you sure you want to replay?')) {
            fetch(`/gomoku/replay?userId=${myself.id}&tableCode=${myTable.code}`).then(response => response.json()).then((data) => {
                setGameData(data);
            });
        }
    };

    let leaveTable = () => {
        fetch(`/gomoku/leave-table?userId=${myself.id}`).then(response => response.json()).then((data) => {
            setGameData(data);
        });
    };

    return (
        <div class="TopBar">
            <div class="table-name">Table <b>{myTable.code}</b></div>
            <div class="info">
                <span><b>{myself.name}</b> / {myTeamName}</span>
            </div>
            <div class="actions">
                <Button type="button" size="small" onClick={() => replay()}>Replay</Button>
                <Button type="button" size="small" onClick={() => leaveTable()}>Leave table</Button>
            </div>
        </div>
    );
};
