import './UserName.less';
import {isUserDisconnected} from '../utils';

export let UserName = ({user, now}) => {
    return (
        <span class={`UserName ${isUserDisconnected(user, now) ? 'disconnected' : ''}`}>
            {user.name}
        </span>
    );
};
