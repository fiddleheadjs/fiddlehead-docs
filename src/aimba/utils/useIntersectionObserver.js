import {useEffect} from 'fiddlehead';

export let useIntersectionObserver = (targetRef, {threshold, callback}) => {
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }
        let target = targetRef.current;
        if (target == null) {
            return;
        }
        let observer = new IntersectionObserver(([entry]) => {
            callback(entry);
        }, {
            threshold
        });
        observer.observe(target);
        return () => {
            observer.unobserve(target);
        };
    }, [targetRef]);
};
