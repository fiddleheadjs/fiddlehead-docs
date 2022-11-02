// Fiddlehead documentation

import {render} from 'fiddlehead';
import {About} from '../contents/about/About';
import {Home} from '../contents/home/Home';
import {NotFound} from '../contents/not-found/NotFound';
import {Layout} from '../layout/Layout';
import {useRouter} from '../router';

let App = () => {
    let content = useRouter([
        {path: '/', Component: Home},
        {path: '/about', Component: About},
        {Component: NotFound},
    ]);

    return (
        <Layout>
            {content}
        </Layout>
    );
};

render(<App/>, document.getElementById('root'));
