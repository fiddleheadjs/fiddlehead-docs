import './Cell.less';

export let Cell = ({ value, teamId, viewOnly, lastMoveHighlighted, makeMoveHere }) => {
    return (
        <td
            class={`Cell ${viewOnly ? 'view-only' : ''} ${lastMoveHighlighted ? 'last-move-highlighted' : ''}`}
            data-value={value}
            data-myteam={teamId}
            onClick={() => {
                makeMoveHere();
            }}
        />
    );
};
