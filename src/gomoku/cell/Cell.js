import './Cell.less';

export let Cell = ({ value, teamId, viewOnly, makeMove }) => {
    return (
        <td
            class={`Cell ${viewOnly ? 'view-only' : ''}`}
            data-value={value}
            data-myteam={teamId}
            onClick={() => {
                makeMove(value);
            }}
        />
    );
};
