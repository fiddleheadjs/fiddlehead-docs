import {useMemo} from 'fiddlehead';
import {useStoreInit, useStoreRead, useStoreWrite} from 'fiddlehead/store';

const scope = {};

const data = {
    layoutScroll: {}
};

Object.seal(data);

export let useStore = () => {
    useMemo(() => {
        useStoreInit(scope, data);
    }, []);
};

export let useSelect = (readFn, compareFn) => {
    return useStoreRead(scope, readFn, compareFn);
};

export let useDispatch = (writeFn) => {
    return useStoreWrite(scope, writeFn);
};
