import './Main.less';
import {useCatch} from 'fiddlehead';
import {__} from '../../modules/i18n';
import {ErrorViewer} from '../../viewers/error/ErrorViewer';

export let Main = ({children}) => {
    let [error] = useCatch();

    if (error !== null) {
        console.error('Unexpected error:', error);
    }

    let renderChildren = () => {
        if (error !== null) {
            return (
                <ErrorViewer
                    title={__('Oops... something went wrong!')}
                    detail={error instanceof Error ? `${error.name}: ${error.message}` : null}
                />
            );
        }

        return (
            <main>
                {children}
            </main>
        );
    };

    return (
        <div class="Main">
            {renderChildren()}
        </div>
    );
};
