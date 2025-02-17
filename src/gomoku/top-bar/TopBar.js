import './TopBar.less';

export let TopBar = ({ myTable, myself, myTeamName, setGameData }) => {
    return (
        <div class="TopBar">
            <div class="table-name">Table <b>{myTable.code}</b></div>
            <div class="info">
                <span><b>{myself.name}</b> / {myTeamName}</span>
            </div>
            <div class="actions">
                <button onClick={() => {
                    if (confirm('Are you sure you want to replay?')) {
                        fetch(`/gomoku/replay?userId=${myself.id}&tableCode=${myTable.code}`).then(response => response.json()).then((data) => {
                            setGameData(data);
                        });
                    }
                }}>Replay</button>
                <button onClick={() => {
                    fetch(`/gomoku/leave-table?userId=${myself.id}`).then(response => response.json()).then((data) => {
                        setGameData(data);
                    });
                }}>Leave table</button>
            </div>
        </div>
    );
};
