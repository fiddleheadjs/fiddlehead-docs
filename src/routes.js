import listOfContents from './listOfContents.ls';
import {About} from './pages/about/About';
import {Home} from './pages/home/Home';
import {NotFound} from './pages/not-found/NotFound';
import {createArticle} from './pages/article/createArticle';

export let routes = [
    {
        path: '/',
        label: 'Home',
        Component: Home
    },
    {
        path: '/about',
        label: 'About',
        Component: About
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
