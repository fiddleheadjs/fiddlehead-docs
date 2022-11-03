import './MainContent';
import {useEffect, useRef} from 'fiddlehead';
import {useDispatch} from '../../modules/store';

export let MainContent = ({children}) => {
    let ref = useRef(null);

    let setLayoutScrollElement = useDispatch(
        (data, value) => data.layoutScrollElement = value
    );

    useEffect(() => {
        setLayoutScrollElement(ref.current);
    });

    return (
        <div class="MainContent" ref={ref}>{children}</div>
    );
};
