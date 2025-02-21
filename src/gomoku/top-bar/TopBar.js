import './TopBar.less';
import {Button} from '../../components/button/Button';
import {sendRequest} from '../utils';

export let TopBar = ({ table, myself, myTeamName, streak, setGameData }) => {
    let userId = myself.id;

    let replay = () => {
        sendRequest('replay', {userId}, setGameData);
    };

    let leaveTable = () => {
        sendRequest('leave-table', {userId}, setGameData);
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
