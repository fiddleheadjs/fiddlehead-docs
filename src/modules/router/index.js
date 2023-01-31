import history from 'history/browser';
import {useState, useEffect} from 'fiddlehead';
import {Button} from '../../components/button/Button';

export let useHistory = () => {
    return history;
};

export let useLocation = () => {
    let [, setKey] = useState();

    useEffect(() => {
        return history.listen(() => {
            setKey(history.location.key);
        });
    }, []);

    return history.location;
};

export let navigate = (path, state) => {
    history.push(path, state);
};

export let pathsEqual = (p1, p2) => (
    p1.toLowerCase() === p2.toLowerCase()
);

export let pathsTest = (p1, p2) => (
    (p1.toLowerCase() + '/').startsWith(p2.toLowerCase() + '/')
);

let selectRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
        if (pathsEqual(routes[i].path, history.location.pathname)) {
            return routes[i];
        }
    }
    return routes.length > 0 
        ? routes[routes.length - 1]
        : null;
};

export let useRouter = (routes) => {
    let [route, setRoute] = useState(selectRoute(routes));

    useEffect(() => {
        return history.listen(() => {
            setRoute(selectRoute(routes));
        });
    }, [routes]);

    let Component = route.Component;
    if (Component !== null) {
        return <Component/>;
    }
};

let composeLinkProps = ({href, onClick, ...otherProps}) => ({
    ...otherProps,
    href,
    onClick(event) {
        if (onClick != null) {
            onClick(event);
            if (event.defaultPrevented) {
                return;
            }
        }

        if (href != null) {
            event.preventDefault();
            navigate(href);
        }
    }
});

export let Link = ({children, ...otherProps}) => (
    <a {...composeLinkProps(otherProps)}>
        {children}
    </a>
);

export let LinkButton = ({children, ...otherProps}) => (
    <Button {...composeLinkProps(otherProps)}>
        {children}
    </Button>
);
