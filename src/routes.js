import contents from './contents.scandir';
import {Home} from './pages/home/Home';
import {NotFound} from './pages/not-found/NotFound';
import {createArticle} from './pages/article/createArticle';

let stripFilenameNotations = (fname) => fname.replace(/(^\d+\.)/g, '');

let stripPathnameNotations = (pathname) => pathname.split('/').map(
    fname => stripFilenameNotations(fname)
).join('/');

let isFileItem = (item) => typeof item === 'string';

let contentRoutes = [];
let contentNavItems = [];

let walk = (dirItem, navItems) => {
    if (isFileItem(dirItem)) {
        return;
    }
    
    let [pathname, dirChildren] = dirItem;

    let publicPath = '/' + stripPathnameNotations(pathname);
    let hasTarget = false;

    if (dirChildren.some(isFileItem)) {
        hasTarget = true;
        contentRoutes.push({
            path: publicPath,
            Component: createArticle(pathname),
        });
    }

    let fname = pathname.split('/').pop();
    let label = stripFilenameNotations(fname).replace(/\-/g, ' ');

    let navChildren = [];
    
    navItems.push({
        path: publicPath,
        label: label,
        children: navChildren,
        hasTarget: hasTarget,
    });

    dirChildren.forEach(child => {
        walk(child, navChildren);
    });
};

contents.forEach(item => {
    walk(item, contentNavItems);
});

export let routes = [
    {
        path: '/',
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
        children: [],
        hasTarget: true,
    },
    ...contentNavItems,
];
