import './Main.less';
import {useCatch} from 'fiddlehead';
import {__} from '../../modules/i18n';
import format from 'pretty-format';
import {ErrorViewer} from '../../viewers/error/ErrorViewer';

export let Main = ({children}) => {
    let [error] = useCatch();

    if (error === null) {
        return <div class="Main">{children}</div>;
    }

    console.error(error);

    return (
        <div class="Main">
            <ErrorViewer
                title={__('Oops... something went wrong!')}
                detail={format(error)}
            />
        </div>
    );
};
