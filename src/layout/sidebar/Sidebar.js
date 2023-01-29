import './Sidebar.less';
import {createPortal, useLayoutEffect, useRef} from 'fiddlehead';
import {useDispatch, useSelect} from '../../modules/store';

export let Sidebar = () => {
    let sidebarRef = useRef(null);

    let setSidebarElement = useDispatch((value, data) => {
        data.sidebarElement = value;
    });

    useLayoutEffect(() => {
        setSidebarElement(sidebarRef.current);    
    }, []);

    return <div class="Sidebar" ref={sidebarRef} />;
};

export let SidebarPortal = ({children}) => {
    let sidebarEl = useSelect(data => data.sidebarElement);

    let portalEl = useRef(document.createElement('div')).current;
    
    useLayoutEffect(() => {
        if (sidebarEl === null) {
            return;
        }

        if (portalEl.parentNode === null) {
            portalEl.style.display = 'contents';
            sidebarEl.appendChild(portalEl);
        }

        return () => {
            if (portalEl.parentNode !== null) {
                portalEl.parentNode.removeChild(portalEl);
            }
        };
    }, []);

    if (sidebarEl === null) {
        return null;
    }

    return createPortal(children, portalEl);
};
