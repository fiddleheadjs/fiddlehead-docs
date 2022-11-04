import {useStoreInit, useStoreRead, useStoreWrite} from 'fiddlehead/store';

const scope = {};

export let useStore = () => {
    useStoreInit(scope, {});
};

export let useSelect = (readFn, compareFn) => {
    return useStoreRead(scope, readFn, compareFn);
};

export let useDispatch = (writeFn) => {
    return useStoreWrite(scope, writeFn);
};
