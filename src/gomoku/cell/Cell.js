import './Cell.less';

export let Cell = ({ value, teamId, viewOnly, makeMoveHere }) => {
    return (
        <td
            class={`Cell ${viewOnly ? 'view-only' : ''}`}
            data-value={value}
            data-myteam={teamId}
            onClick={() => {
                makeMoveHere();
            }}
        />
    );
};
