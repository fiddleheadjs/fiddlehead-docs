import './Cell.less';

export let Cell = ({ value, rx, cx, setMatrix, teamId, userId, tableCode, streak, setMoved, locked, setGameData }) => {
    let viewOnly = (
        locked ||
        streak.length > 0 ||
        teamId == null ||
        userId == null ||
        tableCode == null ||
        setGameData == null
    );
    
    let move = () => {
        if (viewOnly || value !== 2) {
            return;
        }
        setMoved(true);
        setMatrix(matrix => {
            let row = [...matrix[rx]];
            row[cx] = teamId;
            matrix[rx] = row;
            return [...matrix];
        });
        fetch(`/gomoku/move?row=${rx}&cell=${cx}&userId=${userId}&tableCode=${tableCode}`).then(res => res.json()).then(data => {
            setGameData(data);
        });
    };

    return (
        <td
            class={`Cell ${viewOnly ? 'view-only' : ''}`}
            data-value={value}
            data-streak={streak.some(([r, c]) => r === rx && c === cx)}
            data-myteam={teamId}
            onClick={() => move()}
        />
    );
};
