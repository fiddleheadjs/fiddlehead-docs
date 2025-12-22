import {Messenger, Zalo} from '../pictogram';
import './FloatingActionButtons.less';

export let FloatingActionButtons = () => {
    return (
        <div class="FloatingActionButtons">
            <a
                title="Messenger chat"
                href="https://m.me/aimba.vn"
                role="button"
                class="x-button"
                tabIndex="0"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Messenger />
            </a>
            <a
                title="Zalo chat"
                href="https://zalo.me/0948088586"
                role="button"
                class="x-button"
                tabIndex="0"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Zalo />
            </a>
        </div>
    );
};
