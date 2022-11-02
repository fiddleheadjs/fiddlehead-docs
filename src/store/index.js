import {useStoreInit, useStoreRead, useStoreWrite} from 'fiddlehead/store';

const scope = {};

let initialData = {
    layoutScrollElement: null
};

export let useStore = () => {
    useStoreInit(scope, initialData);
};

export let useSelect = (readFn, compareFn) => {
    return useStoreRead(scope, readFn, compareFn);
};

export let useDispatch = (writeFn) => {
    return useStoreWrite(scope, writeFn);
};
