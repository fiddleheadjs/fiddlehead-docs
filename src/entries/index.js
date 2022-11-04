// Fiddlehead documentation

import {render} from 'fiddlehead';
import {Layout} from '../layout/Layout';
import {useRouter} from '../modules/router';
import {routes} from '../routes';
import {useStore} from '../modules/store';

let App = () => {
    useStore();

    let content = useRouter(routes);

    return (
        <Layout>
            {content}
        </Layout>
    );
};

render(<App/>, document.getElementById('root'));
