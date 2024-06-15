import './Avatar.less';

export let Avatar = ({player}) => {
    return (
        <div class="Avatar">
            <img src={`/img/cotuongpc1/avatars/${player.id}.jpg`} style={{visibility: 'hidden'}} onload="this.style.visibility='visible';" />
        </div>
    );
};
