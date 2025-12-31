import {createPortal, useEffect, useState} from 'fiddlehead';
import './DialogPortal.less';

export let DialogPortal = ({children}) => {
    let [element] = useState(() => {
        return document.createElement('dialog-portal');
    });

    useEffect(() => {
        if (element.parentNode === null) {
            document.body.appendChild(element);
        }
        return () => {
            if (element.parentNode !== null) {
                element.parentNode.removeChild(element);
            }
        };
    }, []);

    return createPortal(children, element);
};
