import './Main.less';
import {useCatch} from 'fiddlehead';
import {__} from '../../modules/i18n';
import format from 'pretty-format';

export let Main = ({children}) => {
    let [error] = useCatch();

    if (error === null) {
        return <div class="Main">{children}</div>;
    }

    console.error(error);

    return (
        <div class="Main">
            <div class="unexpected-error">
                <h1>{__('Oops... something went wrong!')}</h1>
                <p>{format(error)}</p>
            </div>
        </div>
    );
};
