import './Avatar.less';

export let Avatar = ({player}) => {
    return (
        <div class="Avatar">
            <div class="background-image" style={{ backgroundImage: `url(/img/cotuongpc1/avatars/${player.id}.jpg?v=2)` }} />
        </div>
    );
};
