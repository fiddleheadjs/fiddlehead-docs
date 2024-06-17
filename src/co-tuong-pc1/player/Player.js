import {Avatar} from '../avatar/Avatar';
import './Player.less';

export let Player = ({player, align = 'left'}) => {
    return (
        <div class={`Player align-${align}`}>
            <Avatar player={player} />
            <div class="info">
                <div class="name">{player.name}</div>
                <div class={`group group-${player.group}`}>nhóm {player.group}</div>
            </div>
        </div>
    );
};
