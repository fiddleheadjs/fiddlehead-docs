import {__} from '../../modules/i18n';
import {ErrorViewer} from '../../viewers/error/ErrorViewer';

export let NotFound = () => {
    return (
        <div class="NotFound">
            <ErrorViewer
                title="404"
                detail={__('Content not found.')}
            />
        </div>
    );
};
