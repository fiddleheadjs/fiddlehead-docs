// Fiddlehead documentation

import {render} from 'fiddlehead';
import {Layout} from '../layout/Layout';
import {useRouter} from '../router';
import {routes} from '../routes';

let App = () => {
    let content = useRouter(routes);

    return (
        <Layout>
            {content}
        </Layout>
    );
};

render(<App/>, document.getElementById('root'));
