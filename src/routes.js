import contents from './contents.ls';
import {About} from './pages/about/About';
import {Home} from './pages/home/Home';
import {NotFound} from './pages/not-found/NotFound';
import {useState, useLayoutEffect} from 'fiddlehead';

export let routes = [
    {path: '/', label: 'Home', Component: Home},
    {path: '/about', label: 'About', Component: About},
    ...contents.map(filename => ({
        path: '/' + filename,
        label: filename,
        Component: () => {
            let [data, setData] = useState(null);
            useLayoutEffect(() => {
                import('./contents/' + filename + '/index.md').then(setData);
            }, []);
            if (data === null) {
                return 'Loading...';
            }
            return (
                <div>
                    <h1>{data.title}</h1>
                    <strong>{data.description}</strong>
                </div>
            );
        }
    })),
    {Component: NotFound},
];
