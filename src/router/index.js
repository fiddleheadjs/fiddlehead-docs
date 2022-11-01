import history from 'history/browser';
import {useCallback, useLayoutEffect, useState} from 'fiddlehead';

export let useHistory = () => {
    return history;
};

export let useLocation = () => {
    let [, setKey] = useState();

    useLayoutEffect(() => {
        return history.listen(() => {
            setKey(history.location.key);
        });
    }, []);

    return history.location;
};

export let navigate = (path, state) => {
    history.push(path, state);
};

export let useRouter = (routes) => {
    let [Component, setComponent] = useState(null);

    let onChange = useCallback(() => {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].path === history.location.pathname) {
                setComponent(() => routes[i].Component);
                return;
            }
        }
        setComponent(() => routes.length > 0 ? routes[routes.length - 1]?.Component : null);
    }, []);

    useLayoutEffect(() => {
        onChange();

        return history.listen(() => {
            onChange();
        });
    }, [onChange]);

    if (Component !== null) {
        return <Component/>;
    }
};
