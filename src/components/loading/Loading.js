import './Loading.less';
import {__} from '../../modules/i18n';
import {Spinner} from '../spinner/Spinner';

export let Loading = () => (
    <div class="Loading">
        <span>{__('Loading...')}</span>
        <Spinner />
    </div>
);
