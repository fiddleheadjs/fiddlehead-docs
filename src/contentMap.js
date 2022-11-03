import contentMap from './contentMap.scandir';
import {Home} from './pages/home/Home';
import {NotFound} from './pages/not-found/NotFound';
import {createArticle} from './pages/article/createArticle';

let stripFilenameNotations = (fname) => fname.replace(/(^\d+\.)|(\.+$)/g, '');

let stripPathnameNotations = (pathname) => pathname.split('/').map(
    fname => stripFilenameNotations(fname)
).join('/');

let contentRoutes = [];
let contentNavItems = [];

let walk = (dirItem, navItems) => {
    if (typeof dirItem === 'string') {
        return;
    }

    let [pathname, dirChildren] = dirItem;

    let navChildren = [];

    let fname = pathname.split('/').pop();
    let label = stripFilenameNotations(fname).replace(/\-/g, ' ');

    if (!pathname.endsWith('.')) {
        contentRoutes.push({
            path: '/' + stripPathnameNotations(pathname),
            Component: createArticle(pathname)
        });
        navItems.push({
            path: '/' + stripPathnameNotations(pathname),
            label: label,
            children: navChildren,
        });
    } else {
        navItems.push({
            path: 'javascript:void(0)',
            label: label,
            children: navChildren,
        });
    }

    dirChildren.forEach((child) => {
        walk(child, navChildren);
    });
};

contentMap.forEach(item => {
    walk(item, contentNavItems);
});

export let routes = [
    {
        path: '/',
        label: 'Home',
        Component: Home
    },
    ...contentRoutes,
    {
        path: '*',
        Component: NotFound
    }
];

export let navItems = [
    {
        path: '/',
        label: 'Home',
        children: []
    },
    ...contentNavItems,
];
