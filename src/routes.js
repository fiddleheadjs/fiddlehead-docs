import listOfContents from './listOfContents.ls';
import {Home} from './pages/home/Home';
import {NotFound} from './pages/not-found/NotFound';
import {createArticle} from './pages/article/createArticle';

export let routes = [
    {
        path: '/',
        label: 'Home',
        Component: Home
    },
    ...listOfContents.map(filename => ({
        path: '/' + filename,
        label: filename.replace(/-/g, ' '),
        Component: createArticle(filename)
    })),
    {
        Component: NotFound
    }
];
