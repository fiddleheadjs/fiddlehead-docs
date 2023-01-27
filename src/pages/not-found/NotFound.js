import './NotFound.less';
import {__} from '../../modules/i18n';

export let NotFound = () => {
    return (
        <div class="NotFound">
            <h1>404</h1>
            <p>{__('Content not found.')}</p>
        </div>
    );
};
