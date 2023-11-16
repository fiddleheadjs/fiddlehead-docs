import './Cell.less';

export let Cell = ({ value, rx, cx, setMatrix, teamValue, streak }) => {
    return (
        <td
            class="Cell"
            data-value={value}
            data-streak={streak.includes(`${rx}:${cx}`)}
            onClick={() => {
                setMatrix(matrix => {
                    let row = [...matrix[rx]];
                    row[cx] = teamValue;
                    matrix[rx] = row;
                    return [...matrix];
                });
            }}
        >

        </td>
    );
};
