import {useEffect} from 'fiddlehead';

export let useClickAwayListener = (boundaryRef, onClickAway) => {
    useEffect(() => {
        let handleClickOutside = (event) => {
            if (boundaryRef.current != null && !boundaryRef.current.contains(event.target)) {
                onClickAway(event);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [onClickAway]);
};
