import './DialogPortal.less';
// import {createPortal, useEffect, useState} from 'fiddlehead';

export let DialogPortal = ({children}) => {
    // let [element] = useState(() => {
    //     return document.createElement('dialog-portal');
    // });

    // useEffect(() => {
    //     if (element.parentNode === null) {
    //         document.body.appendChild(element);
    //     }
    //     return () => {
    //         if (element.parentNode !== null) {
    //             element.parentNode.removeChild(element);
    //         }
    //     };
    // }, []);

    // return createPortal(children, element);

    return <div class="DialogPortal">{children}</div>;
};
