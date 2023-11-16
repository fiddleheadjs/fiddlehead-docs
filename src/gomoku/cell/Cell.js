import './Cell.less';

export let Cell = ({ value, rx, cx, setMatrix, teamId, streak, setMoved, locked }) => {
    return (
        <td
            class={`Cell ${locked ? 'locked' : ''}`}
            data-value={value}
            data-streak={streak.includes(`${rx}:${cx}`)}
            onClick={() => {
                if (locked || value !== 2 || streak.length > 0) {
                    return;
                }
                setMoved(true);
                setMatrix(matrix => {
                    let row = [...matrix[rx]];
                    row[cx] = teamId;
                    matrix[rx] = row;
                    return [...matrix];
                });
                fetch(`/gomoku/move?row=${rx}&cell=${cx}&teamId=${teamId}`);
            }}
        />
    );
};
