import './Main.less';
import {useCatch} from 'fiddlehead';
import {__} from '../../modules/i18n';
import {ErrorViewer} from '../../viewers/error/ErrorViewer';

export let Main = ({children}) => {
    let [error] = useCatch();

    if (error !== null) {
        console.error('Unexpected error:', error);
    }

    return (
        <div class="Main">
            {error === null ? children : (
                <ErrorViewer
                    title={__('Oops... something went wrong!')}
                    detail={error instanceof Error ? `${error.name}: ${error.message}` : null}
                />
            )}
        </div>
    );
};
