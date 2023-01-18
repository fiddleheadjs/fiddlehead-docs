import {useLayoutEffect, useRef} from 'fiddlehead';

export let TextArea = ({defaultValue, ...rest}) => {
    let ref = useRef();

    useLayoutEffect(() => {
        ref.current.defaultValue = defaultValue;
    }, []);

    return <textarea ref={ref} {...rest} />;
};
